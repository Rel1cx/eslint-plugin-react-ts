import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-mixing-controlled-and-uncontrolled";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: '<input type="checkbox" checked defaultChecked />',
      errors: [
        { messageId: "NO_MIXING_CONTROLLED_AND_UNCONTROLLED" },
      ],
    },
    {
      code: '<input type="checkbox" value={1} defaultValue={1} />',
      errors: [
        { messageId: "NO_MIXING_CONTROLLED_AND_UNCONTROLLED" },
      ],
    },
    {
      code: 'React.createElement("input", { checked: true, defaultChecked: true })',
      errors: [
        { messageId: "NO_MIXING_CONTROLLED_AND_UNCONTROLLED" },
      ],
    },
    {
      code: 'React.createElement("input", { value: 1, defaultValue: 1 })',
      errors: [
        { messageId: "NO_MIXING_CONTROLLED_AND_UNCONTROLLED" },
      ],
    },
  ],
  valid: [
    ...allValid,
    '<input type="checkbox" />',
    '<input type="checkbox" readOnly />',
    '<input type="checkbox" checked onChange={noop} />',
    '<input type="checkbox" checked={true} onChange={noop} />',
    '<input type="checkbox" checked={false} onChange={noop} />',
    '<input type="checkbox" defaultChecked />',
    "React.createElement('input')",
    "React.createElement('input', { checked: true })",
    "React.createElement('input', { checked: false })",
    "React.createElement('input', { defaultChecked: true })",
    "<span/>",
  ],
});
