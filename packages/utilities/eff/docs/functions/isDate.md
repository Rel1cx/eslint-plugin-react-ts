[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isDate

# Function: isDate()

> **isDate**(`input`): `input is Date`

A guard that succeeds when the input is a `Date`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is Date`

## Example

```ts
import { isDate } from "effect/Predicate"

assert.deepStrictEqual(isDate(new Date()), true)

assert.deepStrictEqual(isDate(null), false)
assert.deepStrictEqual(isDate({}), false)
```

## Since

2.0.0
