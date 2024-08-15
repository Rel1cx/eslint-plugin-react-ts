import type { TSESTreeFunction } from "@eslint-react/ast";
import { traverseUp } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { isMatching, P } from "ts-pattern";

import { isClassComponent } from "./component-collector-legacy";

const isRenderMethodLike = isMatching({
  key: {
    type: AST_NODE_TYPES.Identifier,
    name: "render",
  },
  type: P.union(AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition),
  parent: {
    type: AST_NODE_TYPES.ClassBody,
    parent: {
      type: AST_NODE_TYPES.ClassDeclaration,
    },
  },
});

export function isFunctionOfRenderMethod(node: TSESTreeFunction) {
  if (!isRenderMethodLike(node.parent)) return false;

  return isClassComponent(node.parent.parent.parent);
}

/**
 * Check whether given node is declared inside class component's render block
 * ```jsx
 * class Component extends React.Component {
 *   render() {
 *     class NestedClassComponent extends React.Component {
 *      render() { return <div />; }
 *     }
 *     const nestedFunctionComponent = () => <div />;
 *  }
 * }
 * ```
 * @param node The AST node being checked
 * @returns `true` if node is inside class component's render block, `false` if not
 */
export function isInsideRenderMethod(node: TSESTree.Node) {
  const predicate = (node: TSESTree.Node): node is TSESTree.MethodDefinition => {
    return isRenderMethodLike(node) && isClassComponent(node.parent.parent);
  };

  return O.isSome(traverseUp(node, predicate));
}
