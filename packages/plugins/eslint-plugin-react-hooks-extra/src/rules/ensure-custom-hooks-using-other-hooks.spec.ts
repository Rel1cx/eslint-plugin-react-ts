import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./ensure-custom-hooks-using-other-hooks";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
          messageId: "ensureCustomHooksUsingOtherHooks",
          data: {
            name: "useClassnames",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "ensureCustomHooksUsingOtherHooks",
          data: {
            name: "useClassnames",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        export function useNestedHook() {
            const [state, setState] = useState("state");
            function useInnerHook () {
                return "inner hook";
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          messageId: "ensureCustomHooksUsingOtherHooks",
          data: {
            name: "useInnerHook",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        export function useNestedHook() {
            const useInnerHook = () => {
                const [state, setState] = useState("state");
                return state;
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          messageId: "ensureCustomHooksUsingOtherHooks",
          data: {
            name: "useNestedHook",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        export function useNestedHook() {
            const useInnerHook = () => {
                return "inner hook";
            };

            return null
        }
      `,
      errors: [
        {
          messageId: "ensureCustomHooksUsingOtherHooks",
          data: {
            name: "useNestedHook",
          },
        },
        {
          messageId: "ensureCustomHooksUsingOtherHooks",
          data: {
            name: "useInnerHook",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        export function useNestedHook() {
            const fn = () => {
                const [state, setState] = useState("state");
                return state;
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          messageId: "ensureCustomHooksUsingOtherHooks",
          data: {
            name: "useNestedHook",
          },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { useState } from "react";

      const Comp = () => {
        const [state, setState] = useState(false);

        return <Button />;
      };
    `,
    /* tsx */ `
      const useData = (key) => {
          return useSWR(key);
      }
    `,
    /* tsx */ `
      function useData(key) {
          return useSWR(key);
      }
    `,
    /* tsx */ `
      function useData(key) {
          const data = useSWR(key);
          return data;
      }
    `,
    /* tsx */ `
      const useData = (key) => useSWR(key);
    `,
  ],
});
