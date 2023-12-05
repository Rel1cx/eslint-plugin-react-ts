# Rules Overview

## JSX

| Name                                                                                 | Description                                                   |
| :----------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| [jsx/no-array-index-key](jsx-no-array-index-key)                                     | disallow using Array index as key                             |
| [jsx/no-comment-textnodes](jsx-no-comment-textnodes)                                 | disallow comments from being inserted as text nodes           |
| [jsx/no-complicated-conditional-rendering](jsx-no-complicated-conditional-rendering) | disallow complicated conditional rendering                    |
| [jsx/no-duplicate-key](jsx-no-duplicate-key)                                         | disallow duplicate keys in `key` prop when rendering list     |
| [jsx/no-leaked-conditional-rendering](jsx-no-leaked-conditional-rendering)           | disallow problematic leaked values from being rendered        |
| [jsx/no-missing-key](jsx-no-missing-key)                                             | require `key` prop when rendering list                        |
| [jsx/no-spreading-key](jsx-no-spreading-key)                                         | disallow spreading `key` from objects.                        |
| [jsx/no-useless-fragment](jsx-no-useless-fragment)                                   | disallow unnecessary fragments                                |
| [jsx/prefer-shorthand-boolean](jsx-prefer-shorthand-boolean)                         | enforce `boolean` attributes notation in JSX                  |
| [jsx/prefer-shorthand-fragment](jsx-prefer-shorthand-fragment)                       | enforce using fragment syntax instead of `Fragment` component |

## React Hooks

| Name                                                                                                     | Description                                            |
| :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| [react-hooks/ensure-custom-hooks-using-other-hooks](react-hooks-ensure-custom-hooks-using-other-hooks)   | enforce custom hooks using other hooks                 |
| [react-hooks/ensure-use-callback-has-non-empty-deps](react-hooks-ensure-use-callback-has-non-empty-deps) | enforce `useCallback` has non-empty dependencies array |
| [react-hooks/ensure-use-memo-has-non-empty-deps](react-hooks-ensure-use-memo-has-non-empty-deps)         | enforce `useMemo` has non-empty dependencies array     |

## React

| Name                                                                                                 | Description                                                                                |
| :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| [react/no-children-count](react-no-children-count)                                                   | disallow `Children.count`                                                                  |
| [react/no-children-for-each](react-no-children-for-each)                                             | disallow `Children.forEach`                                                                |
| [react/no-children-in-void-dom-elements](react-no-children-in-void-dom-elements)                     | disallow passing `children` to void DOM elements                                           |
| [react/no-children-map](react-no-children-map)                                                       | disallow `Children.map`                                                                    |
| [react/no-children-only](react-no-children-only)                                                     | disallow `Children.only()`                                                                 |
| [react/no-children-prop](react-no-children-prop)                                                     | disallow passing of `children` as props                                                    |
| [react/no-children-to-array](react-no-children-to-array)                                             | disallow `Children.toArray()`                                                              |
| [react/no-class-component](react-no-class-component)                                                 | disallow `class component`                                                                 |
| [react/no-clone-element](react-no-clone-element)                                                     | disallow `cloneElement`                                                                    |
| [react/no-component-will-mount](react-no-component-will-mount)                                       | disallow `componentWillMount`                                                              |
| [react/no-component-will-update](react-no-component-will-update)                                     | disallow `componentWillUpdate`                                                             |
| [react/no-constructed-context-value](react-no-constructed-context-value)                             | disallow passing constructed values to context providers                                   |
| [react/no-create-ref](react-no-create-ref)                                                           | disallow `createRef` in function components                                                |
| [react/no-dangerously-set-innerhtml](react-no-dangerously-set-innerhtml)                             | disallow when a DOM element is using `dangerouslySetInnerHTML`                             |
| [react/no-dangerously-set-innerhtml-with-children](react-no-dangerously-set-innerhtml-with-children) | disallow when a DOM element is using both `children` and `dangerouslySetInnerHTML`         |
| [react/no-find-dom-node](react-no-find-dom-node)                                                     | disallow `findDOMNode`                                                                     |
| [react/no-missing-button-type](react-no-missing-button-type)                                         | enforce that `button` elements have an explicit `type` attribute                           |
| [react/no-missing-iframe-sandbox](react-no-missing-iframe-sandbox)                                   | enforce that `iframe` elements explicitly specify a `sandbox` attribute                    |
| [react/no-namespace](react-no-namespace)                                                             | enforce that namespaces are not used in React elements                                     |
| [react/no-redundant-should-component-update](react-no-redundant-should-component-update)             | disallow usage of `shouldComponentUpdate` in class component extends `React.PureComponent` |
| [react/no-render-return-value](react-no-render-return-value)                                         | disallow usage of the return value of `ReactDOM.render`                                    |
| [react/no-script-url](react-no-script-url)                                                           | disallow `javascript:` URLs as JSX event handler prop's value                              |
| [react/no-string-refs](react-no-string-refs)                                                         | disallow using deprecated string refs                                                      |
| [react/no-unsafe-component-will-mount](react-no-unsafe-component-will-mount)                         | disallow usage of `UNSAFE_componentWillMount` in class components                          |
| [react/no-unsafe-component-will-update](react-no-unsafe-component-will-update)                       | disallow usage of `UNSAFE_componentWillUpdate` in class components                         |
| [react/no-unsafe-iframe-sandbox](react-no-unsafe-iframe-sandbox)                                     | disallow unsafe `iframe` `sandbox` attribute combinations                                  |
| [react/no-unsafe-target-blank](react-no-unsafe-target-blank)                                         | disallow `target="_blank"` without `rel="noreferrer noopener"`                             |
| [react/no-unstable-default-props](react-no-unstable-default-props)                                   | disallow usage of unstable value as default param in function component                    |
| [react/no-unstable-nested-components](react-no-unstable-nested-components)                           | disallow usage of unstable nested components                                               |
| [react/prefer-destructuring-assignment](react-prefer-destructuring-assignment)                       | enforce using destructuring assignment in component props and context                      |

## Naming Convention

| Name                                                                         | Description                                                            |
| :--------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| [naming-convention/component-name](naming-convention-component-name)         | enforce component naming convention to `PascalCase` or `CONSTANT_CASE` |
| [naming-convention/filename](naming-convention-filename)                     | enforce naming convention for JSX file names                           |
| [naming-convention/filename-extension](naming-convention-filename-extension) | enforce naming convention for JSX file extensions                      |

## Debug

| Name                                                 | Description                                              |
| :--------------------------------------------------- | :------------------------------------------------------- |
| [debug/class-component](debug-class-component)       | report all class components, including anonymous ones    |
| [debug/function-component](debug-function-component) | report all function components, including anonymous ones |
| [debug/react-hooks](debug-react-hooks)               | report all react hooks                                   |

