import {
  addStaticValueSchema,
  optionalStringSchema,
  requiredBooleanSchema,
  requiredStringSchema,
  transformWithSchema,
  ObjectTransformationSchema,
} from '..';
import { assert } from '../utils';

describe('examples', () => {
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
});
