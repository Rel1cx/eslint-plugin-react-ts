import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-find-dom-node";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import ReactDOM from "react-dom";

        export const Component = () => {
          ReactDOM.findDOMNode();
        };
      `,
      errors: [
        { messageId: "NO_FIND_DOM_NODE" },
      ],
    },
    {
      code: /* tsx */ `
        import { findDOMNode } from "react-dom";

        export const Component = () => {
          findDOMNode();
        };
      `,
      errors: [
        { messageId: "NO_FIND_DOM_NODE" },
      ],
    },

    {
      code: /* tsx */ `
        var Hello = createReactClass({
          componentDidMount: function() {
            React.findDOMNode(this).scrollIntoView();
          },
          render: function() {
            return <div>Hello</div>;
          }
        });
      `,
      errors: [{ messageId: "NO_FIND_DOM_NODE" }],
    },
    {
      code: /* tsx */ `
        var Hello = createReactClass({
          componentDidMount: function() {
            ReactDOM.findDOMNode(this).scrollIntoView();
          },
          render: function() {
            return <div>Hello</div>;
          }
        });
      `,
      errors: [{ messageId: "NO_FIND_DOM_NODE" }],
    },
    {
      code: /* tsx */ `
        class Hello extends Component {
          componentDidMount() {
            findDOMNode(this).scrollIntoView();
          }
          render() {
            return <div>Hello</div>;
          }
        };
      `,
      errors: [{ messageId: "NO_FIND_DOM_NODE" }],
    },
    {
      code: /* tsx */ `
        class Hello extends Component {
          componentDidMount() {
            this.node = findDOMNode(this);
          }
          render() {
            return <div>Hello</div>;
          }
        };
      `,
      errors: [{ messageId: "NO_FIND_DOM_NODE" }],
    },
  ],
  valid: [
    ...allValid,
  ],
});
