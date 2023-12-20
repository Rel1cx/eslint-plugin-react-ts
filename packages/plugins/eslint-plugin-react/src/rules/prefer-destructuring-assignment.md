# react/prefer-destructuring-assignment

## Rule category

Style.

## What it does

Enforces the use of destructuring assignment over property assignment.

## Examples

This rule aims to enforce the use of destructuring assignment over property assignment.

### Failing

```tsx
function Component(props) {
  const items = props.items;

  return <div>{items}</div>;
}
```

```tsx
function Component(props) {
  return <div>{props.items}</div>;
}
```

```tsx
function Component(props) {
  const { items } = props;

  return <div>{items}</div>;
}
```

### Passing

```tsx
function Component(props) {
  const { items } = props;

  return <div>{items}</div>;
}
```

```tsx
function Component({ items }) {
  return <div>{items}</div>;
}
```

```tsx
function Component({ items }: { items: string[] }) {
  return <div>{items}</div>;
}
```

```tsx
function Component({ items, ...rest }) {
  return <div {...rest}>{items}</div>;
}
```

## Further Reading

- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [react.dev: passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component#step-2-read-props-inside-the-child-component)
