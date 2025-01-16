import * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { getId } from "../utils";
import { ERClassComponentFlag } from "./component-flag";
import type { ERClassComponent } from "./component-semantic-node";
import { isClassComponent, isPureComponent } from "./is";

/**
 * Get a ctx and listeners for the rule to collect class components
 * @returns The context and listeners for the rule
 */
export function useComponentCollectorLegacy() {
  const components = new Map<string, ERClassComponent>();

  const ctx = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllComponents(node: TSESTree.Program): typeof components {
      return components;
    },
  } as const;

  const collect = (node: AST.TSESTreeClass) => {
    if (!isClassComponent(node)) {
      return;
    }
    const id = AST.getClassIdentifier(node);
    const key = getId();
    const flag = isPureComponent(node)
      ? ERClassComponentFlag.PureComponent
      : ERClassComponentFlag.None;
    components.set(
      key,
      {
        id,
        key,
        kind: "class",
        name: id?.name,
        node,
        // TODO: Get displayName of class component
        displayName: _,
        flag,
        hint: 0n,
        // TODO: Get methods of class component
        methods: [],
      },
    );
  };

  const listeners = {
    "ClassDeclaration[type]": collect,
    "ClassExpression[type]": collect,
  } as const satisfies ESLintUtils.RuleListener;

  return { ctx, listeners } as const;
}
