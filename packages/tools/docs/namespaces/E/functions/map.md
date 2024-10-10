[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / map

# Function: map()

Maps the `Right` side of an `Either` value to a new `Either` value.

## Param

An `Either` to map

## Param

The function to map over the value of the `Either`

## Since

2.0.0

## map(f)

> **map**\<`R`, `R2`\>(`f`): \<`L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

Maps the `Right` side of an `Either` value to a new `Either` value.

### Type Parameters

• **R**

• **R2**

### Parameters

• **f**

### Returns

`Function`

#### Type Parameters

• **L**

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

### Param

An `Either` to map

### Param

The function to map over the value of the `Either`

### Since

2.0.0

## map(self, f)

> **map**\<`R`, `L`, `R2`\>(`self`, `f`): [`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

Maps the `Right` side of an `Either` value to a new `Either` value.

### Type Parameters

• **R**

• **L**

• **R2**

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

• **f**

### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

### Param

An `Either` to map

### Param

The function to map over the value of the `Either`

### Since

2.0.0
