import type * as AST from "@eslint-react/ast";
import type { EREffectMethodKind, ERPhaseKind } from "@eslint-react/core";
import { getPhaseKindOfFunction, PHASE_RELEVANCE } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { isMatching, match, P } from "ts-pattern";

import { createRule, getInstanceID, isInstanceIDEqual } from "../utils";
import type { ObserverMethod } from "./../models";
import { ObserverEntry } from "./../models";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-resize-observer";

export type MessageID =
  | "noLeakedResizeObserverInEffect"
  | "noLeakedResizeObserverNoFloatingInstance";

// #endregion

// #region Types

/* eslint-disable perfectionist/sort-union-types */
type FunctionKind = ERPhaseKind | "other";
type CallKind = ObserverMethod | EREffectMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

export type OEntry = ObserverEntry & { _tag: "Observe" };
export type UEntry = ObserverEntry & { _tag: "Unobserve" };
export type DEntry = ObserverEntry & { _tag: "Disconnect" };

// #endregion

// #region Helpers

function isNewResizeObserver(node: TSESTree.Node) {
  return node.type === AST_NODE_TYPES.NewExpression
    && node.callee.type === AST_NODE_TYPES.Identifier
    && node.callee.name === "ResizeObserver";
}

function isFromObserver(node: TSESTree.Expression, context: RuleContext): boolean {
  switch (true) {
    case node.type === AST_NODE_TYPES.Identifier:
      return F.pipe(
        VAR.findVariable(node, context.sourceCode.getScope(node)),
        O.flatMap(VAR.getVariableNode(0)),
        O.exists(isNewResizeObserver),
      );
    case node.type === AST_NODE_TYPES.MemberExpression:
      return isFromObserver(node.object, context);
    default:
      return false;
  }
}

function getCallKind(node: TSESTree.CallExpression, context: RuleContext): CallKind {
  switch (true) {
    case node.callee.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.name)
      && isFromObserver(node.callee, context):
      return node.callee.name;
    case node.callee.type === AST_NODE_TYPES.MemberExpression
      && node.callee.property.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.property.name)
      && isFromObserver(node.callee, context):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: AST.TSESTreeFunction): FunctionKind {
  return O.getOrElse(getPhaseKindOfFunction(node), F.constant("other"));
}

// #endregion

// #region Rule Definition

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce cleanup of 'ResizeObserver' instances in components and custom hooks.",
    },
    messages: {
      noLeakedResizeObserverInEffect:
        "A 'ResizeObserver' instance created in 'useEffect' must be disconnected in the cleanup function.",
      noLeakedResizeObserverNoFloatingInstance:
        "A 'ResizeObserver' instance created in component or custom hook must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("ResizeObserver")) return {};
    const fStack: [node: AST.TSESTreeFunction, kind: FunctionKind][] = [];
    const observers: [node: TSESTree.NewExpression, id: TSESTree.Node, phase: ERPhaseKind][] = [];
    const oEntries: OEntry[] = [];
    const uEntries: UEntry[] = [];
    const dEntries: DEntry[] = [];
    return {
      [":function"](node: AST.TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        fStack.push([node, functionKind]);
      },
      [":function:exit"]() {
        fStack.pop();
      },
      ["CallExpression"](node) {
        const [_, fKind] = fStack.at(-1) ?? [];
        if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return;
        if (!PHASE_RELEVANCE.has(fKind)) return;
        const { object } = node.callee;
        match(getCallKind(node, context))
          .with("disconnect", () => {
            dEntries.push(
              ObserverEntry.Disconnect({
                kind: "ResizeObserver",
                node,
                callee: node.callee,
                observer: object,
                phase: fKind,
              }),
            );
          })
          .with("observe", () => {
            const [element] = node.arguments;
            if (!element) return;
            oEntries.push(
              ObserverEntry.Observe({
                kind: "ResizeObserver",
                node,
                callee: node.callee,
                element,
                observer: object,
                phase: fKind,
              }),
            );
          })
          .with("unobserve", () => {
            const [element] = node.arguments;
            if (!element) return;
            uEntries.push(
              ObserverEntry.Unobserve({
                kind: "ResizeObserver",
                node,
                callee: node.callee,
                element,
                observer: object,
                phase: fKind,
              }),
            );
          })
          .otherwise(F.constVoid);
      },
      ["NewExpression"](node) {
        const [_, fKind] = fStack.at(-1) ?? [];
        if (!PHASE_RELEVANCE.has(fKind)) return;
        if (!isNewResizeObserver(node)) return;
        const id = getInstanceID(node);
        if (O.isNone(id)) {
          context.report({
            messageId: "noLeakedResizeObserverNoFloatingInstance",
            node,
          });
          return;
        }
        observers.push([node, id.value, fKind]);
      },
      ["Program:exit"]() {
        for (const [node, id] of observers) {
          if (dEntries.some(e => isInstanceIDEqual(e.observer, id, context))) continue;
          context.report({ messageId: "noLeakedResizeObserverInEffect", node });
        }
      },
    };
  },
  defaultOptions: [],
});

// #endregion
