# Changelog typescript-schema-transformer

## [2.1.6](https://github.com/healthinal/typescript-schema-transformer/compare/v2.1.5...v2.1.6) (2022-12-05)


### Bug Fixes

* upgrade date-fns from 2.29.1 to 2.29.3 ([6ed7bf1](https://github.com/healthinal/typescript-schema-transformer/commit/6ed7bf17214684aa030821e5841cee0fe9baeed2))

## [2.1.5](https://github.com/healthinal/typescript-schema-transformer/compare/v2.1.4...v2.1.5) (2022-11-24)


### Bug Fixes

* upgrade date-fns from 2.28.0 to 2.29.1 ([d2c6063](https://github.com/healthinal/typescript-schema-transformer/commit/d2c606366d3184e7b97570fbb77beedef1be8970))

## [2.1.4](https://github.com/healthinal/typescript-schema-transformer/compare/v2.1.3...v2.1.4) (2022-01-18)


### Bug Fixes

* upgrade ramda from 0.27.2 to 0.28.0 ([0366d56](https://github.com/healthinal/typescript-schema-transformer/commit/0366d569b6a8908122631aed9bdb647d3b5b8b40))

## [2.1.3](https://github.com/healthinal/typescript-schema-transformer/compare/v2.1.2...v2.1.3) (2022-01-12)


### Bug Fixes

* package.json & yarn.lock to reduce vulnerabilities ([75c125d](https://github.com/healthinal/typescript-schema-transformer/commit/75c125d4fd0a0ebaf2c0ee2cfcc5801ee3ec753f))

## [2.1.2](https://github.com/healthinal/typescript-schema-transformer/compare/v2.1.1...v2.1.2) (2022-01-04)


### Bug Fixes

* upgrade date-fns from 2.27.0 to 2.28.0 ([6740c10](https://github.com/healthinal/typescript-schema-transformer/commit/6740c109d2deb9a0ef6584d1698c93290db75e0c))

## [2.1.1](https://github.com/healthinal/typescript-schema-transformer/compare/v2.1.0...v2.1.1) (2021-12-02)


### Bug Fixes

* upgrade date-fns from 2.26.0 to 2.27.0 ([dbefd65](https://github.com/healthinal/typescript-schema-transformer/commit/dbefd65c9ca2898a28de2d8592b37852be12d577))

# [2.1.0](https://github.com/healthinal/typescript-schema-transformer/compare/v2.0.6...v2.1.0) (2021-11-25)


### Features

* require a schema for optional (prop ?: type) properties ([92530df](https://github.com/healthinal/typescript-schema-transformer/commit/92530dfa1e75cfc9442ea7e4b3b07c64f0d5fb7a))

## [2.0.6](https://github.com/healthinal/typescript-schema-transformer/compare/v2.0.5...v2.0.6) (2021-11-22)


### Bug Fixes

* upgrade date-fns from 2.25.0 to 2.26.0 ([c80a5e1](https://github.com/healthinal/typescript-schema-transformer/commit/c80a5e18c3ed4d4e3a249bd420345c7ca683f09c))

## [2.0.5](https://github.com/healthinal/typescript-schema-transformer/compare/v2.0.4...v2.0.5) (2021-10-07)


### Bug Fixes

* upgrade date-fns from 2.24.0 to 2.25.0 ([915abaf](https://github.com/healthinal/typescript-schema-transformer/commit/915abaf8c977c0b22db16cab385681ac68740da7))

## [2.0.4](https://github.com/healthinal/typescript-schema-transformer/compare/v2.0.3...v2.0.4) (2021-09-26)


### Bug Fixes

* upgrade date-fns from 2.23.0 to 2.24.0 ([e2296ce](https://github.com/healthinal/typescript-schema-transformer/commit/e2296ceb36b8b90f1156f7ad30d3a01273c8e591))

## [2.0.3](https://github.com/healthinal/typescript-schema-transformer/compare/v2.0.2...v2.0.3) (2021-07-26)


### Bug Fixes

* upgrade date-fns from 2.22.1 to 2.23.0 ([416f8dd](https://github.com/healthinal/typescript-schema-transformer/commit/416f8dd1c79b6064a2d9ef18571cb84e0f893811))

## [2.0.2](https://github.com/healthinal/typescript-schema-transformer/compare/v2.0.1...v2.0.2) (2021-05-31)


### Bug Fixes

* upgrade date-fns from 2.21.3 to 2.22.1 ([ad38a8a](https://github.com/healthinal/typescript-schema-transformer/commit/ad38a8a63cdf10b35acb6555dd9602bebb74cdcf))

## [2.0.1](https://github.com/healthinal/typescript-schema-transformer/compare/v2.0.0...v2.0.1) (2021-05-27)


### Bug Fixes

* upgrade date-fns from 2.16.1 to 2.21.3 ([19db876](https://github.com/healthinal/typescript-schema-transformer/commit/19db876014a9c1545c14321642c61706d50f0919))

# [2.0.0](https://github.com/healthinal/typescript-schema-transformer/compare/v1.7.1...v2.0.0) (2021-02-04)


### Features

* upgrade to TypeScript 4.1 and leverage its features ([e90b419](https://github.com/healthinal/typescript-schema-transformer/commit/e90b4198f704fcad21f34fd1fb594d78b5debd81))


### BREAKING CHANGES

* - Replace UnionTypeX by UnionType
- Switch from ObjectTransformationSchema to TransformationSchema
- Allow transformWithSchema to accept every possible schema (not only objects)
- Fix the typing of optionalSchema

## [1.7.1](https://github.com/healthinal/typescript-schema-transformer/compare/v1.7.0...v1.7.1) (2021-02-02)


### Bug Fixes

* improve type inference for optionalSchema ([7ad8ac0](https://github.com/healthinal/typescript-schema-transformer/commit/7ad8ac020de704b860041fe6847b7044059ebc75))

# [1.7.0](https://github.com/healthinal/typescript-schema-transformer/compare/v1.6.0...v1.7.0) (2021-02-02)


### Features

* add optional schemas ([1f47f15](https://github.com/healthinal/typescript-schema-transformer/commit/1f47f155956956343367293ac11696f084f55015))

# [1.6.0](https://github.com/healthinal/typescript-schema-transformer/compare/v1.5.4...v1.6.0) (2020-09-23)


### Features

* allow union types in createUnionTypeTransformationSchema ([93025c5](https://github.com/healthinal/typescript-schema-transformer/commit/93025c58f177276d83888a5c3c270d13befc9962))

## [1.5.4](https://github.com/healthinal/typescript-schema-transformer/compare/v1.5.3...v1.5.4) (2020-09-02)


### Bug Fixes

* upgrade date-fns from 2.16.0 to 2.16.1 ([5df202b](https://github.com/healthinal/typescript-schema-transformer/commit/5df202bcbbc026615833aab604c49c27301febfb))

## [1.5.3](https://github.com/healthinal/typescript-schema-transformer/compare/v1.5.2...v1.5.3) (2020-09-01)


### Bug Fixes

* upgrade date-fns from 2.15.0 to 2.16.0 ([ba206f5](https://github.com/healthinal/typescript-schema-transformer/commit/ba206f5b332cb35e5f96c30cdc92d6f42fe57635))

## [1.5.2](https://github.com/healthinal/typescript-schema-transformer/compare/v1.5.1...v1.5.2) (2020-08-03)


### Bug Fixes

* upgrade ramda from 0.27.0 to 0.27.1 ([4d08418](https://github.com/healthinal/typescript-schema-transformer/commit/4d084181327e1494cbeb5e554bd935b8bb9f0216))

## [1.5.1](https://github.com/healthinal/typescript-schema-transformer/compare/v1.5.0...v1.5.1) (2020-07-20)


### Bug Fixes

* upgrade date-fns from 2.14.0 to 2.15.0 ([31984d4](https://github.com/healthinal/typescript-schema-transformer/commit/31984d43f7b11088c615c62a157e300aa5a513ce))

# [1.5.0](https://github.com/healthinal/typescript-schema-transformer/compare/v1.4.2...v1.5.0) (2020-06-22)


### Features

* add optional date and time schemas ([c4d1eae](https://github.com/healthinal/typescript-schema-transformer/commit/c4d1eae097ebb3346556d487d18d39f8341cc202))

## [1.4.2](https://github.com/healthinal/typescript-schema-transformer/compare/v1.4.1...v1.4.2) (2020-05-20)


### Bug Fixes

* upgrade date-fns from 2.13.0 to 2.14.0 ([71a6d6c](https://github.com/healthinal/typescript-schema-transformer/commit/71a6d6ce7681a1f4674c5d83f81f67183d60188a))
* upgrade date-fns from 2.13.0 to 2.14.0 ([13e0649](https://github.com/healthinal/typescript-schema-transformer/commit/13e064924299af6ebfb701686ef9615639743ab0))

## [1.4.1](https://github.com/healthinal/typescript-schema-transformer/compare/v1.4.0...v1.4.1) (2020-05-12)


### Bug Fixes

* upgrade date-fns from 2.12.0 to 2.13.0 ([6a0e4bb](https://github.com/healthinal/typescript-schema-transformer/commit/6a0e4bb6367297068314fe1379247786971a1f7c))
* upgrade date-fns from 2.12.0 to 2.13.0 ([7ed87b4](https://github.com/healthinal/typescript-schema-transformer/commit/7ed87b45d8b54af3f2f2b650f8d899f2929d4156))

# [1.4.0](https://github.com/healthinal/typescript-schema-transformer/compare/v1.3.3...v1.4.0) (2020-05-05)


### Features

* add silent value schemas ([10eb15e](https://github.com/healthinal/typescript-schema-transformer/commit/10eb15ec50e042aa7fa1f7665394e6f630e4c095))

## [1.3.3](https://github.com/healthinal/typescript-schema-transformer/compare/v1.3.2...v1.3.3) (2020-04-16)


### Bug Fixes

* upgrade date-fns from 2.11.1 to 2.12.0 ([2486666](https://github.com/healthinal/typescript-schema-transformer/commit/24866662311c0d89efa0d16122b71161ba0a56d7))

## [1.3.2](https://github.com/healthinal/typescript-schema-transformer/compare/v1.3.1...v1.3.2) (2020-03-24)

### Bug Fixes

- use parseISO of date-fns instead of custom format for ISO dates ([c57816f](https://github.com/healthinal/typescript-schema-transformer/commit/c57816fb47c01a82e9b7489f0f586f8306151455))

## [1.3.1](https://github.com/healthinal/typescript-schema-transformer/compare/v1.3.0...v1.3.1) (2020-03-23)

### Bug Fixes

- upgrade to TS 3.8 and export union types 6-9 ([cae80ee](https://github.com/healthinal/typescript-schema-transformer/commit/cae80ee98339c0576afcc60a8e24c65160007fae))

# [1.3.0](https://github.com/healthinal/typescript-schema-transformer/compare/v1.2.1...v1.3.0) (2020-02-06)

### Features

- curry transformWithSchema ([d81a34f](https://github.com/healthinal/typescript-schema-transformer/commit/d81a34fcc8f40421a9cef486b3cdbca3ab3329b2))

## [1.2.1](https://github.com/healthinal/typescript-schema-transformer/compare/v1.2.0...v1.2.1) (2020-02-03)

### Bug Fixes

- **package:** update ramda to version 0.27.0 ([3e53722](https://github.com/healthinal/typescript-schema-transformer/commit/3e537222d82ca2cce8fa58a5adbba484eb671f1f))

# [1.2.0](https://github.com/healthinal/typescript-schema-transformer/compare/v1.1.0...v1.2.0) (2019-10-13)

### Features

- add optional schemas for boolean and number ([d814c0a](https://github.com/healthinal/typescript-schema-transformer/commit/d814c0ae396ca319214efc72bd461e7c3cc05a8f))
