import { isClass, type TSESTreeClass } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { F, MutRef, O } from "@eslint-react/tools";
import { type Scope, ScopeType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { isClassComponent } from "./component-collector-legacy";

/**
 * Get the parent class component of a node up to global scope
 * @param node The AST node to start searching from
 * @param context The rule context
 * @deprecated It will be removed in the future
 */
export function getParentClassComponent(node: TSESTree.Node, context: RuleContext): O.Option<TSESTreeClass> {
  const scopeRef = MutRef.make<O.Option<Scope>>(O.fromNullable(context.sourceCode.getScope?.(node)));
  // eslint-disable-next-line functional/no-loop-statements
  while (F.pipe(MutRef.get(scopeRef), O.exists(({ type }) => type !== ScopeType.class))) {
    MutRef.update(scopeRef, O.flatMapNullable(s => s.upper));
  }

  return F.pipe(
    MutRef.get(scopeRef),
    O.flatMapNullable(s => s.block),
    O.filter(isClass),
    O.filter(node => isClassComponent(node, context)),
  );
}
