[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / tap

# Function: tap()

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

## Param

Function to apply to the value of the `Option` if it is `Some`

## Param

The `Option` to apply the function to

## Example

```ts
import { Option } from "effect"

const getInteger = (n: number) => Number.isInteger(n) ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.tap(Option.none(), getInteger), Option.none())
assert.deepStrictEqual(Option.tap(Option.some(1), getInteger), Option.some(1))
assert.deepStrictEqual(Option.tap(Option.some(1.14), getInteger), Option.none())
```

## Since

2.0.0

## tap(f)

> **tap**\<`A`, `X`\>(`f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`A`\>

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

### Type Parameters

• **A**

• **X**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

Function to apply to the value of the `Option` if it is `Some`

### Param

The `Option` to apply the function to

### Example

```ts
import { Option } from "effect"

const getInteger = (n: number) => Number.isInteger(n) ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.tap(Option.none(), getInteger), Option.none())
assert.deepStrictEqual(Option.tap(Option.some(1), getInteger), Option.some(1))
assert.deepStrictEqual(Option.tap(Option.some(1.14), getInteger), Option.none())
```

### Since

2.0.0

## tap(self, f)

> **tap**\<`A`, `X`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`A`\>

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

### Type Parameters

• **A**

• **X**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **f**

### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

Function to apply to the value of the `Option` if it is `Some`

### Param

The `Option` to apply the function to

### Example

```ts
import { Option } from "effect"

const getInteger = (n: number) => Number.isInteger(n) ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.tap(Option.none(), getInteger), Option.none())
assert.deepStrictEqual(Option.tap(Option.some(1), getInteger), Option.some(1))
assert.deepStrictEqual(Option.tap(Option.some(1.14), getInteger), Option.none())
```

### Since

2.0.0
