import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isStringLiteral(node: TSESTree.Node): node is TSESTree.StringLiteral {
  return node.type === T.Literal && typeof node.value === "string";
}
