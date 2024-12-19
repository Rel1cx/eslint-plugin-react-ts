import { isInitializedFromReact } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import { decodeSettings } from "@eslint-react/shared";
import type { RuleFeature } from "@eslint-react/types";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "is-from-react";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all identifiers that are initialized from React.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      isFromReact: "[initialized from react] name: '{{name}}', import source: '{{importSource}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = decodeSettings(context.settings);
    const finalSettings = {
      ...settings,
      strictImportCheck: true,
    } satisfies typeof settings;
    function isFromReact(
      node: TSESTree.Identifier | TSESTree.JSXIdentifier,
      initialScope: Scope,
    ) {
      const name = node.name;
      switch (true) {
        case node.parent.type === AST_NODE_TYPES.MemberExpression
          && node.parent.property === node
          && node.parent.object.type === AST_NODE_TYPES.Identifier:
          return isInitializedFromReact(node.parent.object.name, initialScope, finalSettings);
        case node.parent.type === AST_NODE_TYPES.JSXMemberExpression
          && node.parent.property === node
          && node.parent.object.type === AST_NODE_TYPES.JSXIdentifier:
          return isInitializedFromReact(node.parent.object.name, initialScope, finalSettings);
        default:
          return isInitializedFromReact(name, initialScope, finalSettings);
      }
    }
    function getReportDescriptor(
      node: TSESTree.Identifier | TSESTree.JSXIdentifier,
    ): O.Option<ReportDescriptor<MessageID>> {
      const shouldSkipDuplicate = node.parent.type === AST_NODE_TYPES.ImportSpecifier
        && node.parent.imported === node
        && node.parent.imported.name === node.parent.local.name;
      if (shouldSkipDuplicate) return O.none();
      const name = node.name;
      const initialScope = context.sourceCode.getScope(node);
      if (!isFromReact(node, initialScope)) return O.none();
      return O.some({
        messageId: "isFromReact",
        node,
        data: {
          type: node.type,
          name,
          importSource: settings.importSource ?? "react",
        },
      });
    }
    return {
      Identifier: F.flow(getReportDescriptor, O.map(context.report)),
      JSXIdentifier: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
