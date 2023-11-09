import {
  findVariableByNameUpToGlobal,
  getVariableInit,
  isJSXTagNameExpression,
  isOneOf,
  NodeType,
} from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { isCreateElementCall } from "./element";

/* eslint-disable perfectionist/sort-objects */
export const JSXValueCheckHint = {
  None: 0n,
  SkipNullLiteral: 1n << 0n,
  SkipStringLiteral: 1n << 1n,
  SkipNumberLiteral: 1n << 2n,
  SkipCreateElement: 1n << 3n,
  StrictArray: 1n << 4n,
  StrictLogical: 1n << 5n,
  StrictConditional: 1n << 6n,
} as const;
/* eslint-enable perfectionist/sort-objects */

/**
 * Check if a node is a JSX value
 * @param node The AST node to check
 * @param context The rule context
 * @param hint The `JSXValueCheckHint` to use
 * @returns boolean
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function isJSXValue(
  node: TSESTree.Node | null | undefined,
  context: RuleContext,
  hint: bigint = JSXValueCheckHint.None,
): boolean {
  if (!node) {
    return false;
  }

  return match<typeof node, boolean>(node)
    .with({ type: NodeType.JSXElement }, F.constTrue)
    .with({ type: NodeType.JSXFragment }, F.constTrue)
    .with({ type: NodeType.JSXMemberExpression }, F.constTrue)
    .with({ type: NodeType.JSXNamespacedName }, F.constTrue)
    .with({ type: NodeType.Literal }, (node) => {
      if (!("value" in node)) {
        return false;
      }

      if (hint & JSXValueCheckHint.SkipNullLiteral && node.value === null) {
        return false;
      }

      if (hint & JSXValueCheckHint.SkipStringLiteral && typeof node.value === "string") {
        return false;
      }

      // eslint-disable-next-line sonarjs/prefer-single-boolean-return
      if (hint & JSXValueCheckHint.SkipNumberLiteral && typeof node.value === "number") {
        return false;
      }

      return true;
    })
    .with({ type: NodeType.TemplateLiteral }, () => {
      return !(hint & JSXValueCheckHint.SkipStringLiteral);
    })
    .with({ type: NodeType.ArrayExpression }, (node) => {
      if (!("elements" in node)) {
        return false;
      }

      if (hint & JSXValueCheckHint.StrictArray) {
        return node.elements.every((n) => isJSXValue(n, context, hint));
      }

      return node.elements.some((n) => isJSXValue(n, context, hint));
    })
    .with({ type: NodeType.ConditionalExpression }, (node) => {
      function leftHasJSX(node: TSESTree.ConditionalExpression) {
        if (Array.isArray(node.consequent)) {
          if (hint & JSXValueCheckHint.StrictArray) {
            return node.consequent.every((n: TSESTree.Expression) => isJSXValue(n, context, hint));
          }

          return node.consequent.some((n: TSESTree.Expression) => isJSXValue(n, context, hint));
        }

        return isJSXValue(node.consequent, context, hint);
      }

      function rightHasJSX(node: TSESTree.ConditionalExpression) {
        return isJSXValue(node.alternate, context, hint);
      }

      if (hint & JSXValueCheckHint.StrictConditional) {
        return leftHasJSX(node) && rightHasJSX(node);
      }

      return leftHasJSX(node) || rightHasJSX(node);
    })
    .with({ type: NodeType.LogicalExpression }, (node) => {
      if (!("left" in node)) {
        return false;
      }

      return isJSXValue(node.left, context, hint) || isJSXValue(node.right, context, hint);
    })
    .with({ type: NodeType.SequenceExpression }, (node) => {
      if (!("expressions" in node)) {
        return false;
      }
      const exp = node.expressions.at(-1);

      return isJSXValue(exp, context, hint);
    })
    .with({ type: NodeType.CallExpression }, (node) => {
      if (hint & JSXValueCheckHint.SkipCreateElement) {
        return false;
      }

      return isCreateElementCall(node, context);
    })
    .with({ type: NodeType.Identifier }, (node) => {
      if (isJSXTagNameExpression(node)) {
        return true;
      }

      const maybeVariable = findVariableByNameUpToGlobal(node.name, context.getScope());

      return F.pipe(
        maybeVariable,
        O.flatMap(getVariableInit(0)),
        O.filter(isOneOf([NodeType.JSXElement, NodeType.JSXFragment])),
        O.isSome,
      );
    })
    .otherwise(F.constFalse);
}
