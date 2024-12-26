[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Either.js](../README.md) / getOrUndefined

# Function: getOrUndefined()

> **getOrUndefined**\<`R`, `L`\>(`self`): `undefined` \| `R`

## Type Parameters

• **R**

• **L**

## Parameters

### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

## Returns

`undefined` \| `R`

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.getOrUndefined(Either.right(1)), 1)
assert.deepStrictEqual(Either.getOrUndefined(Either.left("a")), undefined)
```

## Since

2.0.0
