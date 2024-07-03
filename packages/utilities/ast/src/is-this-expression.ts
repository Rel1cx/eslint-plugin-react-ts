import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

export function isThisExpression(node: TSESTree.Expression) {
  if (node.type === NodeType.TSAsExpression) {
    return isThisExpression(node.expression);
  }

  return node.type === NodeType.ThisExpression;
}
