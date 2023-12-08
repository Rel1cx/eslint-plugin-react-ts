<p align="center"><img src="https://eslint-react.rel1cx.io/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint x React</h1>

More than 50 ESLint rules to catch common mistakes and improve your React code. Built (mostly) from scratch.

## Supported engines

### Node.js

- 18.x LTS Hydrogen
- 20.x Current

### Bun

- 1.0.15 or later

### Install

```sh
# npm
npm install --save-dev @eslint-react/eslint-plugin
```

### Setup

Add `@eslint-react` to the plugins section of your `.eslintrc.js` configuration file.

```js
module.exports = {
  // ...
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@eslint-react/recommended-legacy"],
  plugins: ["@eslint-react"],
  // ...
};
```

### Linting with type information

> [!NOTE]\
> Rules that require type information are not enabled by default.
>
> To enable them, you need to set the `project` option in `parserOptions` to the path of your `tsconfig.json` file.
>
> Then replace `plugin:@eslint-react/recommended-legacy` with `plugin:@eslint-react/recommended-type-checked-legacy`.

```js
module.exports = {
  // ...
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // <-- Point to your project's "tsconfig.json" or create a new one.
  },
  extends: ["plugin:@eslint-react/recommended-type-checked-legacy"],
  plugins: ["@eslint-react"],
  // ...
};
```

[Full Installation Guide ↗](https://eslint-react.rel1cx.io/docs/installation)

## Presets

### LegacyConfig presets

> [!IMPORTANT]\
> These presets are for ESLint `LegacyConfig` (`.eslintrc.*`) only

- **recommended-legacy** (`plugin:@eslint-react/recommended-legacy`)\
  Enforce recommended rules designed to catch common mistakes and prevent potential bugs.
- **recommended-type-checked-legacy** (`plugin:@eslint-react/recommended-type-checked-legacy`)\
  Same as recommended-legacy but with additional rules that require type information.
- **debug-legacy** (`plugin:@eslint-react/debug-legacy`)\
  Enable a series of rules that are useful for debugging purposes only.\
  (Not recommended unless you know what you are doing)
- **all-legacy** (`plugin:@eslint-react/all-legacy`)\
  Enable all rules in this plugin except for debug rules.
- **off-legacy** (`plugin:@eslint-react/off-legacy`)\
  Disable all rules in this plugin except for debug rules.

### FlatConfig presets

> [!IMPORTANT]\
> These presets are for ESLint `FlatConfig` (`eslint.config.js`) only

- **recommended**\
  Enforce recommended rules designed to catch common mistakes and prevent potential bugs.
- **recommended-type-checked**\
  Same as recommended but with additional rules that require type information.
- **debug**\
  Enable a series of rules that are useful for debugging purposes only.\
  (Not recommended unless you know what you are doing)
- **all**\
  Enable all rules in this plugin except for debug rules.
- **off**\
  Disable all rules in this plugin except for debug rules.

[Full Presets List↗](https://eslint-react.rel1cx.io/docs/presets)

## Rules

[Rules Overview ↗](https://eslint-react.rel1cx.io/rules/overview)

## Philosophy

- **Do what a linter should do**
- **Focus on code rather than style**
- **Rules are better than options**

## Rule introduction or modification principles

1. **No Auto-fix**. Auto-fix is a great feature, but it's not always safe and reliable. We prefer to not to do auto-fix at all than to implement it in a way that can cause more problems than it solves.
2. **Formatting independent**. Rules should check for correctness, not style. We recommend using style focused tools for formatting (e.g. [dprint](https://dprint.dev/)).
3. **Rules over options [[1]](https://eslint-react.rel1cx.io/docs/rules-over-options)**. Each rule should have a single purpose. Make multiple rules work together to achieve more complex behaviors instead of adding options to a single rule.
4. **Sensible defaults**. Rules should be easy to setup and use with minimal configuration and sensible defaults.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid)
- [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple)
- [@tanstack/eslint-plugin-query](https://github.com/TanStack/query/tree/main/packages/eslint-plugin-query)
- [rome/tools](https://github.com/rome/tools)
- [rust-clippy](https://github.com/rust-lang/rust-clippy)

## Prior art

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
