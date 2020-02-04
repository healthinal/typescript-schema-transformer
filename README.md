# Typescript Schema Transformer

Ensure your typings match the runtime object structures.

[![CircleCI](https://circleci.com/gh/healthinal/typescript-schema-transformer.svg?style=svg)](https://circleci.com/gh/healthinal/typescript-schema-transformer)
[![codecov](https://codecov.io/gh/healthinal/typescript-schema-transformer/branch/master/graph/badge.svg)](https://codecov.io/gh/healthinal/typescript-schema-transformer)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Greenkeeper badge](https://badges.greenkeeper.io/healthinal/typescript-schema-transformer.svg)](https://greenkeeper.io/)

```typescript
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

## Inspiration

- [deox](https://github.com/thebrodmann/deox): Project setup (check this library out if you are a Redux & TypeScript user)

## License

This library is released under [MIT license](https://opensource.org/licenses/MIT).
