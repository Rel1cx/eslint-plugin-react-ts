import * as AST from "@eslint-react/ast";
import { isReactHookCall, useComponentCollector } from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-context-value";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "noUnstableContextValue"
  | "noUnstableContextValueWithFunction"
  | "noUnstableContextValueWithIdentifier";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing constructed values to context providers",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnstableContextValue:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render.",
      noUnstableContextValueWithFunction:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useCallback hook.",
      noUnstableContextValueWithIdentifier:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useMemo hook.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollector(context);
    const constructions = new Map<AST.TSESTreeFunction, VAR.ValueConstruction[]>();

    return {
      ...listeners,
      JSXOpeningElement(node) {
        const openingElementName = node.name;
        if (openingElementName.type !== T.JSXMemberExpression) {
          return;
        }
        if (openingElementName.property.name !== "Provider") {
          return;
        }
        const functionEntry = ctx.getCurrentEntry();
        if (functionEntry === _) return;
        const attribute = node
          .attributes
          .find((attribute) =>
            attribute.type === T.JSXAttribute
            && attribute.name.name === "value"
          );
        if (attribute === _ || !("value" in attribute)) return;
        const value = attribute.value;
        if (value?.type !== T.JSXExpressionContainer) return;
        const valueExpression = value.expression;
        const initialScope = context.sourceCode.getScope(valueExpression);
        const construction = VAR.getValueConstruction(valueExpression, initialScope);
        if (construction === _) return;
        if (isReactHookCall(construction.node)) {
          return;
        }
        const prevs = constructions.get(functionEntry.node) ?? [];
        constructions.set(functionEntry.node, [...prevs, construction]);
      },
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node).values();
        for (const { node: component } of components) {
          for (const construction of constructions.get(component) ?? []) {
            const { kind, node: constructionNode } = construction;
            const messageId = kind.startsWith("Function")
              ? "noUnstableContextValueWithFunction"
              : "noUnstableContextValueWithIdentifier";
            context.report({
              messageId,
              node: constructionNode,
              data: {
                type: AST.toReadableNodeType(constructionNode),
              },
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});
