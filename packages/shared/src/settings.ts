import { E, F } from "@eslint-react/eff";
import { shallowEqual } from "fast-equals";
import memoize from "micro-memoize";
import pm from "picomatch";
import { match, P } from "ts-pattern";
import type { PartialDeep } from "type-fest";
import { parse } from "valibot";

import { getReactVersion } from "./get-react-version";
import type { ESLintReactSettings, ESLintReactSettingsNormalized } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

// #region Constants

/**
 * The default ESLint settings for "react-x".
 */
export const DEFAULT_ESLINT_REACT_SETTINGS = {
  additionalHooks: {
    useLayoutEffect: ["useIsomorphicLayoutEffect"],
  },
  polymorphicPropName: "as",
  strictImportCheck: false,
  version: "detect",
} as const satisfies ESLintReactSettings;

// #endregion

// #region Decoding Functions

/**
 * Unsafely casts settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export function unsafeDecodeSettings(data: unknown): PartialDeep<ESLintReactSettings> {
  // @ts-expect-error - skip type checking for unsafe cast
  // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
  return (data?.["react-x"] ?? {}) as PartialDeep<ESLintReactSettings>;
}

/**
 * Decodes settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export const decodeSettings = memoize((data: unknown): ESLintReactSettings => {
  return {
    ...DEFAULT_ESLINT_REACT_SETTINGS,
    ...parse(ESLintSettingsSchema, data)["react-x"] ?? {},
  };
}, { isEqual: (a, b) => a === b });

// #endregion

// #region Normalization Functions

/**
 * Normalizes the settings by converting all shorthand properties to their full form.
 * @param settings The settings.
 * @returns The normalized settings.
 * @internal
 */
export const normalizeSettings = memoize((settings: ESLintReactSettings): ESLintReactSettingsNormalized => {
  const additionalComponents = settings.additionalComponents ?? [];
  return {
    ...settings,
    additionalComponents: additionalComponents.map((component) => ({
      ...component,
      attributes: component.attributes?.map((attr) => ({
        ...attr,
        as: attr.as ?? attr.name,
      })) ?? [],
      re: pm.makeRe(component.name, { fastpaths: true }),
    })),
    components: additionalComponents.reduce((acc, component) => {
      const { name, as, attributes = [], selector } = component;
      if (!name || !as || selector || attributes.length > 0) return acc;
      if (!/^[\w-]+$/u.test(name)) return acc;
      return acc.set(name, as);
    }, new Map<string, string>()),
    version: match(settings.version)
      .with(P.union(P.nullish, "", "detect"), () => E.getOrElse(getReactVersion(), F.constant("19.0.0")))
      .otherwise(F.identity),
  };
}, { isEqual: shallowEqual });

// #endregion

// #region Helper Functions

export function getSettingsFromContext(context: { settings: unknown }): ESLintReactSettingsNormalized {
  return normalizeSettings(decodeSettings(context.settings));
}

/**
 * A helper function to define settings for "react-x" with type checking in JavaScript files.
 * @param settings The settings.
 * @returns The settings.
 */
export const defineSettings: (settings: ESLintReactSettings) => ESLintReactSettings = F.identity;

// #endregion

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    // eslint-disable-next-line no-restricted-syntax
    "react-x"?: Partial<ESLintReactSettings>;
  }
}
