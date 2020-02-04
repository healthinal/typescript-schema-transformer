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
      given: 'example 1',
      should: 'should be correct',
      actual: () => transformWithSchema(valarSchema, { name: 'Varda' })[0],
      expected: {
        type: AinurType.VALAR,
        name: 'Varda',
        domain: undefined,
        isFemale: true,
      },
    });
  }
});
