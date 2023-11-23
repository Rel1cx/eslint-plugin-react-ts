import { is, NodeType, traverseUp } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { isCreateElementCall } from "./is-element-call";

/**
 * Determines whether inside createElement's props.
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is inside createElement's props
 */
export function isInsideCreateElementProps(node: TSESTree.Node, context: RuleContext) {
  const parentCreateElement = traverseUp(node, n => isCreateElementCall(n, context));

  if (parentCreateElement?.type !== NodeType.CallExpression) {
    return false;
  }

  return parentCreateElement.arguments.at(1) === traverseUp(node, is(NodeType.ObjectExpression));
}

export function isChildrenOfCreateElement(node: TSESTree.Node, context: RuleContext) {
  const maybeCallExpression = node.parent;

  if (!maybeCallExpression || !isCreateElementCall(maybeCallExpression, context)) {
    return false;
  }

  return maybeCallExpression.arguments
    .slice(2)
    .some((child) => child === node);
}

/**
 * Check if a `JSXElement` or `JSXFragment` has children
 * @param node The AST node to check
 * @param predicate A predicate to filter the children
 * @returns `true` if the node has children
 */
export function hasChildren(
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  predicate?: (node: TSESTree.JSXChild) => boolean,
) {
  if (typeof predicate === "function") {
    return node.children.some(predicate);
  }

  return node.children.length > 0;
}

/**
 * Check if a node is a child of a `JSXElement`
 * @param node The AST node to check
 * @returns `true` if the node is a child of a `JSXElement`
 */
export function isChildOfJSXElement(node: TSESTree.Node): node is
  & TSESTree.JSXElement
  & { parent: TSESTree.JSXElement }
{
  return node.parent?.type === NodeType.JSXElement
    && node.parent.children.some((child) => child === node);
}
