import {
  createUnionTypeTransformationSchema,
  noTransformationSchema,
  optionalSchema,
  optionalStringSchema,
  requiredNumberSchema,
  requiredStringSchema,
  transformWithSchema,
  ObjectTransformationSchema,
  UnionType2,
} from '..';
import { getValidationRemark } from '../helper';
import { objectValidationRemarkKey } from '../types';
import { assert } from '../utils';

describe('transformWithSchema() with optional schemas', () => {
  type TypeWithOptionalAttributes = {
    a: { a1: string } | undefined;
    b: string[] | undefined;
    c: UnionType2<string, { c1: number }> | undefined;
    d: string | undefined;
    e: string | undefined;
  };

  const schema: ObjectTransformationSchema<TypeWithOptionalAttributes> = {
    a: optionalSchema({
      a1: requiredStringSchema(),
    }),
    b: optionalSchema([requiredStringSchema()]),
    c: optionalSchema(
      createUnionTypeTransformationSchema<any, string, { c1: number }>(
        noTransformationSchema,
        (x) =>
          typeof x === 'string'
            ? requiredStringSchema()
            : { c1: requiredNumberSchema() }
      )
    ),
    d: optionalSchema(requiredStringSchema()),
    e: optionalStringSchema(),
  };

  assert({
    given: 'receives undefined',
    should: 'create object',
    actual: () => transformWithSchema(schema, undefined),
    expected: [
      {
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        e: undefined,
      },
      {
        [objectValidationRemarkKey]: getValidationRemark(
          'object',
          undefined,
          {}
        ),
      },
    ],
  });

  assert({
    given: 'receives null values',
    should: 'transform to undefined without warning',
    actual: () =>
      transformWithSchema(schema, {
        a: null,
        b: null,
        c: null,
        d: null,
        e: null,
      }),
    expected: [
      {
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        e: undefined,
      },
      {},
    ],
  });

  assert({
    given: 'receives valid values',
    should: 'not transform anything',
    actual: () =>
      transformWithSchema(schema, {
        a: { a1: 'a1' },
        b: ['b1', 'b2'],
        c: { c1: 123 },
        d: 'd',
        e: 'e',
      }),
    expected: [
      {
        a: { a1: 'a1' },
        b: ['b1', 'b2'],
        c: { c1: 123 },
        d: 'd',
        e: 'e',
      },
      {},
    ],
  });
});
