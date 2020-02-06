import {
  addStaticValueSchema,
  createUnionTypeTransformationSchema,
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
  transformWithSchema,
  DeepWithoutUnionTypes,
  ObjectTransformationSchema,
  UnionType2,
} from '..';
import { assert } from '../utils';

const values = <T extends object, K extends keyof T>(obj: T): T[K][] =>
  Object.keys(obj).map(k => (obj as any)[k]);

describe('examples', () => {
  {
    type SomeTypeSchemaDefinition = {
      readonly title: UnionType2<string, false>;
    };
    type SomeType = DeepWithoutUnionTypes<SomeTypeSchemaDefinition>;

    const schema: ObjectTransformationSchema<SomeTypeSchemaDefinition> = {
      title: createUnionTypeTransformationSchema<any, string, false>(
        noTransformationSchema,
        base =>
          typeof base === 'string'
            ? requiredStringSchema()
            : staticValueSchema(false)
      ),
    };

    const transformSomeType = (input: unknown): SomeType =>
      transformWithSchema(schema, input)[0];

    assert({
      given: 'example 1 union transformation',
      should: 'be correct',
      actual: () =>
        transformSomeType({
          title: 'foo',
        }),
      expected: {
        title: 'foo',
      },
    });

    assert({
      given: 'example 2 union transformation',
      should: 'be correct',
      actual: () =>
        transformSomeType({
          title: false,
        }),
      expected: {
        title: false,
      },
    });

    assert({
      given: 'example 3 union transformation',
      should: 'be correct',
      actual: () => transformSomeType({}),
      expected: {
        title: false,
      },
    });

    assert({
      given: 'example 4 union transformation',
      should: 'be correct',
      actual: () =>
        transformSomeType({
          title: true,
        }),
      expected: {
        title: false,
      },
    });
  }

  {
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

    assert({
      given: 'preview example',
      should: 'be correct',
      actual: () => transformWithSchema(valarSchema, { name: 'Varda' })[0],
      expected: {
        type: AinurType.VALAR,
        name: 'Varda',
        domain: undefined,
        isFemale: true,
      },
    });

    assert({
      given: 'example 1',
      should: 'be correct',
      actual: () =>
        transformWithSchema(valarSchema, {
          type: 'VALAR',
          name: 'Varda',
          domain: 'Stars',
          isFemale: true,
        })[0],
      expected: {
        type: 'VALAR' as any,
        name: 'Varda',
        domain: 'Stars',
        isFemale: true,
      },
    });

    assert({
      given: 'example 2',
      should: 'be correct',
      actual: () =>
        transformWithSchema(valarSchema, {
          name: 'Varda',
          domain: null,
          isFemale: true,
        })[0],
      expected: {
        type: 'VALAR' as any,
        name: 'Varda',
        domain: undefined,
        isFemale: true,
      },
    });

    assert({
      given: 'example 3',
      should: 'be correct',
      actual: () => transformWithSchema(valarSchema, {})[0],
      expected: {
        type: 'VALAR' as any,
        name: '',
        domain: undefined,
        isFemale: true,
      },
    });

    assert({
      given: 'example 4',
      should: 'be correct',
      actual: () =>
        transformWithSchema(valarSchema, {
          type: 'MAIAR',
          name: 123,
          domain: null,
          isFemale: false,
        })[0],
      expected: {
        type: 'VALAR' as any,
        name: '',
        domain: undefined,
        isFemale: false,
      },
    });
  }

  {
    type Maiar = {
      readonly name: string;
      readonly enemies: readonly string[];
      readonly friends: readonly (string | undefined)[];
      readonly rings: readonly {
        readonly name: string;
        readonly gem?: string;
      }[];
    };

    const maiarSchema: ObjectTransformationSchema<Maiar> = {
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

    assert({
      given: 'example 5',
      should: 'be correct',
      actual: () =>
        transformWithSchema(maiarSchema, {
          name: 'Gandalf',
          enemies: ['Sauron', 'Saruman'],
          friends: ['Frodo', undefined, null, 'Aragorn'],
          rings: [
            {
              name: 'Narya',
              gem: 'Ruby',
            },
          ],
        })[0],
      expected: {
        name: 'Gandalf',
        enemies: ['Sauron', 'Saruman'],
        friends: ['Frodo', undefined, undefined, 'Aragorn'],
        rings: [
          {
            name: 'Narya',
            gem: 'Ruby',
          },
        ],
      },
    });

    assert({
      given: 'example 6',
      should: 'be correct',
      actual: () =>
        transformWithSchema(maiarSchema, {
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
        })[0],
      expected: {
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
      },
    });
  }

  {
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

    assert({
      given: 'example 7',
      should: 'be correct',
      actual: () =>
        transformWithSchema(schema, {
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
        })[0],
      expected: {
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
      },
    });

    assert({
      given: 'example 8',
      should: 'be correct',
      actual: () =>
        transformWithSchema(schema, {
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
        })[0],
      expected: {
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
      },
    });

    assert({
      given: 'example 9',
      should: 'be correct',
      actual: () => transformWithSchema(schema, {})[0],
      expected: {
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
      },
    });
  }

  assert({
    given: 'example 10',
    should: 'be correct',
    actual: () =>
      transformWithSchema(
        {
          a: requiredStringSchema('default'),
          b: requiredNumberSchema(42),
          c: requiredBooleanSchema(true),
          d: requiredDateSchema('2019-01-01'),
          e: requiredTimeSchema('14:00:00'),
          f: requiredIsoDateTimeSchema('2019-01-01T14:00:00'),
        },
        {}
      )[0],
    expected: {
      a: 'default',
      b: 42,
      c: true,
      d: '2019-01-01',
      e: '14:00:00',
      f: '2019-01-01T14:00:00',
    },
  });

  {
    enum ElfType {
      VANYAR = 'VANYAR',
      NOLDOR = 'NOLDOR',
      TELERI = 'TELERI',
    }

    const schema = {
      name: requiredStringSchema(),
      type: requiredEnumSchema(values(ElfType)),
    };

    assert({
      given: 'example 11',
      should: 'be correct',
      actual: () =>
        transformWithSchema(schema, {
          name: 'Galadriel',
          type: ElfType.NOLDOR,
        })[0],
      expected: {
        name: 'Galadriel',
        type: ElfType.NOLDOR,
      },
    });

    assert({
      given: 'example 12',
      should: 'be correct',
      actual: () =>
        transformWithSchema(schema, {
          name: 'Ingwe',
        })[0],
      expected: {
        name: 'Ingwe',
        type: ElfType.VANYAR,
      },
    });

    assert({
      given: 'example 13',
      should: 'be correct',
      actual: () =>
        transformWithSchema(
          {
            name: requiredStringSchema(),
            type: requiredEnumSchema(values(ElfType), ElfType.TELERI),
          },
          {
            name: 'Elwe',
            type: 'ELVISH',
          }
        )[0],
      expected: {
        name: 'Elwe',
        type: ElfType.TELERI,
      },
    });
  }

  {
    const schema = {
      a: staticValueSchema(true),
      b: addStaticValueSchema(true),
    };

    assert({
      given: 'example 14',
      should: 'be correct',
      actual: () => transformWithSchema(schema, {})[0],
      expected: {
        a: true,
        b: true,
      },
    });

    assert({
      given: 'example 15',
      should: 'be correct',
      actual: () =>
        transformWithSchema(schema, {
          a: true,
        })[0],
      expected: {
        a: true,
        b: true,
      },
    });

    assert({
      given: 'example 16',
      should: 'be correct',
      actual: () =>
        transformWithSchema(schema, {
          a: false,
          b: false,
        })[0],
      expected: {
        a: true,
        b: true,
      },
    });
  }

  {
    enum AinurType {
      VALAR = 'VALAR',
      MAIAR = 'MAIAR',
    }

    type Ainur = {
      readonly type: AinurType;
      readonly name: string;
    };

    type Valar = Ainur & {
      readonly type: AinurType.VALAR;
      readonly domain: string;
    };

    type Maiar = Ainur & {
      readonly type: AinurType.MAIAR;
      readonly hasRing: boolean;
    };

    type World = {
      readonly name: string;
      readonly ainur: readonly UnionType2<Valar, Maiar>[];
    };

    const ainurSchema: ObjectTransformationSchema<Ainur> = {
      type: requiredEnumSchema(values(AinurType)),
      name: requiredStringSchema(),
    };

    const valarSchema: ObjectTransformationSchema<Valar> = {
      ...ainurSchema,
      type: addStaticValueSchema(AinurType.VALAR),
      domain: requiredStringSchema(),
    };

    const maiarSchema: ObjectTransformationSchema<Maiar> = {
      ...ainurSchema,
      type: addStaticValueSchema(AinurType.MAIAR),
      hasRing: requiredBooleanSchema(),
    };

    const worldSchema: ObjectTransformationSchema<World> = {
      name: requiredStringSchema(),
      ainur: [
        createUnionTypeTransformationSchema<Ainur, Valar, Maiar>(
          ainurSchema,
          ({ type }) => (type === AinurType.VALAR ? valarSchema : maiarSchema)
        ),
      ],
    };

    assert({
      given: 'example 17',
      should: 'be correct',
      actual: () =>
        transformWithSchema(worldSchema, {
          name: 'Arda',
          ainur: [
            {
              type: AinurType.VALAR,
              name: 'Varda',
              domain: 'Stars',
            },
            {
              type: AinurType.MAIAR,
              name: 'Gandalf',
              hasRing: true,
            },
            {
              name: 'Ulmo',
              domain: 'Sea',
            },
            {
              type: AinurType.MAIAR,
              name: 'Melian',
            },
          ],
        })[0],
      expected: {
        name: 'Arda',
        ainur: [
          {
            type: AinurType.VALAR,
            name: 'Varda',
            domain: 'Stars',
          },
          {
            type: AinurType.MAIAR,
            name: 'Gandalf',
            hasRing: true,
          },
          {
            type: AinurType.VALAR,
            name: 'Ulmo',
            domain: 'Sea',
          },
          {
            type: AinurType.MAIAR,
            name: 'Melian',
            hasRing: false,
          },
        ],
      },
    });
  }
});
