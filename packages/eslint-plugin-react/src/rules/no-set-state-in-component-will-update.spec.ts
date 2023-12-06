import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-set-state-in-component-will-update";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      class Foo extends React.Component {
        componentWillUpdate() {
          class Bar extends Baz {
            componentWillUpdate() {
              this.setState({ foo: "bar" });
            }
          }
        }
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        class Foo extends React.Component {
          componentWillUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "NO_SET_STATE_IN_COMPONENT_WILL_UPDATE" },
      ],
    },
    {
      code: dedent`
        const Foo = class extends React.Component {
          componentWillUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "NO_SET_STATE_IN_COMPONENT_WILL_UPDATE" },
      ],
    },
  ],
});
