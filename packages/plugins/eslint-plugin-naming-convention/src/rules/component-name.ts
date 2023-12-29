import { getClassIdentifier, getFunctionIdentifier } from "@eslint-react/ast";
import { useComponentCollector, useComponentCollectorLegacy } from "@eslint-react/core";
import { elementType } from "@eslint-react/jsx";
import { RE_CONSTANT_CASE, RE_PASCAL_CASE } from "@eslint-react/shared";
import { _, O } from "@eslint-react/tools";
import { type ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { type ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "component-name";

export type MessageID = ConstantCase<typeof RULE_NAME>;

type Case = "CONSTANT_CASE" | "PascalCase";

/* eslint-disable no-restricted-syntax */
type Options = readonly [
  | {
    excepts?: readonly string[];
    rule?: Case;
  }
  | Case
  | undefined,
];
/* eslint-enable no-restricted-syntax */

const defaultOptions = [
  {
    excepts: [],
    rule: "PascalCase",
  },
] as const satisfies Options;

const schema = [
  {
    anyOf: [
      {
        type: "string",
        enum: ["PascalCase", "CONSTANT_CASE"],
      },
      {
        type: "object",
        additionalProperties: false,
        properties: {
          excepts: {
            type: "array",
            items: { type: "string", format: "regex" },
          },
          rule: {
            type: "string",
            enum: ["PascalCase", "CONSTANT_CASE"],
          },
        },
      },
    ] satisfies JSONSchema4[],
  },
] satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "enforce component naming convention to `PascalCase` or `CONSTANT_CASE`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema,
    messages: {
      COMPONENT_NAME: "Component name must be in {{case}}.",
    },
  },
  defaultOptions,
  create(context) {
    const options = context.options[0] ?? defaultOptions[0];
    const excepts = _.isString(options) ? [] : options.excepts ?? [];
    const rule = _.isString(options) ? options : options.rule ?? "PascalCase";

    function validate(name: string, casing: Case = rule, ignores: readonly string[] = excepts) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      if (ignores.map((pattern) => new RegExp(`^${pattern}$`, "u")).some((pattern) => pattern.test(name))) {
        return true;
      }

      return match(casing)
        .with("CONSTANT_CASE", () => RE_CONSTANT_CASE.test(name))
        .with("PascalCase", () => RE_PASCAL_CASE.test(name))
        .exhaustive();
    }

    const collector = useComponentCollector(context);
    const collectorLegacy = useComponentCollectorLegacy(context);

    return {
      ...collector.listeners,
      ...collectorLegacy.listeners,
      JSXOpeningElement(node) {
        const name = elementType(node);

        if (
          // Ignore built-in element names
          /^[a-z]/u.test(name)
          // Ignore non-Latin character names
          || /\W/u.test(name)
          // Ignore JSX member expression names
          || name.includes(".")
          // Ignore JSX namespace names
          || name.includes(":")
        ) {
          return;
        }

        if (validate(name.replace(/^_/u, ""))) {
          return;
        }

        context.report({
          data: {
            case: rule,
          },
          messageId: "COMPONENT_NAME",
          node,
        });
      },
      "Program:exit"(node) {
        const functionComponents = collector.ctx.getAllComponents(node);
        const classComponents = collectorLegacy.ctx.getAllComponents(node);

        for (const { node: component } of functionComponents.values()) {
          const maybeId = getFunctionIdentifier(component);

          if (O.isNone(maybeId)) {
            continue;
          }

          const id = maybeId.value;

          const { name } = id;

          if (validate(name)) {
            continue;
          }

          context.report({
            data: {
              case: rule,
            },
            messageId: "COMPONENT_NAME",
            node: id,
          });
        }
        for (const { node: component } of classComponents.values()) {
          const maybeId = getClassIdentifier(component);

          if (O.isNone(maybeId)) {
            continue;
          }

          const id = maybeId.value;

          const { name } = id;

          if (validate(name)) {
            continue;
          }

          context.report({
            data: {
              case: rule,
            },
            messageId: "COMPONENT_NAME",
            node: id,
          });
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID, Options>;
