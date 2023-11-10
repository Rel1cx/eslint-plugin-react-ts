# ESLint React Contributing Guide

Hi! We, the maintainers, are really excited that you are interested in contributing to ESLint React. Before submitting your contribution though, please make sure to take a moment and read through the [Code of Conduct](CODE_OF_CONDUCT.md), as well as the appropriate section for the contribution you intend to make:

- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Guide](#development-guide)

## Issue Reporting Guidelines

- The issue list of this repo is **exclusively** for bug reports and feature requests. Non-conforming issues will be closed immediately.

- Try to search for your issue, it may have already been answered or even fixed in the development branch.

- Check if the issue is reproducible with the latest stable version of ESLint React packages. If you are using a pre-release, please indicate the specific version you are using.

- It is **required** that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

- Use only the minimum amount of code necessary to reproduce the unexpected behavior. A good bug report should isolate specific methods that exhibit unexpected behavior and precisely define how expectations were violated. What did you expect the method or methods to do, and how did the observed behavior differ? The more precisely you isolate the issue, the faster we can investigate.

- Issues with no clear repro steps will not be triaged. If an issue labeled "need repro" receives no further input from the issue author for more than 5 days, it will be closed.

- If your issue is resolved but still open, don’t hesitate to close it. In case you found a solution by yourself, it could be helpful to explain how you fixed it.

- Most importantly, we beg your patience: the team must balance your request against many other responsibilities — fixing other bugs, answering other questions, new features, new documentation, etc. The issue list is not paid support and we cannot make guarantees about how fast your issue can be resolved.

## Pull Request Guidelines

- You have to [sign your commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.

- If adding new feature:

  - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.

- If fixing a bug:
  - If you are resolving a special issue, add `(fix: #xxxx[,#xxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `fix: update entities encoding/decoding (fix #3899)`.
  - Provide detailed description of the bug in the PR, or link to an issue that does.

## Development Guide

**NOTE: ESLint React is undergoing rapid development right now, and the docs match the latest published version of ESLint React. They are horribly out of date when compared with the code in the dev branch.**.

### Packages Overview

- `@eslint-react/tools`: The std library and primitives for @eslint-react's packages.
- `@eslint-react/types`: Type definitions for @eslint-react's packages.
- `@eslint-react/ast`: TSESTree AST primitive utility module.
- `@eslint-react/core`: ESLint utility module for static analysis of React core API and Patterns.
- `@eslint-react/jsx`: ESLint plugin for JSX related rules.
- `@eslint-react/react`: ESLint plugin for React related rules.
- `@eslint-react/naming-convention`: ESLint plugin for naming convention related rules.
- `@eslint-react/debug`: The ESLint plugin for debugging related rules.
- `@eslint-react/eslint-plugin`: The main ESLint plugin of ESLint React. Contains all the rules in this project.

### Developing ESLint Plugin (`@eslint-react/eslint-plugin`)

<!-- TODO: Add more info here -->

### Developing ESLint Core and Related Components (`@eslint-react/tools`, `@eslint-react/types`, `@eslint-react/ast`, `@eslint-react/core`, `@eslint-react/jsx`)

<!-- TODO: Add more info here -->

#### Building the documentation locally

You can build the TypeDoc documentation locally running the following script:

```bash
pnpm run build:docs
```
