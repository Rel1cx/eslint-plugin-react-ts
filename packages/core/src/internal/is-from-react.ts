import { is, isOneOf } from "@eslint-react/ast";
import { unsafeCastSettings } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isInitializedFromReact } from "./is-initialized-from-react";

/**
 * Checks if the given node is a call expression to the given function or method of the pragma
 * @param name The name of the function or method to check
 * @returns A predicate that checks if the given node is a call expression to the given function or method
 */
export function isFromReact(name: string) {
  return (
    node: TSESTree.Identifier | TSESTree.MemberExpression,
    context: RuleContext,
  ) => {
    const settings = unsafeCastSettings(context.settings);
    const initialScope = context.sourceCode.getScope(node);
    if (node.type === AST_NODE_TYPES.MemberExpression) {
      return node.object.type === AST_NODE_TYPES.Identifier
        && node.property.type === AST_NODE_TYPES.Identifier
        && node.property.name === name
        && isInitializedFromReact(node.object.name, initialScope, settings);
    }
    if (node.name === name) return isInitializedFromReact(name, initialScope, settings);
    return false;
  };
}

/**
 * @internal
 * @param memberName The name of the member object
 * @param name The name of the member property
 * @returns A function that checks if a given node is a member expression of a Pragma member.
 */
export function isFromReactMember(
  memberName: string,
  name: string,
): (node: TSESTree.MemberExpression, context: RuleContext) => boolean {
  return (
    node: TSESTree.MemberExpression,
    context: RuleContext,
  ) => {
    const settings = unsafeCastSettings(context.settings);
    const initialScope = context.sourceCode.getScope(node);
    if (node.property.type !== AST_NODE_TYPES.Identifier || node.property.name !== name) return false;
    if (node.object.type === AST_NODE_TYPES.Identifier && node.object.name === memberName) {
      return isInitializedFromReact(node.object.name, initialScope, settings);
    }
    if (
      node.object.type === AST_NODE_TYPES.MemberExpression
      && node.object.object.type === AST_NODE_TYPES.Identifier
      && isInitializedFromReact(node.object.object.name, initialScope, settings)
      && node.object.property.type === AST_NODE_TYPES.Identifier
    ) {
      return node.object.property.name === memberName;
    }
    return false;
  };
}

export function isCallFromReact(name: string) {
  return (node: TSESTree.CallExpression, context: RuleContext) => {
    if (!isOneOf([AST_NODE_TYPES.Identifier, AST_NODE_TYPES.MemberExpression])(node.callee)) return false;
    return isFromReact(name)(node.callee, context);
  };
}

export function isCallFromReactMember(
  pragmaMemberName: string,
  name: string,
) {
  return (node: TSESTree.CallExpression, context: RuleContext) => {
    if (!is(AST_NODE_TYPES.MemberExpression)(node.callee)) return false;
    return isFromReactMember(pragmaMemberName, name)(node.callee, context);
  };
}
