# react/no-unsafe-iframe-sandbox

<!-- end auto-generated rule header -->

## Rule category

Security.

## What it does

Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.

## Why is this bad?

If `sandbox` attribute is not set, the iframe content can have abilities that are not intended to be allowed.

## Examples

This rule reports cases where attribute contains `allow-scripts` and `allow-same-origin` at the same time as this combination allows the embedded document to remove the sandbox attribute and bypass the restrictions.

### ❌ Incorrect

```tsx
import React from "react";

const Component = () => {
  return <iframe src="https://example.com" sandbox="allow-scripts allow-same-origin" />;
};
```

```tsx
import React from "react";

const Component = () => {
  return React.createElement("iframe", {
    src: "https://example.com",
    sandbox: "allow-scripts allow-same-origin",
  });
};
```

### ✅ Correct

```tsx
import React from "react";

const Component = () => {
  return <iframe src="https://example.com" sandbox="allow-popups" />;
};
```

```tsx
import React from "react";

const Component = () => {
  return React.createElement("iframe", {
    src: "https://example.com",
    sandbox: "allow-popups",
  });
};
```

## When not to use

If you don't want to enforce sandbox attribute on iframe elements.
