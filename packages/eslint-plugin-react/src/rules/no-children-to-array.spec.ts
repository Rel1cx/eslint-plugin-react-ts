import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { defaultParserOptions } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-children-to-array";

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
        toArray: () => [],
      }

      export default function ReversedList({ children }) {
        const result = Children.toArray(children);
        result.reverse();
        // ...
      }
    `,
    dedent`
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

        export default function ReversedList({ children }) {
          const result = Children.toArray(children);
          result.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_TO_ARRAY",
      }],
    },
    {
      code: dedent`
        const { Children } = require('react');

        export default function ReversedList({ children }) {
          const result = Children.toArray(children);
          result.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_TO_ARRAY",
      }],
    },
    {
      code: dedent`
        import React from 'react';

        export default function ReversedList({ children }) {
          const result = React.Children.toArray(children);
          result.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_TO_ARRAY",
      }],
    },
    {
      code: dedent`
        import * as React from 'react';

        export default function ReversedList({ children }) {
          const result = React.Children.toArray(children);
          result.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_TO_ARRAY",
      }],
    },
  ],
});
