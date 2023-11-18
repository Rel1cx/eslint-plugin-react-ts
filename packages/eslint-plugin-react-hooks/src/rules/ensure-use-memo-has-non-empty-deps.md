# react-hooks/ensure-use-memo-has-non-empty-deps

<!-- end auto-generated rule header -->

## Rule category

Correctness.

## What it does

Warns when `useMemo` is called with empty dependencies array.

## Why is this bad?

React Hooks `useMemo` has empty dependencies array like what's in the examples, are unnecessary. The hook can be removed and it's value can be calculated in the component body or hoisted to the outer scope of the component.

## Examples

### ❌ Incorrect

```tsx
const Comp = () => {
  const style = useCallback((theme: MantineTheme) => ({
    input: {
      fontFamily: theme.fontFamilyMonospace,
    },
  }), []);
  return <Button sx={style} />;
};
```

### ✅ Correct

```tsx
const style = (theme: MantineTheme) => ({
  input: {
    fontFamily: theme.fontFamilyMonospace,
  },
});

const Comp = () => {
  return <Button sx={style} />;
};
```
