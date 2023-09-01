# eslint-plugin-react-ts

ESLint plugin to lint React TypeScript apps using the @typescript-eslint ecosystem.

> **Warning**
> This plugin is still in early development, and will likely change significantly before reaching a stable version.

## Supported Engines

### Node.js

-   18.x LTS Hydrogen
-   20.x Current

### Bun (planned)

-   1.x

## Installation

```bash
# npm
npm install --save-dev eslint-plugin-react-ts

# or yarn
yarn add --dev eslint-plugin-react-ts

# or pnpm
pnpm add --save-dev eslint-plugin-react-ts
```

## Usage

### Legacy Config (.eslintrc, .eslintrc.json, etc.)

```json
{
    "plugins": ["react-ts"],
    "rules": {
        "react-ts/prefer-shorthand-attribute": "error"
    }
}
```

### Flat Config (eslint.config.js) (requires eslint >= v8.23.0)

```js
import reactTs from "eslint-plugin-react-ts";

export default [
    {
        plugins: {
            reactTs,
        },
        rules: {
            "react-ts/prefer-shorthand-attribute": "error",
        },
    },
];
```

## Todo

-   [x] react-ts/enforce-filename-naming-convention
-   [x] react-ts/enforce-event-handler-naming-convention
-   [ ] react-ts/no-constructed-context-value
-   [ ] react-ts/no-danger-with-children
-   [ ] react-ts/no-deprecated
-   [ ] react-ts/no-leaked-jsx-conditional-rendering
-   [ ] react-ts/no-misused-comment-in-textnode
-   [x] react-ts/no-misused-jsx-extension
-   [ ] react-ts/no-string-refs
-   [ ] react-ts/no-unescaped-entities
-   [ ] react-ts/no-unstable-default-props
-   [ ] react-ts/no-unstable-nested-components
-   [x] react-ts/prefer-shorthand-jsx-boolean
-   [ ] react-ts/require-jsx-key
-   [ ] ...

## Implemented Rules

<!-- begin auto-generated rules list -->

| Name                                                                                                                                                    | Description                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------- |
| [enforce-event-handler-naming-convention](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/src/rules/enforce-event-handler-naming-convention) | enforce event handler naming conventions in JSX                                  |
| [enforce-filename-naming-convention](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/src/rules/enforce-filename-naming-convention)           | enforce naming convention for jsx files                                          |
| [no-misused-jsx-extension](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/src/rules/no-misused-jsx-extension)                               | enforce using `.ts` instead of `.tsx` extension when there is no JSX in the file |
| [prefer-shorthand-jsx-boolean](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/src/rules/prefer-shorthand-jsx-boolean)                       | enforce boolean attributes notation in JSX                                       |

<!-- end auto-generated rules list -->

## Philosophy

The introduction or modification of rules must follow these guidelines:

-   **TypeScript first** - If a behavior can already be enforced by TypeScript built-in checker, it should not be implemented in the plugin.
-   **Formatting independent** - Rules should not be concerned with code style or formatting; leave that to the formatter.
-   **One rule, one purpose** - Each rule should have a single, well-defined purpose that can be described in one sentence, ideally serving as its name, and it's options should be as minimal as possible, preferably none.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## THIRD-PARTY-LICENSE

This project uses code from following third-party projects:

-   eslint-plugin-perfectionist (MIT)
-   eslint-plugin-react (MIT)
-   eslint-plugin-solid (MIT)
-   @tanstack/eslint-plugin-query (MIT)
-   eslint-plugin-filenames-simple (MIT)

Licenses are list in [THIRD-PARTY-LICENSE](THIRD-PARTY-LICENSE)
