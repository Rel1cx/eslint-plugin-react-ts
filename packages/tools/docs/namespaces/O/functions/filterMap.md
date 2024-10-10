[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / filterMap

# Function: filterMap()

Maps over the value of an `Option` and filters out `None`s.

Useful when in addition to filtering you also want to change the type of the `Option`.

## Param

The `Option` to map over.

## Param

A function to apply to the value of the `Option`.

## Example

```ts
import { Option } from "effect"

const evenNumber = (n: number) => n % 2 === 0 ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.filterMap(Option.none(), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(3), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(2), evenNumber), Option.some(2))
```

## Since

2.0.0

## filterMap(f)

> **filterMap**\<`A`, `B`\>(`f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Maps over the value of an `Option` and filters out `None`s.

Useful when in addition to filtering you also want to change the type of the `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

The `Option` to map over.

### Param

A function to apply to the value of the `Option`.

### Example

```ts
import { Option } from "effect"

const evenNumber = (n: number) => n % 2 === 0 ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.filterMap(Option.none(), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(3), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(2), evenNumber), Option.some(2))
```

### Since

2.0.0

## filterMap(self, f)

> **filterMap**\<`A`, `B`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`B`\>

Maps over the value of an `Option` and filters out `None`s.

Useful when in addition to filtering you also want to change the type of the `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **f**

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

The `Option` to map over.

### Param

A function to apply to the value of the `Option`.

### Example

```ts
import { Option } from "effect"

const evenNumber = (n: number) => n % 2 === 0 ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.filterMap(Option.none(), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(3), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(2), evenNumber), Option.some(2))
```

### Since

2.0.0
