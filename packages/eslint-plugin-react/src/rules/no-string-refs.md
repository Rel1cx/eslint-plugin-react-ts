# react/no-string-refs

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
