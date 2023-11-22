# debug/function-component

<!-- end auto-generated rule header -->

## Rule category

Debug.

## What it does

Reports all function components. Useful for debugging.

> **Warning**
> This rule should only be used for debugging purposes.
> Otherwise, leave it off.

## Examples

```tsx
function Component() {
  return <div />;
}
```

```tsx
function Component() {
  return React.createElement("div");
}
```

```tsx
const Component = () => <div />;
```

```tsx
const Component = () => React.createElement("div");
```

```tsx
import React from "react";

const Component = React.memo(() => <div />);
```

```tsx
import React from "react";

const Component = React.forwardRef(() => <div />);
```
