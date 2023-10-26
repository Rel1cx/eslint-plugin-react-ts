# react/no-string-refs

💼🚫 This rule is enabled in the following configs: `all-legacy`, 👍 `recommended`, `recommended-legacy`, `recommended-type-checked-legacy`. This rule is _disabled_ in the `off-legacy` config.

<!-- end auto-generated rule header -->

Disallow using deprecated string refs

## Rule Details

This rule disallows using deprecated string refs.

### ❌ Incorrect

```tsx
function Component() {
    return <div ref="example" />;
}
```

### ✅ Correct

```tsx
function Component() {
    const ref = useRef<HTMLDivElement>(null);

    return <div ref={ref} />;
}
```
