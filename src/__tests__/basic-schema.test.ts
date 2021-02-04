import {
  optionalStringSchema,
  requiredNumberSchema,
  requiredStringSchema,
  transformWithSchema,
} from '..';
import { getValidationRemark } from '../helper';
import { objectValidationRemarkKey } from '../types';
import { assert } from '../utils';

describe('transformWithSchema() with basic schemas', () => {
  assert({
    given: 'receives undefined',
    should: 'create object',
    actual: () => transformWithSchema({}, undefined),
    expected: [
      {},
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
    given: 'receives undefined',
    should: 'create array',
    actual: () => transformWithSchema([requiredStringSchema()], undefined),
    expected: [[], getValidationRemark('array', undefined, [])],
  });

  assert({
    given: 'receives array of strings',
    should: 'do nothing',
    actual: () =>
      transformWithSchema([requiredStringSchema()], ['a', 'b', 'c']),
    expected: [['a', 'b', 'c'], {}],
  });

  assert({
    given: 'expects property with object literal and receives empty object',
    should: 'add object literal',
    actual: () =>
      transformWithSchema(
        {
          prop: {},
        },
        {}
      ),
    expected: [
      { prop: {} },
      {
        prop: {
          [objectValidationRemarkKey]: getValidationRemark(
            'object',
            undefined,
            {}
          ),
        },
      },
    ],
  });

  assert({
    given:
      'expects property with object literal and receives object with string property',
    should: 'add object literal',
    actual: () =>
      transformWithSchema(
        {
          prop: {},
        },
        { prop: 'foo' }
      ),
    expected: [
      { prop: {} },
      {
        prop: {
          [objectValidationRemarkKey]: getValidationRemark('object', 'foo', {}),
        },
      },
    ],
  });

  assert({
    given:
      'expects property with object literal and receives object with array property',
    should: 'add object literal',
    actual: () =>
      transformWithSchema(
        {
          prop: {},
        },
        { prop: [] }
      ),
    expected: [
      { prop: {} },
      {
        prop: {
          [objectValidationRemarkKey]: getValidationRemark('object', [], {}),
        },
      },
    ],
  });

  assert({
    given: 'expects property with array and receives empty object',
    should: 'add array',
    actual: () =>
      transformWithSchema(
        {
          prop: [{}],
        },
        {}
      ),
    expected: [
      { prop: [] },
      { prop: getValidationRemark('array', undefined, []) },
    ],
  });

  assert({
    given:
      'expects property with array and receives object with string property',
    should: 'add array',
    actual: () =>
      transformWithSchema(
        {
          prop: [{}],
        },
        { prop: 'foo' }
      ),
    expected: [{ prop: [] }, { prop: getValidationRemark('array', 'foo', []) }],
  });

  assert({
    given:
      'expects property with array and receives object with object property',
    should: 'add array',
    actual: () =>
      transformWithSchema(
        {
          prop: [{}],
        },
        { prop: {} }
      ),
    expected: [{ prop: [] }, { prop: getValidationRemark('array', {}, []) }],
  });

  assert({
    given: 'expects array of objects',
    should: 'transform every object in array',
    actual: () =>
      transformWithSchema(
        {
          entries: [
            {
              id: requiredNumberSchema(999),
              name: requiredStringSchema(),
              note: optionalStringSchema(),
            },
          ],
        },
        {
          entries: [
            {
              id: 123,
              name: 'Name 1',
              note: 'Note 1',
            },
            {
              id: 'wrong data type',
              name: null,
              note: null,
            },
            {},
          ],
        }
      ),
    expected: [
      {
        entries: [
          {
            id: 123,
            name: 'Name 1',
            note: 'Note 1',
          },
          {
            id: 999,
            name: '',
            note: undefined,
          },
          {
            id: 999,
            name: '',
            note: undefined,
          },
        ],
      },
      {
        entries: {
          '[1]': {
            id: getValidationRemark('number', 'wrong data type', 999),
            name: getValidationRemark('string', null, ''),
          },
          '[2]': {
            id: getValidationRemark('number', undefined, 999),
            name: getValidationRemark('string', undefined, ''),
          },
        },
      },
    ],
  });

  assert({
    given: 'receives object with unknown property',
    should: 'remove unknown property',
    actual: () =>
      transformWithSchema(
        {
          prop: requiredStringSchema(),
        },
        { prop: 'bar', otherProp: 'foo' }
      ),
    expected: [{ prop: 'bar' }, {}],
  });

  assert({
    given: 'expects deeply nested object',
    should: 'create the structure',
    actual: () =>
      transformWithSchema(
        {
          level1: [
            {
              level2: {
                level3: [
                  {
                    id: requiredStringSchema(),
                  },
                ],
              },
            },
          ],
        },
        {
          level1: [
            {},
            { level2: { level3: null } },
            { level2: { level3: [{ id: 123 }, { id: 'bar' }] } },
          ],
        }
      ),
    expected: [
      {
        level1: [
          { level2: { level3: [] } },
          { level2: { level3: [] } },
          { level2: { level3: [{ id: '' }, { id: 'bar' }] } },
        ],
      },
      {
        level1: {
          '[0]': {
            level2: {
              [objectValidationRemarkKey]: getValidationRemark(
                'object',
                undefined,
                {}
              ),
              level3: getValidationRemark('array', undefined, []),
            },
          },
          '[1]': {
            level2: {
              level3: getValidationRemark('array', null, []),
            },
          },
          '[2]': {
            level2: {
              level3: {
                '[0]': {
                  id: getValidationRemark('string', 123, ''),
                },
              },
            },
          },
        },
      },
    ],
  });

  assert({
    given: 'expects array of primitive types',
    should: 'transform each value',
    actual: () =>
      transformWithSchema(
        {
          prop: [requiredStringSchema()],
        },
        { prop: ['foo', 'bar', false, {}, 'hello'] }
      ),
    expected: [
      { prop: ['foo', 'bar', '', '', 'hello'] },
      {
        prop: {
          '[2]': getValidationRemark('string', false, ''),
          '[3]': getValidationRemark('string', {}, ''),
        },
      },
    ],
  });

  assert({
    given: 'expects array of primitive types but receives a boolean',
    should: 'return empty array',
    actual: () =>
      transformWithSchema(
        {
          prop: [requiredStringSchema()],
        },
        { prop: false }
      ),
    expected: [
      { prop: [] },
      {
        prop: getValidationRemark('array', false, []),
      },
    ],
  });
});
