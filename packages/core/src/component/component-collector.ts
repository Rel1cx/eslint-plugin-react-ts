/* eslint-disable no-restricted-syntax */
import * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { isChildrenOfCreateElement } from "../element";
import { isReactHookCall } from "../hook";
import { getId } from "../utils";
import { DEFAULT_COMPONENT_HINT, ERComponentHint } from "./component-collector-hint";
import { ERFunctionComponentFlag } from "./component-flag";
import { getFunctionComponentIdentifier } from "./component-id";
import { isFunctionOfRenderMethod } from "./component-lifecycle";
import { getComponentNameFromIdentifier, hasNoneOrValidComponentName } from "./component-name";
import type { ERFunctionComponent } from "./component-semantic-node";

function hasValidHierarchy(node: AST.TSESTreeFunction, context: RuleContext, hint: bigint) {
  if (isChildrenOfCreateElement(node, context) || isFunctionOfRenderMethod(node)) {
    return false;
  }
  if (hint & ERComponentHint.SkipMapCallback && AST.isMapCallLoose(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipObjectMethod && AST.isFunctionOfObjectMethod(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipClassMethod && AST.isFunctionOfClassMethod(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipClassProperty && AST.isFunctionOfClassProperty(node.parent)) {
    return false;
  }
  const boundaryNode = AST.findParentNode(
    node,
    AST.isOneOf([
      T.JSXExpressionContainer,
      T.ArrowFunctionExpression,
      T.FunctionExpression,
      T.Property,
      T.ClassBody,
    ]),
  );
  return boundaryNode == null || boundaryNode.type !== T.JSXExpressionContainer;
}

function getComponentFlag(initPath: ERFunctionComponent["initPath"]) {
  let flag = ERFunctionComponentFlag.None;
  if (initPath != null && AST.hasCallInFunctionInitPath("memo", initPath)) {
    flag |= ERFunctionComponentFlag.Memo;
  }
  if (initPath != null && AST.hasCallInFunctionInitPath("forwardRef", initPath)) {
    flag |= ERFunctionComponentFlag.ForwardRef;
  }
  return flag;
}

export interface ComponentCollectorOptions {
  collectDisplayName?: boolean;
  collectHookCalls?: boolean;
}

// dprint-ignore
const displayNameAssignmentSelector = "AssignmentExpression[type][operator='='][left.type='MemberExpression'][left.property.name='displayName']";

/**
 * Get a ctx and listeners for the rule to collect function components
 * @param context The ESLint rule context
 * @param hint The hint to use
 * @param options The options to use
 * @returns The component collector
 */
export function useComponentCollector(
  context: RuleContext,
  hint = DEFAULT_COMPONENT_HINT,
  options: ComponentCollectorOptions = {},
) {
  const { collectDisplayName = false, collectHookCalls = false } = options;

  const jsxCtx = { getScope: (node: TSESTree.Node) => context.sourceCode.getScope(node) } as const;
  const components = new Map<string, ERFunctionComponent>();
  const functionEntries: {
    key: string;
    node: AST.TSESTreeFunction;
    hookCalls: TSESTree.CallExpression[];
    isComponent: boolean;
  }[] = [];

  const getCurrentEntry = () => functionEntries.at(-1);
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const key = getId();
    functionEntries.push({ key, node, hookCalls: [], isComponent: false });
  };
  const onFunctionExit = () => {
    const entry = functionEntries.at(-1);
    if (entry == null) return;
    if (!entry.isComponent) {
      return functionEntries.pop();
    }
    const shouldDrop = AST.getNestedReturnStatements(entry.node.body)
      .slice()
      .reverse()
      .some((r) => {
        return context.sourceCode.getScope(r).block === entry.node
          && r.argument != null
          && !JSX.isJSXValue(r.argument, jsxCtx, hint);
      });
    if (shouldDrop) {
      components.delete(entry.key);
    }
    return functionEntries.pop();
  };

  const ctx = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllComponents(node: TSESTree.Program): typeof components {
      return components;
    },
    getCurrentEntries() {
      return [...functionEntries];
    },
    getCurrentEntry,
  } as const;

  const listeners = {
    ":function[type]": onFunctionEnter,
    ":function[type]:exit": onFunctionExit,
    "ArrowFunctionExpression[type][body.type!='BlockStatement']"() {
      const entry = getCurrentEntry();
      if (entry == null) {
        return;
      }
      const { body } = entry.node;
      const isComponent = hasNoneOrValidComponentName(entry.node, context)
        && JSX.isJSXValue(body, jsxCtx, hint)
        && hasValidHierarchy(entry.node, context, hint);
      if (!isComponent) {
        return;
      }
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentIdentifier(entry.node, context);
      const name = getComponentNameFromIdentifier(id);
      const key = getId();
      components.set(key, {
        id,
        key,
        kind: "function",
        name,
        node: entry.node,
        displayName: _,
        flag: getComponentFlag(initPath),
        hint,
        hookCalls: entry.hookCalls,
        initPath,
      });
    },
    ...collectDisplayName
      ? {
        [displayNameAssignmentSelector](node: TSESTree.AssignmentExpression & { left: TSESTree.MemberExpression }) {
          const { left, right } = node;
          const componentName = left.object.type === T.Identifier
            ? left.object.name
            : _;
          const component = [...components.values()]
            .findLast(({ name }) => name != null && name === componentName);
          if (component == null) {
            return;
          }
          component.displayName = right;
        },
      }
      : {},
    ...collectHookCalls
      ? {
        "CallExpression[type]:exit"(node: TSESTree.CallExpression) {
          if (!isReactHookCall(node)) {
            return;
          }
          const entry = getCurrentEntry();
          if (entry == null) {
            return;
          }
          entry.hookCalls.push(node);
        },
      }
      : {},
    "ReturnStatement[type]"(node: TSESTree.ReturnStatement) {
      const entry = getCurrentEntry();
      if (entry == null) {
        return;
      }
      const isComponent = hasNoneOrValidComponentName(entry.node, context)
        && JSX.isJSXValue(node.argument, jsxCtx, hint)
        && hasValidHierarchy(entry.node, context, hint);
      if (!isComponent) {
        return;
      }
      functionEntries.pop();
      functionEntries.push({ ...entry, isComponent });
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentIdentifier(entry.node, context);
      const name = getComponentNameFromIdentifier(id);
      components.set(entry.key, {
        id,
        key: entry.key,
        kind: "function",
        name,
        node: entry.node,
        displayName: _,
        flag: getComponentFlag(initPath),
        hint,
        hookCalls: entry.hookCalls,
        initPath,
      });
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, listeners } as const;
}
