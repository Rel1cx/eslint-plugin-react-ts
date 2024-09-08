import * as AST from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-component-will-update";

export type MessageID = CamelCase<typeof RULE_NAME>;

function isUnsafeComponentWillUpdate(node: TSESTree.ClassElement) {
  return AST.isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node)
    && node.key.type === AST_NODE_TYPES.Identifier
    && node.key.name === "UNSAFE_componentWillUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'UNSAFE_componentWillUpdate'",
    },
    messages: {
      noUnsafeComponentWillUpdate: "Do not use 'UNSAFE_componentWillUpdate'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("UNSAFE_componentWillUpdate")) return {};
    const { ctx, listeners } = useComponentCollectorLegacy();

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { node: component } of components.values()) {
          const { body } = component.body;

          for (const member of body) {
            if (isUnsafeComponentWillUpdate(member)) {
              context.report({
                messageId: "noUnsafeComponentWillUpdate",
                node: member,
              });
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
});
