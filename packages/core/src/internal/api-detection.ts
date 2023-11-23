import { NodeType } from "@eslint-react/ast";
import { getPragmaFromContext, isInitializedFromPragma } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

export function isMemberExpressionOfReactMember(pragmaMemberName: string, memberName: string) {
  return (node: TSESTree.MemberExpression, context: RuleContext, pragma = getPragmaFromContext(context)) => {
    if (
      node.property.type !== NodeType.Identifier
      || node.property.name !== memberName
    ) {
      return false;
    }

    if (
      node.object.type === NodeType.Identifier
      && node.object.name === pragmaMemberName
    ) {
      return isInitializedFromPragma(node.object.name, context, pragma);
    }

    if (
      node.object.type === NodeType.MemberExpression
      && node.object.object.type === NodeType.Identifier
      && node.object.object.name === pragma
      && node.object.property.type === NodeType.Identifier
    ) {
      return node.object.property.name === pragmaMemberName;
    }

    return false;
  };
}
