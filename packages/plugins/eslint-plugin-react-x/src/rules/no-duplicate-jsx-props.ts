import { isString } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-duplicate-jsx-props";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow duplicate props",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDuplicateJsxProps: "This JSX property is assigned multiple times.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXOpeningElement(node) {
        const props: string[] = [];
        for (const attr of node.attributes) {
          if (attr.type === T.JSXSpreadAttribute) {
            continue;
          }
          const name = attr.name.name;
          if (!isString(name)) {
            continue;
          }
          if (!props.includes(name)) {
            props.push(name);
            continue;
          }
          context.report({
            messageId: "noDuplicateJsxProps",
            node: attr,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
