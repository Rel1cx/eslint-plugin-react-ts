# avoid-shorthand-boolean

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/avoid-shorthand-boolean
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/avoid-shorthand-boolean
```

**Labels**

`Stylistic Issues` `JSX` `Boolean Attributes`

**Features**

`🔍` `🔧`

## What it does

Enforces the use of explicit boolean values for boolean attributes.

A **safe** auto-fix is available for this rule.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return <button disabled />;
  //             ^^^^^^^^
  //             - Avoid using shorthand syntax for 'disabled' attribute.
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return <button disabled={true} />;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-boolean.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-boolean.spec.ts)
