import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isMatching, P } from "ts-pattern";

/**
 * Unsafe check whether given node is declared directly inside a render property
 * ```jsx
 * const rows = { render: () => <div /> }
 * `                      ^^^^^^^^^^^^^ `
 * _ = <Component rows={ [{ render: () => <div /> }] } />
 * `                                ^^^^^^^^^^^^^       `
 *  ```
 * @internal
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render property, `false` if not
 */
export function isDirectValueOfRenderPropertyLoose(node: TSESTree.Node) {
  const matching = isMatching({
    key: {
      type: T.Identifier,
      name: P.string.startsWith("render"),
    },
    type: T.Property,
  });

  return matching(node) || matching(node.parent);
}

/**
 * Unsafe check whether given node is declared inside a render prop
 * ```jsx
 * _ = <Component renderRow={"node"} />
 * `                         ^^^^^^   `
 * _ = <Component rows={ [{ render: "node" }] } />
 * `                                ^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render prop, `false` if not
 */
export function isDeclaredInRenderPropLoose(node: TSESTree.Node) {
  if (isDirectValueOfRenderPropertyLoose(node)) {
    return true;
  }

  return F.pipe(
    AST.findParentNodeGuard(node, AST.is(T.JSXExpressionContainer)),
    O.flatMapNullable(c => c.parent),
    O.filter(AST.is(T.JSXAttribute)),
    O.flatMapNullable(a => a.name),
    O.exists(isMatching({
      type: T.JSXIdentifier,
      name: P.string.startsWith("render"),
    })),
  );
}
