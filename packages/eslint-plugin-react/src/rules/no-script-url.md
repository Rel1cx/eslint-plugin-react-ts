# react/no-script-url

<!-- end auto-generated rule header -->

## Rule category

Security.

## What it does

Prevents usage of `javascript:` URLs as the value of component props.

## Why is this bad?

Using `javascript:` URLs is harmful to code maintainability, readability, and application security.

## Examples

### ❌ Incorrect

```tsx
<a href="javascript:"></a>
<a href="javascript:void(0)"></a>
<a href="j\n\n\na\rv\tascript:"></a>
```

### ✅ Correct

```tsx
<Foo href="javascript:"></Foo>
<a href={"javascript:"}></a>
<a href="https://example.com"></a>
```
