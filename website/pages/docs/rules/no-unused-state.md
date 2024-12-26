# no-unused-state

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-unused-state
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-unused-state
```

**Labels**

`Class Components` `State`

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Warns unused class component state.

## Examples

### Failing

```tsx
import React from "react";

class MyComponent extends React.Component {
  // Unused
  state = {
    foo: 1,
  };

  render() {
    return null;
  }
}
```

### Passing

```tsx
import React from "react";

class MyComponent extends React.Component {
  state = {
    foo: 1,
  };

  render() {
    return this.state.foo;
  }
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unused-state.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unused-state.spec.ts)
