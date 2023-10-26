import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./ensure-custom-hooks-using-other-hooks";

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

ruleTester.run(RULE_NAME, rule, {
    valid: [
        ...allValid,
        dedent`
            const useData = (key) => {
                return useSWR(key);
            }
        `,
        dedent`
            function useData(key) {
                return useSWR(key);
            }
        `,
        dedent`
            function useData(key) {
                const data = useSWR(key);
                return data;
            }
        `,
        dedent`
            const useData = (key) => useSWR(key);
        `,
    ],
    invalid: [
        {
            code: dedent`
                const useClassnames = (obj) => {
                    // Invalid, because useClassnames doesn't use any other React Hooks.
                    var k, cls='';
                    for (k in obj) {
                      if (obj[k]) {
                        cls && (cls += ' ');
                        cls += k;
                      }
                    }
                    return cls;
                  }
            `,
            errors: [
                {
                    messageId: "CUSTOM_HOOKS_NOT_USING_OTHER_HOOKS",
                    data: {
                        name: "useClassnames",
                    },
                },
            ],
        },
        {
            code: dedent`
                function useClassnames(obj) {
                    // Invalid, because useClassnames doesn't use any other React Hooks.
                    var k, cls='';
                    for (k in obj) {
                        if (obj[k]) {
                        cls && (cls += ' ');
                        cls += k;
                        }
                    }
                    return cls;
                }
            `,
            errors: [
                {
                    messageId: "CUSTOM_HOOKS_NOT_USING_OTHER_HOOKS",
                    data: {
                        name: "useClassnames",
                    },
                },
            ],
        },
    ],
});
