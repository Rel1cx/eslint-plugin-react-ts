[@eslint-react/tools](../README.md) / Pred

# Namespace: Pred

## Table of contents

### Interfaces

- [Predicate](../interfaces/Pred.Predicate.md)
- [PredicateTypeLambda](../interfaces/Pred.PredicateTypeLambda.md)
- [Refinement](../interfaces/Pred.Refinement.md)

### Functions

- [all](Pred.md#all)
- [and](Pred.md#and)
- [compose](Pred.md#compose)
- [eqv](Pred.md#eqv)
- [every](Pred.md#every)
- [hasProperty](Pred.md#hasproperty)
- [implies](Pred.md#implies)
- [isBigInt](Pred.md#isbigint)
- [isBoolean](Pred.md#isboolean)
- [isDate](Pred.md#isdate)
- [isError](Pred.md#iserror)
- [isFunction](Pred.md#isfunction)
- [isIterable](Pred.md#isiterable)
- [isNever](Pred.md#isnever)
- [isNotNull](Pred.md#isnotnull)
- [isNotNullable](Pred.md#isnotnullable)
- [isNotUndefined](Pred.md#isnotundefined)
- [isNull](Pred.md#isnull)
- [isNullable](Pred.md#isnullable)
- [isNumber](Pred.md#isnumber)
- [isObject](Pred.md#isobject)
- [isPromise](Pred.md#ispromise)
- [isReadonlyRecord](Pred.md#isreadonlyrecord)
- [isRecord](Pred.md#isrecord)
- [isString](Pred.md#isstring)
- [isSymbol](Pred.md#issymbol)
- [isTagged](Pred.md#istagged)
- [isUint8Array](Pred.md#isuint8array)
- [isUndefined](Pred.md#isundefined)
- [isUnknown](Pred.md#isunknown)
- [mapInput](Pred.md#mapinput)
- [nand](Pred.md#nand)
- [nor](Pred.md#nor)
- [not](Pred.md#not)
- [or](Pred.md#or)
- [product](Pred.md#product)
- [productMany](Pred.md#productmany)
- [some](Pred.md#some)
- [struct](Pred.md#struct)
- [tuple](Pred.md#tuple)
- [xor](Pred.md#xor)

## Other

### compose

▸ **compose**\<`A`, `B`, `C`\>(`bc`): (`ab`: [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B`\>) => [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `C`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name | Type                                                         |
| :--- | :----------------------------------------------------------- |
| `bc` | [`Refinement`](../interfaces/Pred.Refinement.md)\<`B`, `C`\> |

#### Returns

`fn`

▸ (`ab`): [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `C`\>

##### Parameters

| Name | Type                                                         |
| :--- | :----------------------------------------------------------- |
| `ab` | [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B`\> |

##### Returns

[`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `C`\>

**`Since`**

2.0.0

▸ **compose**\<`A`, `B`, `C`\>(`ab`, `bc`): [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `C`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name | Type                                                         |
| :--- | :----------------------------------------------------------- |
| `ab` | [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B`\> |
| `bc` | [`Refinement`](../interfaces/Pred.Refinement.md)\<`B`, `C`\> |

#### Returns

[`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `C`\>

**`Since`**

2.0.0

---

### struct

▸ **struct**\<`R`\>(`fields`): [`Predicate`](../interfaces/Pred.Predicate.md)\<\{ readonly [K in string \| number \| symbol]: [R[K]] extends [Predicate\<A\>] ? A : never }\>

#### Type parameters

| Name | Type                                                                                  |
| :--- | :------------------------------------------------------------------------------------ |
| `R`  | extends `Record`\<`string`, [`Predicate`](../interfaces/Pred.Predicate.md)\<`any`\>\> |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `fields` | `R`  |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<\{ readonly [K in string \| number \| symbol]: [R[K]] extends [Predicate\<A\>] ? A : never }\>

**`Since`**

2.0.0

---

### tuple

▸ **tuple**\<`T`\>(`...elements`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`Readonly`\<\{ [I in string \| number \| symbol]: [T[I]] extends [Predicate\<A\>] ? A : never }\>\>

Similar to `Promise.all` but operates on `Predicate`s.

```
[Predicate<A>, Predicate<B>, ...] -> Predicate<[A, B, ...]>
```

#### Type parameters

| Name | Type                                                                       |
| :--- | :------------------------------------------------------------------------- |
| `T`  | extends readonly [`Predicate`](../interfaces/Pred.Predicate.md)\<`any`\>[] |

#### Parameters

| Name          | Type |
| :------------ | :--- |
| `...elements` | `T`  |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`Readonly`\<\{ [I in string \| number \| symbol]: [T[I]] extends [Predicate\<A\>] ? A : never }\>\>

**`Since`**

2.0.0

## combinators

### and

▸ **and**\<`A`, `C`\>(`that`): \<B\>(`self`: [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B`\>) => [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B` & `C`\>

Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `C`  |

#### Parameters

| Name   | Type                                                         | Description  |
| :----- | :----------------------------------------------------------- | :----------- |
| `that` | [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `C`\> | A predicate. |

#### Returns

`fn`

▸ \<`B`\>(`self`): [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B` & `C`\>

##### Type parameters

| Name |
| :--- |
| `B`  |

##### Parameters

| Name   | Type                                                         |
| :----- | :----------------------------------------------------------- |
| `self` | [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B`\> |

##### Returns

[`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B` & `C`\>

**`Example`**

```ts
import * as P from "effect/Predicate";

const minLength = (n: number) => (s: string) => s.length >= n;
const maxLength = (n: number) => (s: string) => s.length <= n;

const length = (n: number) => P.and(minLength(n), maxLength(n));

assert.deepStrictEqual(length(2)("aa"), true);
assert.deepStrictEqual(length(2)("a"), false);
assert.deepStrictEqual(length(2)("aaa"), false);
```

**`Since`**

2.0.0

▸ **and**\<`A`, `B`, `C`\>(`self`, `that`): [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B` & `C`\>

Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name   | Type                                                         | Description  |
| :----- | :----------------------------------------------------------- | :----------- |
| `self` | [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B`\> | A predicate. |
| `that` | [`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `C`\> | A predicate. |

#### Returns

[`Refinement`](../interfaces/Pred.Refinement.md)\<`A`, `B` & `C`\>

**`Example`**

```ts
import * as P from "effect/Predicate";

const minLength = (n: number) => (s: string) => s.length >= n;
const maxLength = (n: number) => (s: string) => s.length <= n;

const length = (n: number) => P.and(minLength(n), maxLength(n));

assert.deepStrictEqual(length(2)("aa"), true);
assert.deepStrictEqual(length(2)("a"), false);
assert.deepStrictEqual(length(2)("aaa"), false);
```

**`Since`**

2.0.0

▸ **and**\<`A`\>(`that`): (`self`: [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>) => [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  | Description  |
| :----- | :---------------------------------------------------- | :----------- |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> | A predicate. |

#### Returns

`fn`

▸ (`self`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

##### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

##### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Example`**

```ts
import * as P from "effect/Predicate";

const minLength = (n: number) => (s: string) => s.length >= n;
const maxLength = (n: number) => (s: string) => s.length <= n;

const length = (n: number) => P.and(minLength(n), maxLength(n));

assert.deepStrictEqual(length(2)("aa"), true);
assert.deepStrictEqual(length(2)("a"), false);
assert.deepStrictEqual(length(2)("aaa"), false);
```

**`Since`**

2.0.0

▸ **and**\<`A`\>(`self`, `that`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  | Description  |
| :----- | :---------------------------------------------------- | :----------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> | A predicate. |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> | A predicate. |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Example`**

```ts
import * as P from "effect/Predicate";

const minLength = (n: number) => (s: string) => s.length >= n;
const maxLength = (n: number) => (s: string) => s.length <= n;

const length = (n: number) => P.and(minLength(n), maxLength(n));

assert.deepStrictEqual(length(2)("aa"), true);
assert.deepStrictEqual(length(2)("a"), false);
assert.deepStrictEqual(length(2)("aaa"), false);
```

**`Since`**

2.0.0

---

### eqv

▸ **eqv**\<`A`\>(`that`): (`self`: [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>) => [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

##### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

##### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

▸ **eqv**\<`A`\>(`self`, `that`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

---

### implies

▸ **implies**\<`A`\>(`that`): (`self`: [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>) => [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

##### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

##### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

▸ **implies**\<`A`\>(`self`, `that`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

---

### mapInput

▸ **mapInput**\<`B`, `A`\>(`f`): (`self`: [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>) => [`Predicate`](../interfaces/Pred.Predicate.md)\<`B`\>

Given a `Predicate<A>` returns a `Predicate<B>`

#### Type parameters

| Name |
| :--- |
| `B`  |
| `A`  |

#### Parameters

| Name | Type              | Description                         |
| :--- | :---------------- | :---------------------------------- |
| `f`  | (`b`: `B`) => `A` | a function to transform `B` to `A`. |

#### Returns

`fn`

▸ (`self`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`B`\>

##### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

##### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`B`\>

**`Example`**

```ts
import * as P from "effect/Predicate";
import * as N from "effect/Number";

const minLength3 = P.mapInput(N.greaterThan(2), (s: string) => s.length);

assert.deepStrictEqual(minLength3("a"), false);
assert.deepStrictEqual(minLength3("aa"), false);
assert.deepStrictEqual(minLength3("aaa"), true);
assert.deepStrictEqual(minLength3("aaaa"), true);
```

**`Since`**

2.0.0

▸ **mapInput**\<`A`, `B`\>(`self`, `f`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`B`\>

Given a `Predicate<A>` returns a `Predicate<B>`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                  | Description                                             |
| :----- | :---------------------------------------------------- | :------------------------------------------------------ |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> | the `Predicate<A>` to be transformed to `Predicate<B>`. |
| `f`    | (`b`: `B`) => `A`                                     | a function to transform `B` to `A`.                     |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`B`\>

**`Example`**

```ts
import * as P from "effect/Predicate";
import * as N from "effect/Number";

const minLength3 = P.mapInput(N.greaterThan(2), (s: string) => s.length);

assert.deepStrictEqual(minLength3("a"), false);
assert.deepStrictEqual(minLength3("aa"), false);
assert.deepStrictEqual(minLength3("aaa"), true);
assert.deepStrictEqual(minLength3("aaaa"), true);
```

**`Since`**

2.0.0

---

### nand

▸ **nand**\<`A`\>(`that`): (`self`: [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>) => [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

##### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

##### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

▸ **nand**\<`A`\>(`self`, `that`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

---

### nor

▸ **nor**\<`A`\>(`that`): (`self`: [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>) => [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

##### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

##### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

▸ **nor**\<`A`\>(`self`, `that`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

---

### not

▸ **not**\<`A`\>(`self`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

Negates the result of a given predicate.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  | Description  |
| :----- | :---------------------------------------------------- | :----------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> | A predicate. |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Example`**

```ts
import * as P from "effect/Predicate";
import * as N from "effect/Number";

const isPositive = P.not(N.lessThan(0));

assert.deepStrictEqual(isPositive(-1), false);
assert.deepStrictEqual(isPositive(0), true);
assert.deepStrictEqual(isPositive(1), true);
```

**`Since`**

2.0.0

---

### or

▸ **or**\<`A`\>(`that`): (`self`: [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>) => [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  | Description  |
| :----- | :---------------------------------------------------- | :----------- |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> | A predicate. |

#### Returns

`fn`

▸ (`self`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

##### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

##### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Example`**

```ts
import * as P from "effect/Predicate";
import * as N from "effect/Number";

const nonZero = P.or(N.lessThan(0), N.greaterThan(0));

assert.deepStrictEqual(nonZero(-1), true);
assert.deepStrictEqual(nonZero(0), false);
assert.deepStrictEqual(nonZero(1), true);
```

**`Since`**

2.0.0

▸ **or**\<`A`\>(`self`, `that`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  | Description  |
| :----- | :---------------------------------------------------- | :----------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> | A predicate. |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> | A predicate. |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Example`**

```ts
import * as P from "effect/Predicate";
import * as N from "effect/Number";

const nonZero = P.or(N.lessThan(0), N.greaterThan(0));

assert.deepStrictEqual(nonZero(-1), true);
assert.deepStrictEqual(nonZero(0), false);
assert.deepStrictEqual(nonZero(1), true);
```

**`Since`**

2.0.0

---

### xor

▸ **xor**\<`A`\>(`that`): (`self`: [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>) => [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

##### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

##### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

▸ **xor**\<`A`\>(`self`, `that`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

## combining

### all

▸ **all**\<`A`\>(`collection`): [`Predicate`](../interfaces/Pred.Predicate.md)\<readonly `A`[]\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name         | Type                                                                |
| :----------- | :------------------------------------------------------------------ |
| `collection` | `Iterable`\<[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<readonly `A`[]\>

**`Since`**

2.0.0

---

### product

▸ **product**\<`A`, `B`\>(`self`, `that`): [`Predicate`](../interfaces/Pred.Predicate.md)\<readonly [`A`, `B`]\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\> |
| `that` | [`Predicate`](../interfaces/Pred.Predicate.md)\<`B`\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<readonly [`A`, `B`]\>

**`Since`**

2.0.0

---

### productMany

▸ **productMany**\<`A`\>(`self`, `collection`): [`Predicate`](../interfaces/Pred.Predicate.md)\<readonly [`A`, `A`]\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name         | Type                                                                |
| :----------- | :------------------------------------------------------------------ |
| `self`       | [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>               |
| `collection` | `Iterable`\<[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<readonly [`A`, `A`]\>

**`Since`**

2.0.0

## elements

### every

▸ **every**\<`A`\>(`collection`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name         | Type                                                                |
| :----------- | :------------------------------------------------------------------ |
| `collection` | `Iterable`\<[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

---

### some

▸ **some**\<`A`\>(`collection`): [`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name         | Type                                                                |
| :----------- | :------------------------------------------------------------------ |
| `collection` | `Iterable`\<[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>\> |

#### Returns

[`Predicate`](../interfaces/Pred.Predicate.md)\<`A`\>

**`Since`**

2.0.0

## guards

### hasProperty

▸ **hasProperty**\<`P`\>(`property`): (`self`: `unknown`) => self is \{ [K in PropertyKey]: unknown }

Checks whether a value is an `object` containing a specified property key.

#### Type parameters

| Name | Type                  |
| :--- | :-------------------- |
| `P`  | extends `PropertyKey` |

#### Parameters

| Name       | Type | Description                           |
| :--------- | :--- | :------------------------------------ |
| `property` | `P`  | The field to check within the object. |

#### Returns

`fn`

▸ (`self`): self is \{ [K in PropertyKey]: unknown }

##### Parameters

| Name   | Type      |
| :----- | :-------- |
| `self` | `unknown` |

##### Returns

self is \{ [K in PropertyKey]: unknown }

**`Since`**

2.0.0

▸ **hasProperty**\<`P`\>(`self`, `property`): self is \{ [K in PropertyKey]: unknown }

Checks whether a value is an `object` containing a specified property key.

#### Type parameters

| Name | Type                  |
| :--- | :-------------------- |
| `P`  | extends `PropertyKey` |

#### Parameters

| Name       | Type      | Description                           |
| :--------- | :-------- | :------------------------------------ |
| `self`     | `unknown` | The value to examine.                 |
| `property` | `P`       | The field to check within the object. |

#### Returns

self is \{ [K in PropertyKey]: unknown }

**`Since`**

2.0.0

---

### isBigInt

▸ **isBigInt**(`input`): input is bigint

Tests if a value is a `bigint`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is bigint

**`Example`**

```ts
import { isBigInt } from "effect/Predicate";

assert.deepStrictEqual(isBigInt(1n), true);

assert.deepStrictEqual(isBigInt(1), false);
```

**`Since`**

2.0.0

---

### isBoolean

▸ **isBoolean**(`input`): input is boolean

Tests if a value is a `boolean`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is boolean

**`Example`**

```ts
import { isBoolean } from "effect/Predicate";

assert.deepStrictEqual(isBoolean(true), true);

assert.deepStrictEqual(isBoolean("true"), false);
```

**`Since`**

2.0.0

---

### isDate

▸ **isDate**(`input`): input is Date

A guard that succeeds when the input is a `Date`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is Date

**`Example`**

```ts
import { isDate } from "effect/Predicate";

assert.deepStrictEqual(isDate(new Date()), true);

assert.deepStrictEqual(isDate(null), false);
assert.deepStrictEqual(isDate({}), false);
```

**`Since`**

2.0.0

---

### isError

▸ **isError**(`input`): input is Error

A guard that succeeds when the input is an `Error`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is Error

**`Example`**

```ts
import { isError } from "effect/Predicate";

assert.deepStrictEqual(isError(new Error()), true);

assert.deepStrictEqual(isError(null), false);
assert.deepStrictEqual(isError({}), false);
```

**`Since`**

2.0.0

---

### isFunction

▸ **isFunction**(`input`): input is Function

Tests if a value is a `function`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is Function

**`Example`**

```ts
import { isFunction } from "effect/Predicate";

assert.deepStrictEqual(isFunction(isFunction), true);

assert.deepStrictEqual(isFunction("function"), false);
```

**`Since`**

2.0.0

---

### isIterable

▸ **isIterable**(`input`): input is Iterable\<unknown\>

A guard that succeeds when the input is an `Iterable`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is Iterable\<unknown\>

**`Example`**

```ts
import { isIterable } from "effect/Predicate";

assert.deepStrictEqual(isIterable([]), true);
assert.deepStrictEqual(isIterable(new Set()), true);

assert.deepStrictEqual(isIterable(null), false);
assert.deepStrictEqual(isIterable({}), false);
```

**`Since`**

2.0.0

---

### isNever

▸ **isNever**(`input`): input is never

A guard that always fails.

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `input` | `unknown` |

#### Returns

input is never

**`Example`**

```ts
import { isNever } from "effect/Predicate";

assert.deepStrictEqual(isNever(null), false);
assert.deepStrictEqual(isNever(undefined), false);
assert.deepStrictEqual(isNever({}), false);
assert.deepStrictEqual(isNever([]), false);
```

**`Since`**

2.0.0

---

### isNotNull

▸ **isNotNull**\<`A`\>(`input`): input is Exclude\<A, null\>

Tests if a value is not `undefined`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type | Description        |
| :------ | :--- | :----------------- |
| `input` | `A`  | The value to test. |

#### Returns

input is Exclude\<A, null\>

**`Example`**

```ts
import { isNotNull } from "effect/Predicate";

assert.deepStrictEqual(isNotNull(undefined), true);
assert.deepStrictEqual(isNotNull("null"), true);

assert.deepStrictEqual(isNotNull(null), false);
```

**`Since`**

2.0.0

---

### isNotNullable

▸ **isNotNullable**\<`A`\>(`input`): input is NonNullable\<A\>

A guard that succeeds when the input is not `null` or `undefined`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type | Description        |
| :------ | :--- | :----------------- |
| `input` | `A`  | The value to test. |

#### Returns

input is NonNullable\<A\>

**`Example`**

```ts
import { isNotNullable } from "effect/Predicate";

assert.deepStrictEqual(isNotNullable({}), true);
assert.deepStrictEqual(isNotNullable([]), true);

assert.deepStrictEqual(isNotNullable(null), false);
assert.deepStrictEqual(isNotNullable(undefined), false);
```

**`Since`**

2.0.0

---

### isNotUndefined

▸ **isNotUndefined**\<`A`\>(`input`): input is Exclude\<A, undefined\>

Tests if a value is not `undefined`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type | Description        |
| :------ | :--- | :----------------- |
| `input` | `A`  | The value to test. |

#### Returns

input is Exclude\<A, undefined\>

**`Example`**

```ts
import { isNotUndefined } from "effect/Predicate";

assert.deepStrictEqual(isNotUndefined(null), true);
assert.deepStrictEqual(isNotUndefined("undefined"), true);

assert.deepStrictEqual(isNotUndefined(undefined), false);
```

**`Since`**

2.0.0

---

### isNull

▸ **isNull**(`input`): input is null

Tests if a value is `undefined`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is null

**`Example`**

```ts
import { isNull } from "effect/Predicate";

assert.deepStrictEqual(isNull(null), true);

assert.deepStrictEqual(isNull(undefined), false);
assert.deepStrictEqual(isNull("null"), false);
```

**`Since`**

2.0.0

---

### isNullable

▸ **isNullable**\<`A`\>(`input`): input is Extract\<A, undefined \| null\>

A guard that succeeds when the input is `null` or `undefined`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type | Description        |
| :------ | :--- | :----------------- |
| `input` | `A`  | The value to test. |

#### Returns

input is Extract\<A, undefined \| null\>

**`Example`**

```ts
import { isNullable } from "effect/Predicate";

assert.deepStrictEqual(isNullable(null), true);
assert.deepStrictEqual(isNullable(undefined), true);

assert.deepStrictEqual(isNullable({}), false);
assert.deepStrictEqual(isNullable([]), false);
```

**`Since`**

2.0.0

---

### isNumber

▸ **isNumber**(`input`): input is number

Tests if a value is a `number`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is number

**`Example`**

```ts
import { isNumber } from "effect/Predicate";

assert.deepStrictEqual(isNumber(2), true);

assert.deepStrictEqual(isNumber("2"), false);
```

**`Since`**

2.0.0

---

### isObject

▸ **isObject**(`input`): input is object

Tests if a value is an `object`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is object

**`Example`**

```ts
import { isObject } from "effect/Predicate";

assert.deepStrictEqual(isObject({}), true);
assert.deepStrictEqual(isObject([]), true);

assert.deepStrictEqual(isObject(null), false);
assert.deepStrictEqual(isObject(undefined), false);
```

**`Since`**

2.0.0

---

### isPromise

▸ **isPromise**(`input`): input is Promise\<unknown\>

A guard that succeeds when the input is a Promise.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is Promise\<unknown\>

**`Example`**

```ts
import { isPromise } from "effect/Predicate";

assert.deepStrictEqual(isPromise({}), false);
assert.deepStrictEqual(isPromise(Promise.resolve("hello")), true);
```

**`Since`**

2.0.0

---

### isReadonlyRecord

▸ **isReadonlyRecord**(`input`): input is Object

A guard that succeeds when the input is a readonly record.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is Object

**`Example`**

```ts
import { isReadonlyRecord } from "effect/Predicate";

assert.deepStrictEqual(isReadonlyRecord({}), true);
assert.deepStrictEqual(isReadonlyRecord({ a: 1 }), true);

assert.deepStrictEqual(isReadonlyRecord([]), false);
assert.deepStrictEqual(isReadonlyRecord([1, 2, 3]), false);
assert.deepStrictEqual(isReadonlyRecord(null), false);
assert.deepStrictEqual(isReadonlyRecord(undefined), false);
```

**`Since`**

2.0.0

---

### isRecord

▸ **isRecord**(`input`): input is Object

A guard that succeeds when the input is a record.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is Object

**`Example`**

```ts
import { isRecord } from "effect/Predicate";

assert.deepStrictEqual(isRecord({}), true);
assert.deepStrictEqual(isRecord({ a: 1 }), true);

assert.deepStrictEqual(isRecord([]), false);
assert.deepStrictEqual(isRecord([1, 2, 3]), false);
assert.deepStrictEqual(isRecord(null), false);
assert.deepStrictEqual(isRecord(undefined), false);
assert.deepStrictEqual(isRecord(() => null), false);
```

**`Since`**

2.0.0

---

### isString

▸ **isString**(`input`): input is string

Tests if a value is a `string`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is string

**`Example`**

```ts
import { isString } from "effect/Predicate";

assert.deepStrictEqual(isString("a"), true);

assert.deepStrictEqual(isString(1), false);
```

**`Since`**

2.0.0

---

### isSymbol

▸ **isSymbol**(`input`): input is symbol

Tests if a value is a `symbol`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is symbol

**`Example`**

```ts
import { isSymbol } from "effect/Predicate";

assert.deepStrictEqual(isSymbol(Symbol.for("a")), true);

assert.deepStrictEqual(isSymbol("a"), false);
```

**`Since`**

2.0.0

---

### isTagged

▸ **isTagged**\<`K`\>(`tag`): (`self`: `unknown`) => self is Object

Tests if a value is an `object` with a property `_tag` that matches the given tag.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

#### Parameters

| Name  | Type | Description          |
| :---- | :--- | :------------------- |
| `tag` | `K`  | The tag to test for. |

#### Returns

`fn`

▸ (`self`): self is Object

##### Parameters

| Name   | Type      |
| :----- | :-------- |
| `self` | `unknown` |

##### Returns

self is Object

**`Example`**

```ts
import { isTagged } from "effect/Predicate";

assert.deepStrictEqual(isTagged(1, "a"), false);
assert.deepStrictEqual(isTagged(null, "a"), false);
assert.deepStrictEqual(isTagged({}, "a"), false);
assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false);
assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true);
assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true);
```

**`Since`**

2.0.0

▸ **isTagged**\<`K`\>(`self`, `tag`): self is Object

Tests if a value is an `object` with a property `_tag` that matches the given tag.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

#### Parameters

| Name   | Type      | Description          |
| :----- | :-------- | :------------------- |
| `self` | `unknown` | -                    |
| `tag`  | `K`       | The tag to test for. |

#### Returns

self is Object

**`Example`**

```ts
import { isTagged } from "effect/Predicate";

assert.deepStrictEqual(isTagged(1, "a"), false);
assert.deepStrictEqual(isTagged(null, "a"), false);
assert.deepStrictEqual(isTagged({}, "a"), false);
assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false);
assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true);
assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true);
```

**`Since`**

2.0.0

---

### isUint8Array

▸ **isUint8Array**(`input`): input is Uint8Array

A guard that succeeds when the input is a `Uint8Array`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is Uint8Array

**`Example`**

```ts
import { isUint8Array } from "effect/Predicate";

assert.deepStrictEqual(isUint8Array(new Uint8Array()), true);

assert.deepStrictEqual(isUint8Array(null), false);
assert.deepStrictEqual(isUint8Array({}), false);
```

**`Since`**

2.0.0

---

### isUndefined

▸ **isUndefined**(`input`): input is undefined

Tests if a value is `undefined`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is undefined

**`Example`**

```ts
import { isUndefined } from "effect/Predicate";

assert.deepStrictEqual(isUndefined(undefined), true);

assert.deepStrictEqual(isUndefined(null), false);
assert.deepStrictEqual(isUndefined("undefined"), false);
```

**`Since`**

2.0.0

---

### isUnknown

▸ **isUnknown**(`input`): input is unknown

A guard that always succeeds.

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `input` | `unknown` |

#### Returns

input is unknown

**`Example`**

```ts
import { isUnknown } from "effect/Predicate";

assert.deepStrictEqual(isUnknown(null), true);
assert.deepStrictEqual(isUnknown(undefined), true);

assert.deepStrictEqual(isUnknown({}), true);
assert.deepStrictEqual(isUnknown([]), true);
```

**`Since`**

2.0.0
