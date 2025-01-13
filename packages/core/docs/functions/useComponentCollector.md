[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / useComponentCollector

# Function: useComponentCollector()

> **useComponentCollector**(`context`, `hint`, `options`): `object`

## Parameters

### context

`Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>

### hint

`bigint` = `DEFAULT_COMPONENT_HINT`

### options

[`ComponentCollectorOptions`](../interfaces/ComponentCollectorOptions.md) = `DEFAULT_COMPONENT_COLLECT_OPTIONS`

## Returns

`object`

### ctx

> **ctx**: `object`

#### ctx.getCurrentEntry()

> **getCurrentEntry**: () => `undefined` \| \{ `hookCalls`: `CallExpression`[]; `isComponent`: `boolean`; `key`: `string`; `node`: `TSESTreeFunction`; \}

##### Returns

`undefined` \| \{ `hookCalls`: `CallExpression`[]; `isComponent`: `boolean`; `key`: `string`; `node`: `TSESTreeFunction`; \}

#### ctx.getAllComponents()

##### Parameters

###### node

`Program`

##### Returns

`Map`\<`string`, [`ERFunctionComponent`](../interfaces/ERFunctionComponent.md)\>

#### ctx.getCurrentEntries()

##### Returns

`object`[]

### listeners

> **listeners**: `object`

#### listeners.:function\[type\]()

> `readonly` **:function\[type\]**: (`node`) => `void` = `onFunctionEnter`

##### Parameters

###### node

`TSESTreeFunction`

##### Returns

`void`

#### listeners.:function\[type\]:exit()

> `readonly` **:function\[type\]:exit**: () => `undefined` \| \{ `hookCalls`: `CallExpression`[]; `isComponent`: `boolean`; `key`: `string`; `node`: `TSESTreeFunction`; \} = `onFunctionExit`

##### Returns

`undefined` \| \{ `hookCalls`: `CallExpression`[]; `isComponent`: `boolean`; `key`: `string`; `node`: `TSESTreeFunction`; \}

#### listeners.ArrowFunctionExpression\[type\]\[body.type!='BlockStatement'\]()

##### Returns

`void`

#### listeners.AssignmentExpression\[type\]\[operator='='\]\[left.type='MemberExpression'\]\[left.property.name='displayName'\]()?

##### Parameters

###### node

`AssignmentExpression` & `object`

##### Returns

`void`

#### listeners.CallExpression\[type\]:exit()?

##### Parameters

###### node

`CallExpression`

##### Returns

`void`

#### listeners.ReturnStatement\[type\]()

##### Parameters

###### node

`ReturnStatement`

##### Returns

`void`
