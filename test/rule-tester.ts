import path from "node:path";

import { RuleTester, type RuleTesterConfig } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";

RuleTester.afterAll = vitest.afterAll;
// if you are not using vitest with globals: true
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

export function getFixturesRootDir(): string {
  return path.join(__dirname, "fixtures");
}

export { RuleTester as default } from "@typescript-eslint/rule-tester";

export const defaultParserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  ecmaVersion: 2021,
  project: "./tsconfig.json",
  sourceType: "module",
  tsconfigRootDir: getFixturesRootDir(),
} as const satisfies RuleTesterConfig["parserOptions"];
