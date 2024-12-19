[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / isOption

# Function: isOption()

> **isOption**(`input`): `input is Option<unknown>`

Tests if a value is a `Option`.

## Parameters

### input

`unknown`

The value to check.

## Returns

`input is Option<unknown>`

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.isOption(Option.some(1)), true)
assert.deepStrictEqual(Option.isOption(Option.none()), true)
assert.deepStrictEqual(Option.isOption({}), false)
```

## Since

2.0.0
