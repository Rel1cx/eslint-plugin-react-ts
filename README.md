<p align="center"><img src="https://eslint-react.rel1cx.io/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint x React</h1>

More than 50 ESLint rules to catch common mistakes and improve your React code. Built (mostly) from scratch.

## Public packages

- [`@eslint-react/eslint-plugin`](./packages/eslint-plugin) - The main ESLint plugin package including all rules and configs in this repository.
- [`@eslint-react/jsx`](./packages/jsx) - TSESTree AST utility module for static analysis of JSX.

## Supported engines

### Node.js

- 18.x LTS Hydrogen
- 20.x Current

### Bun

- 1.0.15 or later

## Installation

This plugin requires `typescript` and `@typescript-eslint/parser` as peer dependencies. Install them if you haven't already.

```sh
# npm
npm install --save-dev typescript @typescript-eslint/parser

# yarn
yarn add --dev typescript @typescript-eslint/parser

# pnpm
pnpm add --save-dev typescript @typescript-eslint/parser

# bun
bun add --dev typescript @typescript-eslint/parser
```

Then install the plugin.

```sh
# npm
npm install --save-dev @eslint-react/eslint-plugin

# yarn
yarn add --dev @eslint-react/eslint-plugin

# pnpm
pnpm add --save-dev @eslint-react/eslint-plugin

# bun
bun add --dev @eslint-react/eslint-plugin
```

## Usage

Add `@eslint-react` to the plugins section of your `.eslintrc.js` configuration file.

```js
module.exports = {
  // ...
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@eslint-react/recommended"],
  plugins: ["@eslint-react"],
  // ...
};
```

[Full Installation Guide ↗](https://eslint-react.rel1cx.io/docs/installation)

## Presets

[Presets ↗](https://eslint-react.rel1cx.io/docs/presets)

## Rules

[Rules ↗](https://eslint-react.rel1cx.io/rules/overview)

## Rules status

### Work in progress

#### JSX rules

- [x] `jsx/no-missing-key`
- [x] `jsx/no-spreading-key`
- [x] `jsx/no-duplicate-key`
- [x] `jsx/no-array-index-key`
- [ ] `jsx/max-depth`
- [x] `jsx/no-useless-fragment`
- [x] `jsx/no-comment-textnodes`
- [x] `jsx/no-complicated-conditional-rendering`
- [x] `jsx/no-leaked-conditional-rendering`
- [x] `jsx/prefer-shorthand-boolean`
- [x] `jsx/prefer-shorthand-fragment`

#### Naming convention rules

- [x] `naming-convention/component-name`
- [x] `naming-convention/filename`
- [x] `naming-convention/filename-extension`
- [ ] `naming-convention/boolean-prop`
- [ ] `naming-convention/handler-prop`
- [ ] `naming-convention/use-state`

#### React rules

- [x] `react/no-children-count`
- [x] `react/no-children-for-each`
- [x] `react/no-children-map`
- [x] `react/no-children-only`
- [x] `react/no-children-to-array`
- [x] `react/no-children-prop`
- [x] `react/no-children-in-void-dom-elements`
- [x] `react/no-find-dom-node`
- [x] `react/no-class-component`
- [x] `react/no-clone-element`
- [x] `react/no-createRef`
- [x] `react/no-namespace`
- [x] `react/no-string-refs`
- [x] `react/no-render-return-value`
- [x] `react/no-dangerously-set-innerhtml`
- [x] `react/no-dangerously-set-innerhtml-with-children`
- [x] `react/no-missing-button-type`
- [x] `react/no-missing-iframe-sandbox`
- [x] `react/no-missing-component-display-name`
- [x] `react/no-script-url`
- [ ] `react/no-direct-mutation-state`
- [x] `react/no-redundant-should-component-update`
- [ ] `react/no-set-state-in-component-did-mount`
- [ ] `react/no-set-state-in-component-did-update`
- [ ] `react/no-set-state-in-component-will-update`
- [x] `react/no-component-will-mount`
- [x] `react/no-component-will-update`
- [x] `react/no-unsafe-component-will-mount`
- [x] `react/no-unsafe-component-will-update`
- [ ] `react/no-unsafe-component-will-receive-props`
- [x] `react/no-unsafe-iframe-sandbox`
- [x] `react/no-unsafe-target-blank`
- [ ] `react/no-unsorted-class-component-methods`
- [x] `react/no-unstable-default-props`
- [x] `react/no-unstable-nested-components`
- [x] `react/no-constructed-context-value`
- [ ] `react/no-unused-class-component-methods`
- [ ] `react/no-unused-state`
- [ ] `react/no-access-ref-current-during-rendering`
- [x] `react/prefer-destructuring-assignment`
- [ ] `react/prefer-readonly-props`
- [ ] `react/ban-components`
- [ ] `react/ban-component-props`
- [ ] `react/ban-html-props`
- [ ] `react/ban-svg-props`

#### React hooks rules

- [ ] `react-hooks/no-access-state-in-setstate`
- [ ] `react-hooks/no-suppressing-exhaustive-deps`
- [x] `react-hooks/ensure-use-memo-has-non-empty-deps` (Proposed by @SukkaW)
- [x] `react-hooks/ensure-use-callback-has-non-empty-deps` (Proposed by @SukkaW)
- [x] `react-hooks/ensure-custom-hooks-using-other-hooks` (Proposed by @SukkaW)

#### Debug rules

- [x] `debug/class-component`
- [x] `debug/function-component`
- [x] `debug/react-hooks`
- [ ] `debug/render-prop`
- [ ] `debug/context`

## Philosophy

- **Do what a linter should do**
- **Focus on code rather than style**
- **Rules are better than options**

## Rule introduction or modification principles

1. **No Auto-fix**. Auto-fix is a great feature, but it's not always safe and reliable. We prefer to not to do auto-fix at all than to implement it in a way that can cause more problems than it solves.
2. **Formatting independent**. Rules should check for correctness, not style. We recommend using style focused tools for formatting (e.g. [dprint](https://dprint.dev/)).
3. **Rules over options [[1]](https://eslint-react.rel1cx.io/docs/rules-over-options)**. Each rule should have a single purpose. Make multiple rules work together to achieve more complex behaviors instead of adding options to a single rule.
4. **Sensible defaults**. Rules should be easy to setup and use with minimal configuration and sensible defaults.

## Contributing

Before you start working on something, it's best to check if there is an existing issue first. It's also a good idea to reach the maintainer and confirm if it makes sense or if someone else is already working on it.

Please make sure to read the [Contributing Guide](./.github/CONTRIBUTING.md) before making a pull request.

Pull requests submitted without prior discussion can also be rejected without prior discussion.

Thank you to everyone contributing to ESLint x React!

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
