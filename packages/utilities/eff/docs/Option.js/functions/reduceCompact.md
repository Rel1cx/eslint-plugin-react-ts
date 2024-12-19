[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / reduceCompact

# Function: reduceCompact()

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

## Param

The Iterable of `Option<A>` to be reduced.

## Param

The initial value of the accumulator.

## Param

The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.

## Example

```ts
import { pipe, Option } from "effect"

const iterable = [Option.some(1), Option.none(), Option.some(2), Option.none()]
assert.deepStrictEqual(pipe(iterable, Option.reduceCompact(0, (b, a) => b + a)), 3)
```

## Since

2.0.0

## Call Signature

> **reduceCompact**\<`B`, `A`\>(`b`, `f`): (`self`) => `B`

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

### Type Parameters

• **B**

• **A**

### Parameters

#### b

`B`

The initial value of the accumulator.

#### f

(`b`, `a`) => `B`

The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.

### Returns

`Function`

#### Parameters

##### self

`Iterable`\<[`Option`](../type-aliases/Option.md)\<`A`\>, `any`, `any`\>

#### Returns

`B`

### Param

The Iterable of `Option<A>` to be reduced.

### Param

The initial value of the accumulator.

### Param

The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.

### Examples

```ts
import { pipe, Option } from "effect"

const iterable = [Option.some(1), Option.none(), Option.some(2), Option.none()]
assert.deepStrictEqual(pipe(iterable, Option.reduceCompact(0, (b, a) => b + a)), 3)
```

```ts
import { pipe, Option } from "effect"

const iterable = [Option.some(1), Option.none(), Option.some(2), Option.none()]
assert.deepStrictEqual(pipe(iterable, Option.reduceCompact(0, (b, a) => b + a)), 3)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **reduceCompact**\<`A`, `B`\>(`self`, `b`, `f`): `B`

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

`Iterable`\<[`Option`](../type-aliases/Option.md)\<`A`\>, `any`, `any`\>

The Iterable of `Option<A>` to be reduced.

#### b

`B`

The initial value of the accumulator.

#### f

(`b`, `a`) => `B`

The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.

### Returns

`B`

### Param

The Iterable of `Option<A>` to be reduced.

### Param

The initial value of the accumulator.

### Param

The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.

### Examples

```ts
import { pipe, Option } from "effect"

const iterable = [Option.some(1), Option.none(), Option.some(2), Option.none()]
assert.deepStrictEqual(pipe(iterable, Option.reduceCompact(0, (b, a) => b + a)), 3)
```

```ts
import { pipe, Option } from "effect"

const iterable = [Option.some(1), Option.none(), Option.some(2), Option.none()]
assert.deepStrictEqual(pipe(iterable, Option.reduceCompact(0, (b, a) => b + a)), 3)
```

### Since

2.0.0

### Since

2.0.0
