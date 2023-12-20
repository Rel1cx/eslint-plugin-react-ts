# naming-convention/filename-extension

## Rule category

Style.

## What it does

Enforces consistent use of the JSX file extension.

## Examples

This rule enforces consistent file extensions for JSX files.

## Rule Options

- `allow`: When to allow a JSX filename extension.
  - `"always"`: (default) allow all file use JSX file extension.
  - `"as-needed"`: allow JSX file extension only if the file contains JSX syntax.
- `extensions`: List of file extensions that should be checked by this rule. By default, it checks `.jsx`, `.tsx` files.

```json
{
  "@eslint-react/naming-convention/filename-extension": ["warn", "as-needed"]
}
```

```json
{
  "@eslint-react/naming-convention/filename-extension": ["warn", { "allow": "as-needed" }]
}
```

```json
{
  "@eslint-react/naming-convention/filename-extension": ["warn", { "allow": "always", "extensions": [".jsx", ".tsx"] }]
}
```
