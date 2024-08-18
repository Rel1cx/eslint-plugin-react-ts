// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3579/commits/ebb739a0fe99a2ee77055870bfda9f67a2691374
import { getNestedCallExpressions } from "@eslint-react/ast";
import { isReactHookCall, isReactHookCallWithNameLoose, isUseStateCall } from "@eslint-react/core";
import { decodeSettings } from "@eslint-react/shared";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-use-state-lazy-initialization";

export type MessageID = CamelCase<typeof RULE_NAME>;

// variables should be defined here
const ALLOW_LIST = ["Boolean", "String", "Number"];

// rule takes inspiration from https://github.com/facebook/react/issues/26520
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow function calls in 'useState' that aren't wrapped in an initializer function",
    },
    messages: {
      preferUseStateLazyInitialization:
        "To prevent re-computation, consider using lazy initial state for useState calls that involve function calls. Ex: 'useState(() => getValue())'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("use")) return {};
    const alias = decodeSettings(context.settings).additionalHooks?.useState ?? [];
    return {
      CallExpression(node) {
        if (!isReactHookCall(node)) return;
        if (!isUseStateCall(node, context) && !alias.some(isReactHookCallWithNameLoose(node))) return;
        const [useStateInput] = node.arguments;
        if (!useStateInput) return;
        const nestedCallExpressions = getNestedCallExpressions(useStateInput);
        const hasFunctionCall = nestedCallExpressions.some((n) => {
          return "name" in n.callee
            && !ALLOW_LIST.includes(n.callee.name);
        });
        if (!hasFunctionCall) return;
        context.report({
          messageId: "preferUseStateLazyInitialization",
          node: useStateInput,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
