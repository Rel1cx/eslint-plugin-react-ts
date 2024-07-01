import { NodeType } from "@eslint-react/ast";
import { elementType, findPropInProperties, isCreateElementCall } from "@eslint-react/jsx";
import { hasEveryProp } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import type { ConstantCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../../../eslint-plugin-react-dom/src/utils";

export const RULE_NAME = "no-mixing-controlled-and-uncontrolled";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow mixing controlled and uncontrolled <input />.",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_MIXING_CONTROLLED_AND_UNCONTROLLED: "Disallow controlled prop and uncontrolled prop being used together.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (!isCreateElementCall(node, context)) return;
        const [name, props] = node.arguments;
        if (!isMatching({ type: NodeType.Literal, value: "input" }, name)) return;
        if (!props || props.type !== NodeType.ObjectExpression) return;

        const initialScope = context.sourceCode.getScope(node);

        if (
          O.isSome(findPropInProperties(props.properties, context, initialScope)("checked"))
          && O.isSome(findPropInProperties(props.properties, context, initialScope)("defaultChecked"))
        ) {
          return context.report({
            messageId: "NO_MIXING_CONTROLLED_AND_UNCONTROLLED",
            node: node,
          });
        }
        if (
          O.isSome(findPropInProperties(props.properties, context, initialScope)("value"))
          && O.isSome(findPropInProperties(props.properties, context, initialScope)("defaultValue"))
        ) {
          return context.report({
            messageId: "NO_MIXING_CONTROLLED_AND_UNCONTROLLED",
            node: node,
          });
        }
      },
      JSXOpeningElement(node) {
        const name = elementType(node);
        if (name !== "input") return;

        const initialScope = context.sourceCode.getScope(node);
        if (hasEveryProp(node.attributes, ["checked", "defaultChecked"], context, initialScope)) {
          return context.report({
            messageId: "NO_MIXING_CONTROLLED_AND_UNCONTROLLED",
            node: node,
          });
        }

        if (hasEveryProp(node.attributes, ["value", "defaultValue"], context, initialScope)) {
          return context.report({
            messageId: "NO_MIXING_CONTROLLED_AND_UNCONTROLLED",
            node: node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
