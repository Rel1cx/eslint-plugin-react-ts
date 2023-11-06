# debug/hooks

<!-- end auto-generated rule header -->

## Rule category

Verbose.

## What it does

Warns when a React Hook is found. Useful for debugging.

> **Warning**
> This rule should only be used for debugging purposes.
> Otherwise, leave it off.

## Why is this good?

This rule is useful for debugging.

## Examples

### ❌ Incorrect

```tsx
import React from "react";

function useToggle() {
  const [value, setValue] = useState(false);

  return [value, () => setValue(x => !x)];
}
```
