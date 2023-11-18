import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./ensure-use-memo-has-non-empty-deps";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: rootDir,
  },
});

// TODO: add more tests
ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      import { useMemo } from "react";

      function App({ items }) {
        const memoizedValue = useMemo(() => [...items].sort(), [items]);
        return <div>{count}</div>;
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { useMemo } from "react";

        const Comp = () => {
          const style = useMemo((theme: MantineTheme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), []);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: dedent`
        import { useMemo } from "react";

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 2, 1].sort(), []);
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: dedent`
        const { useMemo } = require("react");

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 2, 1].sort(), []);
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: dedent`
        import React from "react";

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
  ],
});
