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
    a: { a1: { a2: string; a3: number } } | undefined;
    b: string[] | undefined;
    c: UnionType2<string, { c1: number }> | undefined;
    d: string | undefined;
    e: string | undefined;
    f: { f1: { f2: number } }[] | undefined;
  };

  const schema: ObjectTransformationSchema<TypeWithOptionalAttributes> = {
    a: optionalSchema({
      a1: { a2: requiredStringSchema(), a3: requiredNumberSchema() },
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
    f: optionalSchema([{ f1: { f2: requiredNumberSchema() } }]),
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
        f: undefined,
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
        f: null,
      }),
    expected: [
      {
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        e: undefined,
        f: undefined,
      },
      {},
    ],
  });

  assert({
    given: 'receives valid values',
    should: 'not transform anything',
    actual: () =>
      transformWithSchema(schema, {
        a: { a1: { a2: 'a2', a3: 3 } },
        b: ['b1', 'b2'],
        c: { c1: 123 },
        d: 'd',
        e: 'e',
        f: [{ f1: { f2: 1 } }, { f1: { f2: 2 } }],
      }),
    expected: [
      {
        a: { a1: { a2: 'a2', a3: 3 } },
        b: ['b1', 'b2'],
        c: { c1: 123 },
        d: 'd',
        e: 'e',
        f: [{ f1: { f2: 1 } }, { f1: { f2: 2 } }],
      },
      {},
    ],
  });
});
