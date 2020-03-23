import { values } from 'ramda';

import {
  createUnionTypeTransformationSchema,
  noTransformationSchema,
  optionalColorStringSchema,
  requiredBooleanSchema,
  requiredEnumSchema,
  requiredNumberSchema,
  requiredStringSchema,
  staticValueSchema,
  transformWithSchema,
  ObjectTransformationSchema,
  UnionType2,
  UnionType3,
  UnionType4,
  UnionType5,
} from '..';
import { getValidationRemark } from '../helper';
import { assert } from '../utils';

describe('transformWithSchema() with schemas containing union types', () => {
  assert({
    given: 'expects array of strings and numbers but receives different values',
    should: 'return array containing only strings and numbers',
    actual: () =>
      transformWithSchema(
        {
          prop: [
            createUnionTypeTransformationSchema<any, string, number>(
              noTransformationSchema,
              (base) =>
                typeof base === 'string'
                  ? requiredStringSchema()
                  : requiredNumberSchema()
            ),
          ],
        } as ObjectTransformationSchema<{ prop: UnionType2<string, number>[] }>,
        { prop: ['foo', false, 5, undefined] }
      ),
    expected: [
      { prop: ['foo', 0, 5, 0] },
      {
        prop: {
          '[1]': getValidationRemark('number', false, 0),
          '[3]': getValidationRemark('number', undefined, 0),
        },
      },
    ],
  });

  {
    const schema: ObjectTransformationSchema<{
      prop: UnionType2<string, boolean>;
    }> = {
      prop: createUnionTypeTransformationSchema<any, string, boolean>(
        noTransformationSchema,
        (base) =>
          typeof base === 'string'
            ? requiredStringSchema()
            : requiredBooleanSchema(true)
      ),
    };

    assert({
      given: 'expects string or boolean and receives boolean',
      should: 'return boolean',
      actual: () => transformWithSchema(schema, { prop: false }),
      expected: [{ prop: false }, {}],
    });

    assert({
      given: 'expects string or boolean and receives string',
      should: 'return string',
      actual: () => transformWithSchema(schema, { prop: 'foo' }),
      expected: [{ prop: 'foo' }, {}],
    });

    assert({
      given: 'expects string or boolean and receives number',
      should: 'return boolean',
      actual: () => transformWithSchema(schema, { prop: 4 }),
      expected: [
        { prop: true },
        {
          prop: getValidationRemark('boolean', 4, true),
        },
      ],
    });
  }

  {
    type Color = { red: number; green: number; blue: number };
    const schema: ObjectTransformationSchema<{
      prop: UnionType2<string | undefined, Color>;
    }> = {
      prop: createUnionTypeTransformationSchema<any, string | undefined, Color>(
        noTransformationSchema,
        (base) =>
          typeof base === 'object'
            ? {
                red: requiredNumberSchema(),
                green: requiredNumberSchema(),
                blue: requiredNumberSchema(),
              }
            : optionalColorStringSchema()
      ),
    };

    assert({
      given: 'expects color string or color object and receives color string',
      should: 'return color string',
      actual: () => transformWithSchema(schema, { prop: '#ff00ff' }),
      expected: [{ prop: '#ff00ff' }, {}],
    });

    assert({
      given: 'expects color string or color object and receives color object',
      should: 'return color object',
      actual: () =>
        transformWithSchema(schema, {
          prop: {
            red: 123,
            green: 89,
            blue: 12,
          },
        }),
      expected: [
        {
          prop: {
            red: 123,
            green: 89,
            blue: 12,
          },
        },
        {},
      ],
    });

    assert({
      given: 'expects color string or color object and receives boolean',
      should: 'return undefined',
      actual: () => transformWithSchema(schema, { prop: false }),
      expected: [
        { prop: undefined },
        {
          prop: getValidationRemark('color string', false, undefined),
        },
      ],
    });

    assert({
      given: 'expects color string or color object and receives undefined',
      should: 'return undefined',
      actual: () => transformWithSchema(schema, {}),
      expected: [{ prop: undefined }, {}],
    });

    assert({
      given:
        'expects color string or color object and receives invalid color string',
      should: 'return undefined',
      actual: () => transformWithSchema(schema, { prop: '#uie123' }),
      expected: [
        { prop: undefined },
        {
          prop: getValidationRemark('color string', '#uie123', undefined),
        },
      ],
    });

    assert({
      given:
        'expects color string or color object and receives invalid color object',
      should: 'return fixed color object',
      actual: () =>
        transformWithSchema(schema, {
          prop: {
            red: '123',
            blue: 12,
          },
        }),
      expected: [
        {
          prop: {
            red: 0,
            green: 0,
            blue: 12,
          },
        },
        {
          prop: {
            red: getValidationRemark('number', '123', 0),
            green: getValidationRemark('number', undefined, 0),
          },
        },
      ],
    });
  }

  {
    enum BaseType {
      A,
      B,
      C,
      D,
      E,
    }

    type Base = { type: BaseType };
    type A = { type: BaseType.A; a: string };
    type B = { type: BaseType.B; b: number };
    type C = { type: BaseType.C; c: boolean };
    type D = { type: BaseType.D; d: string[] };
    type E = { type: BaseType.E; e: { name: string } };

    const baseSchema: ObjectTransformationSchema<Base> = {
      type: requiredEnumSchema(values(BaseType)),
    };
    const aSchema: ObjectTransformationSchema<A> = {
      type: staticValueSchema(BaseType.A),
      a: requiredStringSchema(),
    };
    const bSchema: ObjectTransformationSchema<B> = {
      type: staticValueSchema(BaseType.B),
      b: requiredNumberSchema(),
    };
    const cSchema: ObjectTransformationSchema<C> = {
      type: staticValueSchema(BaseType.C),
      c: requiredBooleanSchema(),
    };
    const dSchema: ObjectTransformationSchema<D> = {
      type: staticValueSchema(BaseType.D),
      d: [requiredStringSchema()],
    };
    const eSchema: ObjectTransformationSchema<E> = {
      type: staticValueSchema(BaseType.E),
      e: { name: requiredStringSchema() },
    };

    const schema: ObjectTransformationSchema<{
      ab: UnionType2<A, B>;
      abc: UnionType3<A, B, C>;
      abcd: UnionType4<A, B, C, D>;
      abcde: UnionType5<A, B, C, D, E>;
    }> = {
      ab: createUnionTypeTransformationSchema<Base, A, B>(baseSchema, (base) =>
        base.type === BaseType.A ? aSchema : bSchema
      ),
      abc: createUnionTypeTransformationSchema<Base, A, B, C>(
        baseSchema,
        (base) =>
          base.type === BaseType.A
            ? aSchema
            : base.type === BaseType.B
            ? bSchema
            : cSchema
      ),
      abcd: createUnionTypeTransformationSchema<Base, A, B, C, D>(
        baseSchema,
        (base) =>
          base.type === BaseType.A
            ? aSchema
            : base.type === BaseType.B
            ? bSchema
            : base.type === BaseType.C
            ? cSchema
            : dSchema
      ),
      abcde: createUnionTypeTransformationSchema<Base, A, B, C, D, E>(
        baseSchema,
        (base) =>
          base.type === BaseType.A
            ? aSchema
            : base.type === BaseType.B
            ? bSchema
            : base.type === BaseType.C
            ? cSchema
            : base.type === BaseType.D
            ? dSchema
            : eSchema
      ),
    };

    assert({
      given: 'objects of type A',
      should: 'return the objects of type A',
      actual: () =>
        transformWithSchema(schema, {
          ab: { type: BaseType.A, a: 'test' },
          abc: { type: BaseType.A, a: 'test' },
          abcd: { type: BaseType.A, a: 'test' },
          abcde: { type: BaseType.A, a: 'test' },
        }),
      expected: [
        {
          ab: { type: BaseType.A, a: 'test' },
          abc: { type: BaseType.A, a: 'test' },
          abcd: { type: BaseType.A, a: 'test' },
          abcde: { type: BaseType.A, a: 'test' },
        },
        {},
      ],
    });

    assert({
      given: 'objects of type B',
      should: 'return the objects of type B',
      actual: () =>
        transformWithSchema(schema, {
          ab: { type: BaseType.B, b: 3 },
          abc: { type: BaseType.B, b: 3 },
          abcd: { type: BaseType.B, b: 3 },
          abcde: { type: BaseType.B, b: 3 },
        }),
      expected: [
        {
          ab: { type: BaseType.B, b: 3 },
          abc: { type: BaseType.B, b: 3 },
          abcd: { type: BaseType.B, b: 3 },
          abcde: { type: BaseType.B, b: 3 },
        },
        {},
      ],
    });

    assert({
      given: 'objects of type C',
      should: 'return the objects of type C except for ab',
      actual: () =>
        transformWithSchema(schema, {
          ab: { type: BaseType.C, c: true },
          abc: { type: BaseType.C, c: true },
          abcd: { type: BaseType.C, c: true },
          abcde: { type: BaseType.C, c: true },
        }),
      expected: [
        {
          ab: { type: BaseType.B, b: 0 },
          abc: { type: BaseType.C, c: true },
          abcd: { type: BaseType.C, c: true },
          abcde: { type: BaseType.C, c: true },
        },
        {
          ab: {
            type: getValidationRemark(
              `static value (${BaseType.B})`,
              BaseType.C,
              BaseType.B
            ),
            b: getValidationRemark('number', undefined, 0),
          },
        },
      ],
    });

    assert({
      given: 'objects of type D',
      should: 'return the objects of type D except for ab, abc',
      actual: () =>
        transformWithSchema(schema, {
          ab: { type: BaseType.D, d: ['hello'] },
          abc: { type: BaseType.D, d: ['hello'] },
          abcd: { type: BaseType.D, d: ['hello'] },
          abcde: { type: BaseType.D, d: ['hello'] },
        }),
      expected: [
        {
          ab: { type: BaseType.B, b: 0 },
          abc: { type: BaseType.C, c: false },
          abcd: { type: BaseType.D, d: ['hello'] },
          abcde: { type: BaseType.D, d: ['hello'] },
        },
        {
          ab: {
            type: getValidationRemark(
              `static value (${BaseType.B})`,
              BaseType.D,
              BaseType.B
            ),
            b: getValidationRemark('number', undefined, 0),
          },
          abc: {
            type: getValidationRemark(
              `static value (${BaseType.C})`,
              BaseType.D,
              BaseType.C
            ),
            c: getValidationRemark('boolean', undefined, false),
          },
        },
      ],
    });

    assert({
      given: 'objects of type E',
      should: 'return the objects of type E except for ab, abc, abcd',
      actual: () =>
        transformWithSchema(schema, {
          ab: { type: BaseType.E, e: { name: 'foo' } },
          abc: { type: BaseType.E, e: { name: 'foo' } },
          abcd: { type: BaseType.E, e: { name: 'foo' } },
          abcde: { type: BaseType.E, e: { name: 'foo' } },
        }),
      expected: [
        {
          ab: { type: BaseType.B, b: 0 },
          abc: { type: BaseType.C, c: false },
          abcd: { type: BaseType.D, d: [] },
          abcde: { type: BaseType.E, e: { name: 'foo' } },
        },
        {
          ab: {
            type: getValidationRemark(
              `static value (${BaseType.B})`,
              BaseType.E,
              BaseType.B
            ),
            b: getValidationRemark('number', undefined, 0),
          },
          abc: {
            type: getValidationRemark(
              `static value (${BaseType.C})`,
              BaseType.E,
              BaseType.C
            ),
            c: getValidationRemark('boolean', undefined, false),
          },
          abcd: {
            type: getValidationRemark(
              `static value (${BaseType.D})`,
              BaseType.E,
              BaseType.D
            ),
            d: getValidationRemark('array', undefined, []),
          },
        },
      ],
    });
  }
});
