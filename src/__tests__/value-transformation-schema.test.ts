import { filter, values } from 'ramda';

import {
  addStaticValueSchema,
  noTransformationSchema,
  optionalBooleanSchema,
  optionalColorStringSchema,
  optionalNumberSchema,
  optionalStringSchema,
  requiredBooleanSchema,
  requiredDateSchema,
  requiredEnumSchema,
  requiredIsoDateTimeSchema,
  requiredNumberSchema,
  requiredStringSchema,
  requiredTimeSchema,
  staticValueSchema,
} from '..';
import { getValidationRemark } from '../helper';
import { assert } from '../utils';

describe('requiredStringSchema()', () => {
  assert({
    given: 'a string',
    should: 'return the value without validation remark',
    actual: () => requiredStringSchema()('foo'),
    expected: ['foo', undefined],
  });

  assert({
    given: 'undefined',
    should: 'return default value and validation remark',
    actual: () => requiredStringSchema()(undefined),
    expected: ['', getValidationRemark('string', undefined, '')],
  });

  assert({
    given: 'a number',
    should: 'return default value and validation remark',
    actual: () => requiredStringSchema()(123),
    expected: ['', getValidationRemark('string', 123, '')],
  });

  assert({
    given: 'special default value',
    should: 'return the special default value',
    actual: () => requiredStringSchema('bar')(undefined),
    expected: ['bar', getValidationRemark('string', undefined, 'bar')],
  });
});

describe('optionalStringSchema()', () => {
  assert({
    given: 'a string',
    should: 'return the value without validation remark',
    actual: () => optionalStringSchema()('foo'),
    expected: ['foo', undefined],
  });

  assert({
    given: 'undefined',
    should: 'return undefined without validation remark',
    actual: () => optionalStringSchema()(undefined),
    expected: [undefined, undefined],
  });

  assert({
    given: 'a number',
    should: 'return undefined and validation remark',
    actual: () => optionalStringSchema()(123),
    expected: [undefined, getValidationRemark('string', 123, undefined)],
  });
});

describe('requiredNumberSchema()', () => {
  assert({
    given: 'a number',
    should: 'return the value without validation remark',
    actual: () => requiredNumberSchema()(123),
    expected: [123, undefined],
  });

  assert({
    given: 'undefined',
    should: 'return default value and validation remark',
    actual: () => requiredNumberSchema()(undefined),
    expected: [0, getValidationRemark('number', undefined, 0)],
  });

  assert({
    given: 'a string',
    should: 'return default value and validation remark',
    actual: () => requiredNumberSchema()('foo'),
    expected: [0, getValidationRemark('number', 'foo', 0)],
  });

  assert({
    given: 'special default value',
    should: 'return the special default value',
    actual: () => requiredNumberSchema(99)(undefined),
    expected: [99, getValidationRemark('number', undefined, 99)],
  });
});

describe('optionalNumberSchema()', () => {
  assert({
    given: 'a number',
    should: 'return the value without validation remark',
    actual: () => optionalNumberSchema()(123),
    expected: [123, undefined],
  });

  assert({
    given: 'undefined',
    should: 'return undefined without validation remark',
    actual: () => optionalNumberSchema()(undefined),
    expected: [undefined, undefined],
  });

  assert({
    given: 'a string',
    should: 'return undefined and validation remark',
    actual: () => optionalNumberSchema()('foo'),
    expected: [undefined, getValidationRemark('number', 'foo', undefined)],
  });
});

describe('requiredBooleanSchema()', () => {
  assert({
    given: 'a boolean',
    should: 'return the value without validation remark',
    actual: () => requiredBooleanSchema()(true),
    expected: [true, undefined],
  });

  assert({
    given: 'undefined',
    should: 'return default value and validation remark',
    actual: () => requiredBooleanSchema()(undefined),
    expected: [false, getValidationRemark('boolean', undefined, false)],
  });

  assert({
    given: 'a string',
    should: 'return default value and validation remark',
    actual: () => requiredBooleanSchema()('foo'),
    expected: [false, getValidationRemark('boolean', 'foo', false)],
  });

  assert({
    given: 'special default value',
    should: 'return the special default value',
    actual: () => requiredBooleanSchema(true)(undefined),
    expected: [true, getValidationRemark('boolean', undefined, true)],
  });
});

describe('optionalBooleanSchema()', () => {
  assert({
    given: 'a boolean',
    should: 'return the value without validation remark',
    actual: () => optionalBooleanSchema()(true),
    expected: [true, undefined],
  });

  assert({
    given: 'undefined',
    should: 'return undefined without validation remark',
    actual: () => optionalBooleanSchema()(undefined),
    expected: [undefined, undefined],
  });

  assert({
    given: 'a string',
    should: 'return undefined and validation remark',
    actual: () => optionalBooleanSchema()('foo'),
    expected: [undefined, getValidationRemark('boolean', 'foo', undefined)],
  });
});

describe('requiredDateSchema()', () => {
  assert({
    given: 'a date',
    should: 'return the value without validation remark',
    actual: () => requiredDateSchema()('2019-03-05'),
    expected: ['2019-03-05', undefined],
  });

  assert({
    given: 'undefined',
    should: 'return default value and validation remark',
    actual: () => requiredDateSchema()(undefined),
    expected: [
      '0001-01-01',
      getValidationRemark('date', undefined, '0001-01-01'),
    ],
  });

  assert({
    given: 'invalid date',
    should: 'return default value and validation remark',
    actual: () => requiredDateSchema()('2019-02-30'),
    expected: [
      '0001-01-01',
      getValidationRemark('date', '2019-02-30', '0001-01-01'),
    ],
  });

  assert({
    given: 'a string not in correct format',
    should: 'return default value and validation remark',
    actual: () => requiredDateSchema()('foo'),
    expected: ['0001-01-01', getValidationRemark('date', 'foo', '0001-01-01')],
  });

  assert({
    given: 'a number',
    should: 'return default value and validation remark',
    actual: () => requiredDateSchema()(123),
    expected: ['0001-01-01', getValidationRemark('date', 123, '0001-01-01')],
  });

  assert({
    given: 'special default value',
    should: 'return the special default value',
    actual: () => requiredDateSchema('2000-01-01')(undefined),
    expected: [
      '2000-01-01',
      getValidationRemark('date', undefined, '2000-01-01'),
    ],
  });
});

describe('requiredTimeSchema()', () => {
  assert({
    given: 'a time',
    should: 'return the value without validation remark',
    actual: () => requiredTimeSchema()('13:10:34'),
    expected: ['13:10:34', undefined],
  });

  assert({
    given: 'undefined',
    should: 'return default value and validation remark',
    actual: () => requiredTimeSchema()(undefined),
    expected: ['00:00:00', getValidationRemark('time', undefined, '00:00:00')],
  });

  assert({
    given: 'invalid time',
    should: 'return default value and validation remark',
    actual: () => requiredTimeSchema()('22:45:70'),
    expected: ['00:00:00', getValidationRemark('time', '22:45:70', '00:00:00')],
  });

  assert({
    given: 'invalid time (midnight)',
    should: 'return default value and validation remark',
    actual: () => requiredTimeSchema()('24:00:00'),
    expected: ['00:00:00', getValidationRemark('time', '24:00:00', '00:00:00')],
  });

  assert({
    given: 'a string not in correct format',
    should: 'return default value and validation remark',
    actual: () => requiredTimeSchema()('foo'),
    expected: ['00:00:00', getValidationRemark('time', 'foo', '00:00:00')],
  });

  assert({
    given: 'a number',
    should: 'return default value and validation remark',
    actual: () => requiredTimeSchema()(123),
    expected: ['00:00:00', getValidationRemark('time', 123, '00:00:00')],
  });

  assert({
    given: 'special default value',
    should: 'return the special default value',
    actual: () => requiredTimeSchema('12:00:15')(undefined),
    expected: ['12:00:15', getValidationRemark('time', undefined, '12:00:15')],
  });
});

describe('requiredIsoDateTimeSchema()', () => {
  assert({
    given: 'a iso date time',
    should: 'return the value without validation remark',
    actual: () => requiredIsoDateTimeSchema()('2019-02-03T13:59:12'),
    expected: ['2019-02-03T13:59:12', undefined],
  });

  assert({
    given: 'a iso date time with time zone and milliseconds',
    should: 'return the value without validation remark',
    actual: () => requiredIsoDateTimeSchema()('2020-03-09T14:31:45.179Z'),
    expected: ['2020-03-09T14:31:45.179Z', undefined],
  });

  assert({
    given: 'undefined',
    should: 'return default value and validation remark',
    actual: () => requiredIsoDateTimeSchema()(undefined),
    expected: [
      '0001-01-01T00:00:00',
      getValidationRemark(
        'iso date time string',
        undefined,
        '0001-01-01T00:00:00'
      ),
    ],
  });

  assert({
    given: 'a string not in correct format',
    should: 'return default value and validation remark',
    actual: () => requiredIsoDateTimeSchema()('foo'),
    expected: [
      '0001-01-01T00:00:00',
      getValidationRemark('iso date time string', 'foo', '0001-01-01T00:00:00'),
    ],
  });

  assert({
    given: 'a iso date time which is not possible',
    should: 'return default value and validation remark',
    actual: () => requiredIsoDateTimeSchema()('2001-02-29T00:00:00'),
    expected: [
      '0001-01-01T00:00:00',
      getValidationRemark(
        'iso date time string',
        '2001-02-29T00:00:00',
        '0001-01-01T00:00:00'
      ),
    ],
  });

  assert({
    given: 'a number',
    should: 'return default value and validation remark',
    actual: () => requiredIsoDateTimeSchema()(123),
    expected: [
      '0001-01-01T00:00:00',
      getValidationRemark('iso date time string', 123, '0001-01-01T00:00:00'),
    ],
  });

  assert({
    given: 'special default value',
    should: 'return the special default value',
    actual: () => requiredIsoDateTimeSchema('2017-08-30T09:01:00')(undefined),
    expected: [
      '2017-08-30T09:01:00',
      getValidationRemark(
        'iso date time string',
        undefined,
        '2017-08-30T09:01:00'
      ),
    ],
  });
});

describe('optionalColorStringSchema()', () => {
  assert({
    given: 'a color string',
    should: 'return the value without validation remark',
    actual: () => optionalColorStringSchema()('#ff00AA'),
    expected: ['#ff00AA', undefined],
  });

  assert({
    given: 'undefined',
    should: 'return undefined without validation remark',
    actual: () => optionalColorStringSchema()(undefined),
    expected: [undefined, undefined],
  });

  assert({
    given: 'a string not in correct format',
    should: 'return the value without validation remark',
    actual: () => optionalColorStringSchema()('#f00AA'),
    expected: [
      undefined,
      getValidationRemark('color string', '#f00AA', undefined),
    ],
  });

  assert({
    given: 'a number',
    should: 'return undefined and validation remark',
    actual: () => optionalColorStringSchema()(123),
    expected: [undefined, getValidationRemark('color string', 123, undefined)],
  });
});

describe('requiredEnumSchema() with string enum', () => {
  enum TestEnum {
    A = 'A',
    B = 'B',
    C = 'C',
  }
  const type = 'enum (one of these values: [A, B, C])';
  assert({
    given: 'an enum',
    should: 'return the value without validation remark',
    actual: () => requiredEnumSchema(values(TestEnum))('B'),
    expected: [TestEnum.B, undefined],
  });

  assert({
    given: 'undefined',
    should: 'return default value and validation remark',
    actual: () => requiredEnumSchema(values(TestEnum))(undefined),
    expected: [TestEnum.A, getValidationRemark(type, undefined, 'A')],
  });

  assert({
    given: 'a string not matching an enum',
    should: 'return default value and validation remark',
    actual: () => requiredEnumSchema(values(TestEnum))('foo'),
    expected: [TestEnum.A, getValidationRemark(type, 'foo', 'A')],
  });

  assert({
    given: 'a number',
    should: 'return default value and validation remark',
    actual: () => requiredEnumSchema(values(TestEnum))(123),
    expected: [TestEnum.A, getValidationRemark(type, 123, 'A')],
  });

  assert({
    given: 'special default value',
    should: 'return the special default value',
    actual: () => requiredEnumSchema(values(TestEnum), TestEnum.C)(undefined),
    expected: [TestEnum.C, getValidationRemark(type, undefined, 'C')],
  });
});

describe('requiredEnumSchema() with number enum', () => {
  enum TestEnum {
    A = 0,
    B = 1,
    C = 2,
  }
  const enumValues = filter(
    (value) => typeof value === 'number',
    values(TestEnum)
  );
  const type = 'enum (one of these values: [0, 1, 2])';

  assert({
    given: 'an enum',
    should: 'return the value without validation remark',
    actual: () => requiredEnumSchema(enumValues)(1),
    expected: [TestEnum.B, undefined],
  });

  assert({
    given: 'undefined',
    should: 'return default value and validation remark',
    actual: () => requiredEnumSchema(enumValues)(undefined),
    expected: [TestEnum.A, getValidationRemark(type, undefined, 0)],
  });

  assert({
    given: 'a string not matching an enum',
    should: 'return default value and validation remark',
    actual: () => requiredEnumSchema(enumValues)('foo'),
    expected: [TestEnum.A, getValidationRemark(type, 'foo', 0)],
  });

  assert({
    given: 'a number',
    should: 'return default value and validation remark',
    actual: () => requiredEnumSchema(enumValues)(123),
    expected: [TestEnum.A, getValidationRemark(type, 123, 0)],
  });

  assert({
    given: 'special default value',
    should: 'return the special default value',
    actual: () => requiredEnumSchema(enumValues, TestEnum.C)(undefined),
    expected: [TestEnum.C, getValidationRemark(type, undefined, 2)],
  });
});

describe('staticValueSchema()', () => {
  const type = 'static value (foo)';

  assert({
    given: 'undefined',
    should: 'return the static value',
    actual: () => staticValueSchema('foo')(undefined),
    expected: ['foo', getValidationRemark(type, undefined, 'foo')],
  });

  assert({
    given: 'the static value',
    should: 'return the static value',
    actual: () => staticValueSchema('foo')('foo'),
    expected: ['foo', undefined],
  });
});

describe('addStaticValueSchema()', () => {
  assert({
    given: 'undefined',
    should: 'return the static value',
    actual: () => addStaticValueSchema('foo')(undefined),
    expected: ['foo', undefined],
  });

  assert({
    given: 'the static value',
    should: 'return the static value',
    actual: () => addStaticValueSchema('foo')('foo'),
    expected: ['foo', undefined],
  });
});

describe('noTransformationSchema()', () => {
  assert({
    given: 'undefined',
    should: 'return the given value',
    actual: () => noTransformationSchema(undefined),
    expected: [undefined, undefined],
  });

  assert({
    given: 'a string',
    should: 'return the given value',
    actual: () => noTransformationSchema('foo'),
    expected: ['foo', undefined],
  });

  assert({
    given: 'a object',
    should: 'return the given value',
    actual: () => noTransformationSchema({}),
    expected: [{}, undefined],
  });
});
