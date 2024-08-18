import { isCloneElementCall } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-clone-element";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'cloneElement'",
    },
    messages: {
      noCloneElement: "Using 'cloneElement' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("cloneElement")) return {};
    return {
      CallExpression(node) {
        if (!isCloneElementCall(node, context)) return;
        context.report({
          messageId: "noCloneElement",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
