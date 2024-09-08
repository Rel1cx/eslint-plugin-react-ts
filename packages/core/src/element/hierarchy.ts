import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isCreateElementCall } from "../react-api";

/**
 * Determines whether inside createElement's props.
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is inside createElement's props
 */
export function isInsideCreateElementProps(
  node: TSESTree.Node,
  context: RuleContext,
) {
  return F.pipe(
    AST.traverseUp(node, n => AST.is(AST_NODE_TYPES.CallExpression)(n) && isCreateElementCall(n, context)),
    O.filter(AST.is(AST_NODE_TYPES.CallExpression)),
    O.flatMapNullable(c => c.arguments.at(1)),
    O.filter(AST.is(AST_NODE_TYPES.ObjectExpression)),
    O.zipWith(AST.traverseUp(node, AST.is(AST_NODE_TYPES.ObjectExpression)), (a, b) => a === b),
    O.getOrElse(F.constFalse),
  );
}

export function isChildrenOfCreateElement(
  node: TSESTree.Node,
  context: RuleContext,
) {
  return F.pipe(
    O.fromNullable(node.parent),
    O.filter(AST.is(AST_NODE_TYPES.CallExpression)),
    O.filter(n => isCreateElementCall(n, context)),
    O.exists(n =>
      n.arguments
        .slice(2)
        .some(arg => arg === node)
    ),
  );
}
