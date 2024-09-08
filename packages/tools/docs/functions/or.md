[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / or

# Function: or()

Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.

## Param

A predicate.

## Param

A predicate.

## Example

```ts
import { Predicate, Number } from "effect"

const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))

assert.deepStrictEqual(nonZero(-1), true)
assert.deepStrictEqual(nonZero(0), false)
assert.deepStrictEqual(nonZero(1), true)
```

## Since

2.0.0

## or(that)

> **or**\<`A`, `C`\>(`that`): \<`B`\>(`self`) => [`Refinement`](../interfaces/Refinement.md)\<`A`, `C` \| `B`\>

Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.

### Type Parameters

• **A**

• **C**

### Parameters

• **that**: [`Refinement`](../interfaces/Refinement.md)\<`A`, `C`\>

### Returns

`Function`

#### Type Parameters

• **B**

#### Parameters

• **self**: [`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

#### Returns

[`Refinement`](../interfaces/Refinement.md)\<`A`, `C` \| `B`\>

### Param

A predicate.

### Param

A predicate.

### Example

```ts
import { Predicate, Number } from "effect"

const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))

assert.deepStrictEqual(nonZero(-1), true)
assert.deepStrictEqual(nonZero(0), false)
assert.deepStrictEqual(nonZero(1), true)
```

### Since

2.0.0

## or(self, that)

> **or**\<`A`, `B`, `C`\>(`self`, `that`): [`Refinement`](../interfaces/Refinement.md)\<`A`, `B` \| `C`\>

Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

• **self**: [`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

• **that**: [`Refinement`](../interfaces/Refinement.md)\<`A`, `C`\>

### Returns

[`Refinement`](../interfaces/Refinement.md)\<`A`, `B` \| `C`\>

### Param

A predicate.

### Param

A predicate.

### Example

```ts
import { Predicate, Number } from "effect"

const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))

assert.deepStrictEqual(nonZero(-1), true)
assert.deepStrictEqual(nonZero(0), false)
assert.deepStrictEqual(nonZero(1), true)
```

### Since

2.0.0

## or(that)

> **or**\<`A`\>(`that`): (`self`) => [`Predicate`](../interfaces/Predicate.md)\<`A`\>

Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.

### Type Parameters

• **A**

### Parameters

• **that**: [`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Returns

`Function`

#### Parameters

• **self**: [`Predicate`](../interfaces/Predicate.md)\<`A`\>

#### Returns

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Param

A predicate.

### Param

A predicate.

### Example

```ts
import { Predicate, Number } from "effect"

const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))

assert.deepStrictEqual(nonZero(-1), true)
assert.deepStrictEqual(nonZero(0), false)
assert.deepStrictEqual(nonZero(1), true)
```

### Since

2.0.0

## or(self, that)

> **or**\<`A`\>(`self`, `that`): [`Predicate`](../interfaces/Predicate.md)\<`A`\>

Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.

### Type Parameters

• **A**

### Parameters

• **self**: [`Predicate`](../interfaces/Predicate.md)\<`A`\>

• **that**: [`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Returns

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Param

A predicate.

### Param

A predicate.

### Example

```ts
import { Predicate, Number } from "effect"

const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))

assert.deepStrictEqual(nonZero(-1), true)
assert.deepStrictEqual(nonZero(0), false)
assert.deepStrictEqual(nonZero(1), true)
```

### Since

2.0.0
