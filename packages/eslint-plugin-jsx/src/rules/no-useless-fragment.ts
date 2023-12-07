import { NodeType } from "@eslint-react/ast";
import {
  getFragmentFromContext,
  getPragmaFromContext,
  hasProp,
  isFragmentElement,
  isJSXElementOfBuiltinComponent,
  isLiteral,
  isPaddingSpaces,
} from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export type MessageID = "NO_USELESS_FRAGMENT" | "NO_USELESS_FRAGMENT_IN_BUILT_IN";

const allowExpressions = true;

/**
 * Check if a JSXElement or JSXFragment has only one literal child and is not a child
 * @param node The AST node to check
 * @returns `true` if the node has only one literal child and is not a child
 * @example Somehow fragment like this is useful: <Foo content={<>ee eeee eeee ...</>} />
 */
function isFragmentWithOnlyTextAndIsNotChild(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  return node.children.length === 1
    && isLiteral(node.children[0])
    && !(node.parent.type === NodeType.JSXElement || node.parent.type === NodeType.JSXFragment);
}

function containsCallExpression(node: TSESTree.Node) {
  return node.type === NodeType.JSXExpressionContainer
    && node.expression.type === NodeType.CallExpression;
}

/**
 * Check if a JSXElement or JSXFragment has less than two non-padding children and the first child is not a call expression
 * @param node The AST node to check
 * @returns boolean
 */
function isFragmentHasLessThanTwoChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  const nonPaddingChildren = node.children.filter(
    (child) => !isPaddingSpaces(child),
  );

  if (nonPaddingChildren.length === 1 && nonPaddingChildren[0]) {
    return !containsCallExpression(nonPaddingChildren[0]);
  }

  return nonPaddingChildren.length === 0;
}

function isFragmentWithSingleExpression(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  const children = node.children.filter((child) => !isPaddingSpaces(child));

  return (
    children.length === 1
    && children[0]?.type === NodeType.JSXExpressionContainer
  );
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow unnecessary fragments",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_USELESS_FRAGMENT: "Fragments containing a single element are usually unnecessary.",
      NO_USELESS_FRAGMENT_IN_BUILT_IN: "Passing a fragment to a built-in component is unnecessary.",
    },
  },
  defaultOptions: [],
  create(context) {
    const reactPragma = getPragmaFromContext(context);
    const fragmentPragma = getFragmentFromContext(context);

    function checkNode(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
      const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

      if (
        node.type === NodeType.JSXElement
        && hasProp(
          node.openingElement.attributes,
          "key",
          context,
          initialScope,
        )
      ) {
        return;
      }

      if (
        isFragmentHasLessThanTwoChildren(node)
        && !isFragmentWithOnlyTextAndIsNotChild(node)
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        && !(allowExpressions && isFragmentWithSingleExpression(node))
      ) {
        context.report({
          messageId: "NO_USELESS_FRAGMENT",
          node,
        });
      }

      if (isJSXElementOfBuiltinComponent(node.parent)) {
        context.report({
          messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN",
          node,
        });
      }
    }

    return {
      JSXElement(node) {
        if (isFragmentElement(node, reactPragma, fragmentPragma)) {
          checkNode(node);
        }
      },
      JSXFragment: checkNode,
    };
  },
});
