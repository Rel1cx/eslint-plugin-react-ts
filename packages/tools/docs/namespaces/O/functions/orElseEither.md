[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / orElseEither

# Function: orElseEither()

Similar to `orElse`, but instead of returning a simple union, it returns an `Either` object,
which contains information about which of the two `Option`s has been chosen.

This is useful when it's important to know whether the value was retrieved from the first `Option` or the second option.

## Param

The first `Option` to be checked.

## Param

The second `Option` to be considered if the first `Option` is `None`.

## Since

2.0.0

## orElseEither(that)

> **orElseEither**\<`B`\>(`that`): \<`A`\>(`self`) => [`Option`](../type-aliases/Option.md)\<[`Either`](../../E/type-aliases/Either.md)\<`B`, `A`\>\>

Similar to `orElse`, but instead of returning a simple union, it returns an `Either` object,
which contains information about which of the two `Option`s has been chosen.

This is useful when it's important to know whether the value was retrieved from the first `Option` or the second option.

### Type Parameters

• **B**

### Parameters

• **that**: [`LazyArg`](../../F/interfaces/LazyArg.md)\<[`Option`](../type-aliases/Option.md)\<`B`\>\>

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<[`Either`](../../E/type-aliases/Either.md)\<`B`, `A`\>\>

### Param

The first `Option` to be checked.

### Param

The second `Option` to be considered if the first `Option` is `None`.

### Since

2.0.0

## orElseEither(self, that)

> **orElseEither**\<`A`, `B`\>(`self`, `that`): [`Option`](../type-aliases/Option.md)\<[`Either`](../../E/type-aliases/Either.md)\<`B`, `A`\>\>

Similar to `orElse`, but instead of returning a simple union, it returns an `Either` object,
which contains information about which of the two `Option`s has been chosen.

This is useful when it's important to know whether the value was retrieved from the first `Option` or the second option.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **that**: [`LazyArg`](../../F/interfaces/LazyArg.md)\<[`Option`](../type-aliases/Option.md)\<`B`\>\>

### Returns

[`Option`](../type-aliases/Option.md)\<[`Either`](../../E/type-aliases/Either.md)\<`B`, `A`\>\>

### Param

The first `Option` to be checked.

### Param

The second `Option` to be considered if the first `Option` is `None`.

### Since

2.0.0
