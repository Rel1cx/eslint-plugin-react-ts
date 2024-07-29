import { findPropInAttributes, getElementName, getElementType, getPropValue } from "@eslint-react/jsx";
import { decodeSettings, expandSettings } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import * as R from "remeda";
import type { ConstantCase } from "string-ts";

import { createRule, getPropFromUserDefined } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isExternalLinkLike(value: string) {
  return value.startsWith("https://")
    || /^(?:\w+:|\/\/)/u.test(value);
}

function isSafeRel(value: string) {
  return value === "noreferrer"
    || /\bnoreferrer\b/u.test(value);
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: `disallow 'target="_blank"' on an external link without 'rel="noreferrer noopener"'`,
    },
    messages: {
      NO_UNSAFE_TARGET_BLANK:
        `Using 'target="_blank"' on an external link without 'rel="noreferrer noopener"' is a security risk.`,
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = expandSettings(decodeSettings(context.settings));
    const polymorphicPropName = settings.polymorphicPropName;
    const additionalComponents = settings?.additionalComponents?.filter(c => c.as === "a") ?? [];
    function checkJSXElement(node: TSESTree.JSXElement): O.Option<ReportDescriptor<MessageID>> {
      const name = getElementName(node.openingElement);
      const elementType = getElementType(context, polymorphicPropName)(node.openingElement);
      if (name !== "a" && elementType !== "a" && additionalComponents.length === 0) return O.none();
      const { attributes } = node.openingElement;
      const initialScope = context.sourceCode.getScope(node);
      const additionalAttributes = additionalComponents
        .findLast(c => c.re.test(name))
        ?.attributes
        ?? [];
      const [
        targetPropName,
        targetPropDefaultValue,
      ] = getPropFromUserDefined("target", additionalAttributes);
      const targetProp = findPropInAttributes(attributes, context, initialScope)(targetPropName);
      const targetPropValue = O.isNone(targetProp)
        ? O.fromNullable(targetPropDefaultValue)
        : F.pipe(
          targetProp,
          O.flatMap(attr => getPropValue(attr, context)),
          O.flatMapNullable(v => v?.value),
          O.filter(R.isString),
        );
      if (!O.exists(targetPropValue, t => t === "_blank")) return O.none();
      const [
        hrefPropName,
        hrefPropDefaultValue,
      ] = getPropFromUserDefined("href", additionalAttributes);
      const hrefProp = findPropInAttributes(attributes, context, initialScope)(hrefPropName);
      const hrefPropValue = O.isNone(hrefProp)
        ? O.fromNullable(hrefPropDefaultValue)
        : F.pipe(
          hrefProp,
          O.flatMap(attr => getPropValue(attr, context)),
          O.flatMapNullable(v => v?.value),
          O.filter(R.isString),
        );
      if (!O.exists(hrefPropValue, isExternalLinkLike)) return O.none();
      const [
        relPropName,
        relPropDefaultValue,
      ] = getPropFromUserDefined("rel", additionalAttributes);
      const relProp = findPropInAttributes(attributes, context, initialScope)(relPropName);
      const relPropValue = O.isNone(relProp)
        ? O.fromNullable(relPropDefaultValue)
        : F.pipe(
          relProp,
          O.flatMap(attr => getPropValue(attr, context)),
          O.flatMapNullable(v => v?.value),
          O.filter(R.isString),
        );
      if (O.exists(relPropValue, isSafeRel)) return O.none();
      return O.some(
        {
          messageId: "NO_UNSAFE_TARGET_BLANK",
          node,
        } as const,
      );
    }
    return {
      JSXElement: F.flow(checkJSXElement, O.map(context.report)),
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
