import type { TSESTreeFunction } from "@eslint-react/ast";
import { getFunctionIdentifier, NodeType } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { isReactHookCallWithNameLoose } from "../hook";
import { isForwardRefCall, isMemoCall } from "../react-api";

function isComponentWrapperCall(node: TSESTree.Node, context: RuleContext) {
  if (node.type !== NodeType.CallExpression) return false;
  return false
    || isMemoCall(node, context)
    || isForwardRefCall(node, context)
    || isReactHookCallWithNameLoose(node)("useCallback");
}

export function getFunctionComponentIdentifier(
  node: TSESTreeFunction,
  context: RuleContext,
): O.Option<TSESTree.Identifier | TSESTree.Identifier[]> {
  const functionId = getFunctionIdentifier(node);
  if (O.isSome(functionId)) return functionId;
  const { parent } = node;
  if (
    true // Get function component identifier from `const Component = memo(() => {});`
    && parent.type === NodeType.CallExpression
    && isComponentWrapperCall(parent, context)
    && parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.id.type === NodeType.Identifier
    && parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some(parent.parent.id);
  }
  if (
    true // Get function component identifier from `const Component = memo(forwardRef(() => {}));`
    && parent.type === NodeType.CallExpression
    && isComponentWrapperCall(parent, context)
    && parent.parent.type === NodeType.CallExpression
    && isComponentWrapperCall(parent.parent, context)
    && parent.parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.parent.id.type === NodeType.Identifier
    && parent.parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some(parent.parent.parent.id);
  }
  return O.none();
}
