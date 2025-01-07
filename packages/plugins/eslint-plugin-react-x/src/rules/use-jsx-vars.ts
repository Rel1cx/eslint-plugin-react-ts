import { O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "use-jsx-vars";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "helpes `eslint/no-unused-vars` to correctly mark JSX variables as used.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      useJsxVars: "",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function getName(node: TSESTree.Node): O.Option<string> {
      switch (node.type) {
        case T.JSXIdentifier:
          return O.some(node.name);
        case T.JSXMemberExpression:
          return getName(node.object);
        default:
          return O.none();
      }
    }
    return {
      JSXOpeningElement(node) {
        if (node.name.type === T.JSXIdentifier && /^[a-z]/u.test(node.name.name)) {
          return;
        }
        for (const name of O.toArray(getName(node.name))) {
          context.sourceCode.markVariableAsUsed(name, node);
        }
      },
    };
  },
  defaultOptions: [],
});
