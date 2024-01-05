import { NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { constructionDetector, type ERConstruction, useComponentCollector } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-constructed-context-value";

export type MessageID =
  | "NO_CONSTRUCTED_CONTEXT_VALUE"
  | "NO_CONSTRUCTED_CONTEXT_VALUE_WITH_FUNCTION"
  | "NO_CONSTRUCTED_CONTEXT_VALUE_WITH_IDENTIFIER";

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing constructed values to context providers",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_CONSTRUCTED_CONTEXT_VALUE:
        "The {{type}} passed as the value prop to the context provider should not be constructed. It will change on every render.",
      NO_CONSTRUCTED_CONTEXT_VALUE_WITH_FUNCTION:
        "The {{type}} passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useCallback hook.",
      NO_CONSTRUCTED_CONTEXT_VALUE_WITH_IDENTIFIER:
        "The {{type}} passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useMemo hook.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = useComponentCollector(context);
    const detectConstruction = constructionDetector(context);
    const possibleValueConstructions = new Map<TSESTreeFunction, ERConstruction[]>();

    return {
      ...listeners,
      JSXOpeningElement(node) {
        const openingElementName = node.name;
        if (openingElementName.type !== NodeType.JSXMemberExpression) return;
        if (openingElementName.property.name !== "Provider") return;
        const maybeJSXValueAttribute = O.fromNullable(
          node.attributes.find((attribute) => {
            return attribute.type === NodeType.JSXAttribute
              && attribute.name.name === "value";
          }),
        );
        if (O.isNone(maybeJSXValueAttribute) || !("value" in maybeJSXValueAttribute.value)) return;
        const valueNode = maybeJSXValueAttribute.value.value;
        if (valueNode?.type !== NodeType.JSXExpressionContainer) return;
        const valueExpression = valueNode.expression;
        const constructionDetail = detectConstruction(valueExpression);
        if (constructionDetail._tag === "None") return;
        O.map(
          ctx.getCurrentFunction(),
          ([currentFn]) =>
            possibleValueConstructions.set(currentFn, [
              ...possibleValueConstructions.get(currentFn) ?? [],
              constructionDetail,
            ]),
        );
      },
      "Program:exit"(node) {
        const components = Array.from(ctx.getAllComponents(node).values());
        for (const { node: component } of components) {
          const constructions = possibleValueConstructions.get(component);
          if (!constructions) continue;
          for (const construction of constructions) {
            if (construction._tag === "None") continue;
            const { _tag, node: constructionNode } = construction;
            const messageId = _tag.startsWith("Function")
              ? "NO_CONSTRUCTED_CONTEXT_VALUE_WITH_FUNCTION"
              : "NO_CONSTRUCTED_CONTEXT_VALUE_WITH_IDENTIFIER";
            context.report({
              node: constructionNode,
              messageId,
              data: {
                type: constructionNode.type,
              },
            });
          }
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
