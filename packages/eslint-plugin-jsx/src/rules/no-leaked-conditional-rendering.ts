/* eslint-disable unicorn/no-typeof-undefined */
import { isOneOf, NodeType } from "@eslint-react/ast";
import { createRule } from "@eslint-react/shared";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

export const RULE_NAME = "no-leaked-conditional-rendering";

type MessageID = "INVALID";

type TernaryAlternateValue = RegExp | bigint | boolean | null | number | string;

const COERCE_STRATEGY = "coerce";
const TERNARY_STRATEGY = "ternary";
const DEFAULT_VALID_STRATEGIES = [TERNARY_STRATEGY, COERCE_STRATEGY] as const;
const COERCE_VALID_LEFT_SIDE_EXPRESSIONS = [
    NodeType.UnaryExpression,
    NodeType.BinaryExpression,
    NodeType.CallExpression,
] as const;

const TERNARY_INVALID_ALTERNATE_VALUES = new Set<TernaryAlternateValue>([null, false]);

function getIsCoerceValidNestedLogicalExpression(node: TSESTree.Node): boolean {
    if (node.type === NodeType.LogicalExpression) {
        return getIsCoerceValidNestedLogicalExpression(node.left)
            && getIsCoerceValidNestedLogicalExpression(node.right);
    }

    return isOneOf(COERCE_VALID_LEFT_SIDE_EXPRESSIONS)(node);
}

function isValidTernaryAlternate(node: TSESTree.ConditionalExpression) {
    if (!("alternate" in node && "value" in node.alternate)) {
        return true;
    }

    if (typeof node.alternate.value === "undefined") {
        return false;
    }

    return !TERNARY_INVALID_ALTERNATE_VALUES.has(node.alternate.value);
}

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow problematic leaked values from being rendered",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            INVALID: "Potential leaked value that might cause unintentionally rendered values or rendering crashes",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            "JSXExpressionContainer > ConditionalExpression"(node: TSESTree.ConditionalExpression) {
                if (DEFAULT_VALID_STRATEGIES.includes(TERNARY_STRATEGY)) {
                    return;
                }
                const isJSXElementAlternate = node.alternate.type === NodeType.JSXElement;
                if (isValidTernaryAlternate(node) || isJSXElementAlternate) {
                    context.report({
                        messageId: "INVALID",
                        node: node.alternate,
                    });
                }
            },
            'JSXExpressionContainer > LogicalExpression[operator="&&"]'(node: TSESTree.LogicalExpression) {
                const leftSide = node.left;
                const isCoerceValidLeftSide = isOneOf(COERCE_VALID_LEFT_SIDE_EXPRESSIONS)(leftSide);
                if (
                    DEFAULT_VALID_STRATEGIES.includes(COERCE_STRATEGY)
                    && (isCoerceValidLeftSide || getIsCoerceValidNestedLogicalExpression(leftSide))
                ) {
                    return;
                }
                if (leftSide.type === NodeType.Literal && leftSide.value === "") {
                    return;
                }
                context.report({
                    messageId: "INVALID",
                    node: leftSide,
                });
            },
        };
    },
});
