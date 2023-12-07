import { getClassIdentifier, NodeType, type TSESTreeClass } from "@eslint-react/ast";
import { getPragmaFromContext } from "@eslint-react/jsx";
import { type RuleContext, uid } from "@eslint-react/shared";
import { M, O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import type { ExRClassComponent } from "./component";
import { ExRClassComponentFlag } from "./component-flag";

/**
 * Check if a node is a React class component
 * @param node The AST node to check
 * @param context The rule context
 */
export function isClassComponent(node: TSESTree.Node, context: RuleContext): node is TSESTreeClass {
  if (!("superClass" in node && node.superClass)) {
    return false;
  }
  const pragma = getPragmaFromContext(context);
  const { superClass } = node;

  return M.match(superClass)
    .with({ type: NodeType.Identifier, name: M.P.string }, ({ name }) => /^(Pure)?Component$/u.test(name))
    .with(
      {
        type: NodeType.MemberExpression,
        object: { name: pragma },
        property: { name: M.P.string },
      },
      ({ property }) => /^(Pure)?Component$/u.test(property.name),
    )
    .otherwise(() => false);
}

/**
 * Check if a node is a React PureComponent
 * @param node The AST node to check
 * @param context The rule context
 */
export function isPureComponent(node: TSESTree.Node, context: RuleContext) {
  const pragma = getPragmaFromContext(context);

  const { sourceCode } = context;

  if ("superClass" in node && node.superClass) {
    const text = sourceCode.getText(node.superClass);

    // eslint-disable-next-line security/detect-non-literal-regexp
    return new RegExp(`^(${pragma}\\.)?PureComponent$`, "u").test(text);
  }

  return false;
}

export function componentCollectorLegacy(context: RuleContext) {
  const components = new Map<string, ExRClassComponent>();

  const ctx = {
    getAllComponents(_: TSESTree.Program): typeof components {
      return components;
    },
    getCurrentComponents() {
      return new Map(components);
    },
  } as const;

  const collect = (node: TSESTreeClass) => {
    if (!isClassComponent(node, context)) {
      return;
    }

    const id = getClassIdentifier(node);
    const key = uid.rnd();
    const flag = isPureComponent(node, context)
      ? ExRClassComponentFlag.PureComponent
      : ExRClassComponentFlag.None;
    components.set(
      key,
      {
        _: key,
        id,
        kind: "class",
        name: O.flatMapNullable(id, n => n.name),
        // TODO: get displayName of class component
        displayName: O.none(),
        flag,
        // TODO: get methods of class component
        methods: [],
        node,
      },
    );
  };

  const listeners = {
    ClassDeclaration: collect,
    ClassExpression: collect,
  } as const satisfies ESLintUtils.RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
