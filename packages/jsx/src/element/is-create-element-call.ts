import { NodeType } from "@eslint-react/ast";
import { E, F } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { getPragmaFromContext, isDestructuredFromPragma } from "../pragma";

/**
 * Checks if the given node is a call expression to `React.createElement`
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is a call expression to `createElement`
 */
export const isCreateElementCall = (node: TSESTree.Node, context: RuleContext): node is TSESTree.CallExpression => {
    if (node.type !== NodeType.CallExpression || !("callee" in node)) {
        return false;
    }

    const maybePragma = getPragmaFromContext(context);
    if (E.isLeft(maybePragma)) {
        return false;
    }

    const pragma = maybePragma.right;

    return match(node.callee)
        .with(
            {
                type: NodeType.MemberExpression,
                object: { name: pragma },
                property: { name: "createElement" },
            },
            F.constTrue,
        )
        .with({ name: "createElement" }, ({ name }) => isDestructuredFromPragma(name, context))
        .otherwise(F.constFalse);
};
