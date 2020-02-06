# TypeScript Schema Transformer

Ensure your typings match the runtime object structures.

[![CircleCI](https://circleci.com/gh/healthinal/typescript-schema-transformer.svg?style=svg)](https://circleci.com/gh/healthinal/typescript-schema-transformer)
[![codecov](https://codecov.io/gh/healthinal/typescript-schema-transformer/branch/master/graph/badge.svg)](https://codecov.io/gh/healthinal/typescript-schema-transformer)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Greenkeeper badge](https://badges.greenkeeper.io/healthinal/typescript-schema-transformer.svg)](https://greenkeeper.io/)
[![npm version](https://img.shields.io/npm/v/@healthinal/typescript-schema-transformer.svg?label=npm&style=flat-square)](https://www.npmjs.com/package/@healthinal/typescript-schema-transformer)

```typescript
import {
  addStaticValueSchema,
  ObjectTransformationSchema,
  optionalStringSchema,
  requiredBooleanSchema,
  requiredStringSchema,
  transformWithSchema,
} from '@healthinal/typescript-schema-transformer';

enum AinurType {
  VALAR = 'VALAR',
  MAIAR = 'MAIAR',
}

type Valar = {
  readonly type: AinurType.VALAR;
  readonly name: string;
  readonly domain?: string;
  readonly isFemale: boolean;
};

const valarSchema: ObjectTransformationSchema<Valar> = {
  type: addStaticValueSchema(AinurType.VALAR),
  name: requiredStringSchema(),
  domain: optionalStringSchema(),
  isFemale: requiredBooleanSchema(true),
};

const [valar, _] = transformWithSchema(valarSchema, { name: 'Varda' });
console.log(valar);
/*
{
  type: 'VALAR',
  name: 'Varda',
  domain: undefined,
  isFemale: true,
}
*/
```

## Motivation

TypeScript does not provide you with runtime type checks which is no problem most of the time if the interaction
is limited to TypeScript code. But as soon as you add e. g. an external API or some storage it easily can get messy
because TypeScript just assumes that an API actually returns a value of the type you assert.
This can lead to situations where your TypeScript functions are called with a different type than your type annotation
requires. As soon as this happens, there is no guarantee anymore that you will not face runtime errors caused by type errors.

To prevent such problems it is important to add an anti-corruption layer which ensures that the TypeScript typings
actually match the runtime values.

## Goals

- Enforce the correctness of the provided schema via TypeScript typings
- Correct wrong data instead of failing (e. g. do not fail if an API returns `null` instead of an empty array)
- Concise syntax
- Favor a functional style (use pure functions whenever possible)
- Do not use decorators to enable structural typing

### Non-Goals

- Validate an object according to a JSON Schema (use something like [Ajv](https://github.com/epoberezkin/ajv))
- Support preservation of prototype information

## Installation

```shell script
# Yarn
yarn add @healthinal/typescript-schema-transformer

# npm
npm install @healthinal/typescript-schema-transformer
```

Use the package with

```typescript
import { transformWithSchema } from '@healthinal/typescript-schema-transformer';
```

## API

### Transform

#### transformWithSchema(schema: ObjectTransformationSchema<T>, objectToTransform: unknown): [T, ValidationRemarks]

This is the main function to call from this library.
The first argument is a schema which describes the type T and how a value can be transformed to this type.
The second argument is the actual object which can have any type (therefore the unknown type).
The function returns a tuple containing the transformed object which is assured to be of type T and a validation remarks object.

```typescript
const [valar, validationRemarks] = transformWithSchema(valarSchema, {
  name: 'Varda',
});
```

### Validation remarks

As seen above, `transformWithSchema` returns a tuple with the transformed object and a so called validation remarks object.
You might wonder what the type of ValidationRemarks is so there you go:

```typescript
const objectValidationRemarkKey = Symbol();
type ValidationRemarks =
  | string
  | {
      [objectValidationRemarkKey]?: string;
      [key: string]: ValidationRemarks;
    };
```

It is basically a data structure which can hold the results of the validation according to the structure of the validation schema.
For further usage the following functions can be used:

#### logWarningIfValidationRemarksArePresent(transformationName: string, validationRemarks: ValidationRemarks): void

_WARNING: This function is NOT pure!!!_

This is a utility function which can be used to log validation remarks to the console.
This is useful if you want to work with whatever the transformation returns but still want to be able to see if something was not quite right.

```typescript
const [_, validationRemarks] = transformWithSchema(valarSchema, {
  name: 'Varda',
});
logWarningIfValidationRemarksArePresent(validationRemarks);
```

#### validationRemarksToStrings(validationRemarks: ValidationRemarks): string[]

Transforms the validation remarks to a list of strings containing the remarks in a human readable format.

```typescript
const [_, validationRemarks] = transformWithSchema(valarSchema, {
  name: 'Varda',
});
const remarksAsStrings = validationRemarksToStrings(validationRemarks);
```

#### hasNoValidationRemarks(validationRemarks: ValidationRemarks): boolean

Checks if there were no validation remarks.
If this function returns true, the transformation process did not change anything.

```typescript
const [_, validationRemarks] = transformWithSchema(valarSchema, {
  name: 'Varda',
});
if (hasNoValidationRemarks(validationRemarks)) {
  // ...
}
```

### Schema

To be able to transform an object a schema describing the transformation has to exist for a type.
The typical process is to create a schema constant of the type `ObjectTransformationSchema<YourType>` which will help to create a correct schema for the type.
Your IDE should also be able to help with autocompletion in this process.

#### Object schema

The root of a schema is always a object schema.
It is used to transform an object literal with zero to n (finite) keys.
The values of the properties are object, array or value schemas.
The used schemas have to match the passed type (referenced in ObjectTransformationSchema, TypeScript should enforce this).

Imagine a value of the following type should be transformed:

```typescript
type Valar = {
  readonly name: string;
  readonly domain?: string;
  readonly isFemale: boolean;
};
```

There are several possible object schemas which will result in different transformations, but all will ensure that the returned value is actually of type `Valar`.

Example 1:

```typescript
const valarSchema: ObjectTransformationSchema<Valar> = {
  name: requiredStringSchema(),
  domain: optionalStringSchema(),
  isFemale: requiredBooleanSchema(),
};
```

This is the most basic schema which will use the predefined default values.

Example 2:

```typescript
const valarSchema: ObjectTransformationSchema<Valar> = {
  name: requiredStringSchema('no name available'),
  domain: requiredStringSchema(),
  isFemale: requiredBooleanSchema(),
};
```

In this example the default value of the name has been changed, meaning that a non-string value in the name property (or no name property at all) will result
in the value 'no name available' instead of an empty string (which is the predefined default value).
The transformation of the domain has been changed too.
Since the domain property allows undefined and strings, the requiredStringSchema which ensures the value to be a string is valid too because it enforces
a subset of the type domain requires.

Example 3 (DOES NOT WORK):

```typescript
// NOT VALID
const valarSchema: ObjectTransformationSchema<Valar> = {
  name: optionalStringSchema(),
  domain: optionalNumberSchema(),
  isFemale: requiredNumberSchema(),
};
```

The example above does not work because the property name requires a string and not `string | undefined` and the domain as well as the isFemale property cannot hold a number.
This is enforced using TypeScript so you should not be able to create a wrong schema on accident (on purpose this is of course possible).

#### Array schema

To transform an object which has a property containing an array you need an array schema.
It contains another schema which will be used to transform all elements of the array.

Example:

```typescript
type Maiar = {
  readonly name: string;
  readonly enemies: readonly string[];
};

const maiarSchema: ObjectTransformationSchema<Maiar> = {
  name: requiredStringSchema(),
  enemies: [requiredStringSchema()],
};
```

In the example above you can see that an array schema is a simple array containing a single item which is the transformation schema for the
elements of the array.

#### Value schema

Value schemas can be used to transform primitive values like strings, booleans and numbers.
Generally there are two types of value transformers: required and optional.
Required transformers always ensure the value to be of the specific type while optional transformers allow undefined values (null will be transformed to undefined too).
Required transformers allow the default value to be overridden, otherwise the predefined default value will be used (e. g. an empty string for strings or 0 for numbers).

##### requiredStringSchema(defaultValue?: string): ValueTransformationSchema<string>

##### optionalStringSchema(): ValueTransformationSchema<string | undefined>

##### requiredNumberSchema(defaultValue?: number): ValueTransformationSchema<number>

##### optionalNumberSchema(): ValueTransformationSchema<number | undefined>

##### requiredBooleanSchema(defaultValue?: boolean): ValueTransformationSchema<boolean>

##### optionalBooleanSchema(): ValueTransformationSchema<boolean | undefined>

##### requiredDateSchema(defaultValue?: string): ValueTransformationSchema<string>

This ensures the string to be a valid date of the format YYYY-MM-DD.
It does not only check the format but also if it is a real date (e. g. 2019-02-30 is not a valid date).

##### requiredTimeSchema(defaultValue?: string): ValueTransformationSchema<string>

This ensures the string to be a valid time of the format hh:mm:ss.
It does not only check the format but also if it is a real time (e. g. 22:45:70 is not a valid time).

##### requiredIsoDateTimeSchema(defaultValue?: string): ValueTransformationSchema<string>

Does the same checks as `requiredDateSchema` and `requiredTimeSchema` but with the format YYYY-MM-DDThh:mm:ss (e. g. 2019-02-03T13:59:12).

##### optionalColorStringSchema(): ValueTransformationSchema<string | undefined>

Checks if the string is a valid hex color (e. g. #ffEA99).

##### requiredEnumSchema(enumValues: T[], defaultValue?: T): ValueTransformationSchema<T>

This transformer schema can be used to enforce a value to be one of a list of values, typically from an enum.
See the examples [below](https://github.com/healthinal/typescript-schema-transformer#example-transformations) for more information.

##### staticValueSchema(value: T): ValueTransformationSchema<T>

Checks if a value matches a static value and raises a remark if it does not.
Without other elements this may seem quite odd but with union transformers it can be really useful to create [discriminated unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions).

##### addStaticValueSchema(value: T): ValueTransformationSchema<T>

This is basically the same as `staticValueSchema` but does not raise a remark if the source object does not contain the value.
It is useful to add an attribute for discriminated unions if the source (e. g. the API) does not deliver such a value.

<!--
#### Union

#### noTransformationSchema: ValueTransformationSchema<any>

#### Recursion

### Custom value transformations

#### getValidationRemark
-->

## Example transformations

The following examples should you understand what the transformation actually does.
If you need more examples, feel free to head over to the [test suite](https://github.com/healthinal/typescript-schema-transformer/tree/master/src/__tests__) containing many more examples.

The examples assume a basic transformation like this:

```typescript
const schema: ObjectTransformationSchema<SomeType> = {
  // ...
};
const [output] = transformWithSchema(schema, input);
```

The corresponding type will be omitted in the examples because it can be derived from the schema.
Accordingly the following schema...

```typescript
const schema: ObjectTransformationSchema<SomeType> = {
  foo: requiredStringSchema(),
  bar: [requiredBooleanSchema()],
};
```

...would derive the following type:

```typescript
type SomeType = {
  readonly foo: string;
  readonly bar: readonly boolean[];
};
```

<table>
    <tr>
        <th>schema</th>
        <th>input</th>
        <th>output</th>
        <th>No warnings</th>
    </tr>
<tr>
<td rowspan="4">

```typescript
const schema = {
  type: addStaticValueSchema(AinurType.VALAR),
  name: requiredStringSchema(),
  domain: optionalStringSchema(),
  isFemale: requiredBooleanSchema(true),
};
```

</td>
<td>

```typescript
const input = {
  type: 'VALAR',
  name: 'Varda',
  domain: 'Stars',
  isFemale: true,
};
```

</td>
<td>

```typescript
const output = {
  type: 'VALAR',
  name: 'Varda',
  domain: 'Stars',
  isFemale: true,
};
```

</td>
<td>:white_check_mark:</td>
</tr>
<tr>
<td>

```typescript
const input = {
  name: 'Varda',
  domain: null,
  isFemale: true,
};
```

</td>
<td>

```typescript
const output = {
  type: 'VALAR',
  name: 'Varda',
  domain: undefined,
  isFemale: true,
};
```

</td>
<td>:white_check_mark:</td>
</tr>
<tr>
<td>

```typescript
const input = {};
```

</td>
<td>

```typescript
const output = {
  type: 'VALAR',
  name: '',
  domain: undefined,
  isFemale: true,
};
```

</td>
<td>:x:</td>
</tr>
<tr>
<td>

```typescript
const input = {
  type: 'MAIAR',
  name: 123,
  domain: null,
  isFemale: false,
};
```

</td>
<td>

```typescript
const output = {
  type: 'VALAR',
  name: '',
  domain: undefined,
  isFemale: false,
};
```

</td>
<td>:x:</td>
</tr>
<tr>
<td rowspan="2">

```typescript
const schema = {
  name: requiredStringSchema(),
  enemies: [requiredStringSchema()],
  friends: [optionalStringSchema()],
  rings: [
    {
      name: requiredStringSchema(),
      gem: optionalStringSchema(),
    },
  ],
};
```

</td>
<td>

```typescript
const input = {
  name: 'Gandalf',
  enemies: ['Sauron', 'Saruman'],
  friends: ['Frodo', undefined, null, 'Aragorn'],
  rings: [
    {
      name: 'Narya',
      gem: 'Ruby',
    },
  ],
};
```

</td>
<td>

```typescript
const output = {
  name: 'Gandalf',
  enemies: ['Sauron', 'Saruman'],
  friends: ['Frodo', undefined, undefined, 'Aragorn'],
  rings: [
    {
      name: 'Narya',
      gem: 'Ruby',
    },
  ],
};
```

</td>
<td>:white_check_mark:</td>
</tr>
<tr>
<td>

```typescript
const input = {
  name: 'Gandalf',
  enemies: ['Sauron', undefined, true],
  friends: 'Frodo',
  rings: [
    false,
    {
      name: 'Narya',
      gem: 'Ruby',
    },
  ],
};
```

</td>
<td>

```typescript
const output = {
  name: 'Gandalf',
  enemies: ['Sauron', '', ''],
  friends: [],
  rings: [
    {
      name: '',
      gem: undefined,
    },
    {
      name: 'Narya',
      gem: 'Ruby',
    },
  ],
};
```

</td>
<td>:x:</td>
</tr>
<tr>
<td rowspan="3">

```typescript
const schema = {
  a: requiredStringSchema(),
  b: optionalStringSchema(),
  c: requiredNumberSchema(),
  d: optionalNumberSchema(),
  e: requiredBooleanSchema(),
  f: optionalBooleanSchema(),
  g: requiredDateSchema(),
  h: requiredTimeSchema(),
  i: requiredIsoDateTimeSchema(),
  j: optionalColorStringSchema(),
};
```

</td>
<td>

```typescript
const input = {
  a: 'a',
  b: undefined,
  c: 2,
  d: undefined,
  e: true,
  f: undefined,
  g: '2020-02-02',
  h: '14:55:12',
  i: '2020-02-02T14:55:12',
  j: undefined,
};
```

</td>
<td>

```typescript
const output = {
  a: 'a',
  b: undefined,
  c: 2,
  d: undefined,
  e: true,
  f: undefined,
  g: '2020-02-02',
  h: '14:55:12',
  i: '2020-02-02T14:55:12',
  j: undefined,
};
```

</td>
<td>:white_check_mark:</td>
</tr>
<tr>
<td>

```typescript
const input = {
  a: 'a',
  b: 'b',
  c: 2,
  d: 3,
  e: true,
  f: false,
  g: '2020-02-02',
  h: '14:55:12',
  i: '2020-02-02T14:55:12',
  j: '#fe45AE',
};
```

</td>
<td>

```typescript
const output = {
  a: 'a',
  b: 'b',
  c: 2,
  d: 3,
  e: true,
  f: false,
  g: '2020-02-02',
  h: '14:55:12',
  i: '2020-02-02T14:55:12',
  j: '#fe45AE',
};
```

</td>
<td>:white_check_mark:</td>
</tr>
<tr>
<td>

```typescript
const input = {};
```

</td>
<td>

```typescript
const output = {
  a: '',
  b: undefined,
  c: 0,
  d: undefined,
  e: false,
  f: undefined,
  g: '0001-01-01',
  h: '00:00:00',
  i: '0001-01-01T00:00:00',
  j: undefined,
};
```

</td>
<td>:x:</td>
</tr>
<tr>
<td>

```typescript
const schema = {
  a: requiredStringSchema('default'),
  b: requiredNumberSchema(42),
  c: requiredBooleanSchema(true),
  d: requiredDateSchema('2019-01-01'),
  e: requiredTimeSchema('14:00:00'),
  f: requiredIsoDateTimeSchema('2019-01-01T14:00:00'),
};
```

</td>
<td>

```typescript
const input = {};
```

</td>
<td>

```typescript
const output = {
  a: 'default',
  b: 42,
  c: true,
  d: '2019-01-01',
  e: '14:00:00',
  f: '2019-01-01T14:00:00',
};
```

</td>
<td>:x:</td>
</tr>
<tr>
<td rowspan="2">

```typescript
const values = <T extends object, K extends keyof T>(obj: T): T[K][] =>
  Object.keys(obj).map(k => (obj as any)[k]);

enum ElfType {
  VANYAR = 'VANYAR',
  NOLDOR = 'NOLDOR',
  TELERI = 'TELERI',
}

const schema = {
  name: requiredStringSchema(),
  type: requiredEnumSchema(values(ElfType)),
};
```

</td>
<td>

```typescript
const input = {
  name: 'Galadriel',
  type: ElfType.NOLDOR,
};
```

</td>
<td>

```typescript
const output = {
  name: 'Galadriel',
  type: ElfType.NOLDOR,
};
```

</td>
<td>:white_check_mark:</td>
</tr>
<tr>
<td>

```typescript
const input = {
  name: 'Ingwe',
};
```

</td>
<td>

```typescript
const output = {
  name: 'Ingwe',
  type: ElfType.VANYAR,
};
```

</td>
<td>:x:</td>
</tr>
<tr>
<td>

```typescript
const schema = {
  name: requiredStringSchema(),
  type: requiredEnumSchema(values(ElfType), ElfType.TELERI),
};
```

</td>
<td>

```typescript
const input = {
  name: 'Elwe',
  type: 'ELVISH',
};
```

</td>
<td>

```typescript
const output = {
  name: 'Elwe',
  type: ElfType.TELERI,
};
```

</td>
<td>:x:</td>
</tr>
</table>

## Inspiration

- [deox](https://github.com/thebrodmann/deox): Project setup (check this library out if you are a Redux & TypeScript user)

## License

This library is released under [MIT license](https://opensource.org/licenses/MIT).
