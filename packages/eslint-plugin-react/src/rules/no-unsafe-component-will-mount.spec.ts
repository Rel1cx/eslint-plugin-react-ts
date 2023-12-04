import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-component-will-mount";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      class Foo extends Bar {
        componentWillMount() {}
      }
    `,
    dedent`
      import React from "react";

      class Foo extends React.Component {

        componentWillMount() {}

        render() {
          return <div />;
        }
      }
    `,
    dedent`
      import React from "react";

      class Foo extends React.PureComponent {

        componentWillMount() {}

        render() {
          return <div />;
        }
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        import React from "react";

        class Foo extends React.Component {

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNSAFE_COMPONENT_WILL_MOUNT",
        },
      ],
    },
    {
      code: dedent`
        import React from "react";

        class Foo extends React.PureComponent {

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNSAFE_COMPONENT_WILL_MOUNT",
        },
      ],
    },
    {
      code: dedent`
        import { Component } from "react";

        class Foo extends Component {

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNSAFE_COMPONENT_WILL_MOUNT",
        },
      ],
    },
    {
      code: dedent`
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNSAFE_COMPONENT_WILL_MOUNT",
        },
      ],
    },
  ],
});
