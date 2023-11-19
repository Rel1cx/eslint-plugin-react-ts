import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { defaultParserOptions } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-children-for-each";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      // import { Children } from 'react';

      const Children = {
        forEach: () => undefined,
      }

      function SeparatorList({ children }) {
        const result = [];
        Children.forEach(children, (child, index) => {
          result.push(child);
          result.push(<hr key={index} />);
        });
        // ...
      }
    `,
    dedent`
      import { Children } from 'react';

      function RowList({ children }) {
        return (
          <div className="RowList">
            {Children.map(children, child =>
              <div className="Row">
                {child}
              </div>
            )}
          </div>
        );
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { Children } from 'react';

        function SeparatorList({ children }) {
          const result = [];
          Children.forEach(children, (child, index) => {
            result.push(child);
            result.push(<hr key={index} />);
          });
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_FOR_EACH",
      }],
    },
    {
      code: dedent`
        const { Children } = require('react');

        function SeparatorList({ children }) {
          const result = [];
          Children.forEach(children, (child, index) => {
            result.push(child);
            result.push(<hr key={index} />);
          });
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_FOR_EACH",
      }],
    },
    {
      code: dedent`
        import React from 'react';

        function SeparatorList({ children }) {
          const result = [];
          React.Children.forEach(children, (child, index) => {
            result.push(child);
            result.push(<hr key={index} />);
          });
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_FOR_EACH",
      }],
    },
    {
      code: dedent`
        import * as React from 'react';

        function SeparatorList({ children }) {
          const result = [];
          React.Children.forEach(children, (child, index) => {
            result.push(child);
            result.push(<hr key={index} />);
          });
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_FOR_EACH",
      }],
    },
  ],
});
