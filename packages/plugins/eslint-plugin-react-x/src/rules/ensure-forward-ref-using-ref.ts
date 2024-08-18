// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3667
import { isFunction } from "@eslint-react/ast";
import { isForwardRefCall } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "ensure-forward-ref-using-ref";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "require a 'ref' parameter to be set when using 'forwardRef'",
    },
    messages: {
      ensureForwardRefUsingRef: "A 'forwardRef' is used with this component but no 'ref' parameter is set.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("forwardRef")) return {};
    return {
      CallExpression(node) {
        if (!isForwardRefCall(node, context)) return;
        const [component] = node.arguments;
        if (!component || !isFunction(component)) return;
        const [_, ref] = component.params;
        if (!ref) {
          context.report({
            messageId: "ensureForwardRefUsingRef",
            node: component,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
