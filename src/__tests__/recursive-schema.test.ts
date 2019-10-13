import {
  createUnionTypeTransformationSchema,
  noTransformationSchema,
  requiredStringSchema,
  staticValueSchema,
  transformWithSchema,
  ObjectTransformationSchema,
  UnionType2,
} from '..';
import { getValidationRemark } from '../helper';
import { objectValidationRemarkKey } from '../types';
import { assert } from '../utils';

describe('transformWithSchema() with recursive schemas', () => {
  {
    type File = { name: string };
    type Directory = { name: string; files: File[]; directories: Directory[] };
    const schema: ObjectTransformationSchema<Directory> = {
      name: requiredStringSchema(),
      files: [
        {
          name: requiredStringSchema(),
        },
      ],
      directories: [] as any,
    };
    schema.directories = [schema];

    assert({
      given: 'a recursive structure with arrays',
      should: 'validate on every level',
      actual: () =>
        transformWithSchema(schema, {
          name: 'd1',
          files: [{ name: 'f1' }, { name: 0 }],
          directories: [
            {
              name: 'd1.1',
              files: [{ name: 'f1' }, { name: 'f2' }],
              directories: [],
            },
            {
              name: 'd1.2',
              files: [{ name: 'f1' }, { name: 0 }],
              directories: [
                {
                  name: 'd1.2.1',
                  files: [{ name: 'f1' }, { name: 0 }],
                  directories: [],
                },
              ],
            },
          ],
        }),
      expected: [
        {
          name: 'd1',
          files: [{ name: 'f1' }, { name: '' }],
          directories: [
            {
              name: 'd1.1',
              files: [{ name: 'f1' }, { name: 'f2' }],
              directories: [],
            },
            {
              name: 'd1.2',
              files: [{ name: 'f1' }, { name: '' }],
              directories: [
                {
                  name: 'd1.2.1',
                  files: [{ name: 'f1' }, { name: '' }],
                  directories: [],
                },
              ],
            },
          ],
        },
        {
          files: {
            '[1]': {
              name: getValidationRemark('string', 0, ''),
            },
          },
          directories: {
            '[1]': {
              files: {
                '[1]': {
                  name: getValidationRemark('string', 0, ''),
                },
              },
              directories: {
                '[0]': {
                  files: {
                    '[1]': {
                      name: getValidationRemark('string', 0, ''),
                    },
                  },
                },
              },
            },
          },
        },
      ],
    });
  }

  {
    type LinkedListItem = {
      value: string;
      next: UnionType2<undefined, LinkedListItem>;
    };
    const schema: ObjectTransformationSchema<LinkedListItem> = {
      value: requiredStringSchema(),
      next: undefined as any,
    };
    schema.next = createUnionTypeTransformationSchema<
      any,
      undefined,
      LinkedListItem
    >(noTransformationSchema, base =>
      typeof base === 'object' ? schema : staticValueSchema(undefined)
    );

    assert({
      given: 'a recursive structure with object references',
      should: 'validate on every level',
      actual: () =>
        transformWithSchema(schema, {
          value: 0,
          next: {
            value: 1,
            next: {
              value: 2,
              next: {
                value: 3,
                next: [],
              },
            },
          },
        }),
      expected: [
        {
          value: '',
          next: {
            value: '',
            next: {
              value: '',
              next: {
                value: '',
                next: {
                  value: '',
                  next: undefined,
                },
              },
            },
          },
        },
        {
          value: getValidationRemark('string', 0, ''),
          next: {
            value: getValidationRemark('string', 1, ''),
            next: {
              value: getValidationRemark('string', 2, ''),
              next: {
                value: getValidationRemark('string', 3, ''),
                next: {
                  [objectValidationRemarkKey]: getValidationRemark(
                    'object',
                    [],
                    {}
                  ),
                  value: getValidationRemark('string', undefined, ''),
                },
              },
            },
          },
        },
      ],
    });
  }
});
