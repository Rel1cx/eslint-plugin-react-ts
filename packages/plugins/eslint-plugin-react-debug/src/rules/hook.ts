import { useHookCollector } from "@eslint-react/core";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "hook";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all React Hooks",
    },
    messages: {
      hook: "[hook] name: {{name}}, hookCalls: {{hookCalls}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useHookCollector();

    return {
      ...listeners,
      "Program:exit"(node) {
        const allHooks = ctx.getAllHooks(node);

        for (const { name, node, hookCalls } of allHooks.values()) {
          context.report({
            messageId: "hook",
            node,
            data: {
              name: name.value,
              hookCalls: hookCalls.length,
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
