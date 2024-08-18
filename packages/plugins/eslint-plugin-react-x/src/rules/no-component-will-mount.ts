import { isOneOf } from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-component-will-mount";

export type MessageID = CamelCase<typeof RULE_NAME>;

function isComponentWillMount(node: TSESTree.ClassElement) {
  return isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node)
    && node.key.type === AST_NODE_TYPES.Identifier
    && node.key.name === "componentWillMount";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'componentWillMount'",
    },
    messages: {
      noComponentWillMount: "[Deprecated] Use 'UNSAFE_componentWillMount' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("componentWillMount")) return {};
    const { ctx, listeners } = useComponentCollectorLegacy();

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { node: component } of components.values()) {
          const { body } = component.body;

          for (const member of body) {
            if (isComponentWillMount(member)) {
              context.report({
                messageId: "noComponentWillMount",
                node: member,
              });
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
