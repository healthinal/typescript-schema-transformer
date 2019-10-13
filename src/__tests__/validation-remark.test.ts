import { objectValidationRemarkKey } from '../types';
import { assert } from '../utils';
import {
  logWarningIfValidationRemarksArePresent,
  validationRemarksToStrings,
} from '../validation-remark';

describe('validationRemarksToStrings()', () => {
  assert({
    given: 'no validation remarks',
    should: 'return empty array',
    actual: () => validationRemarksToStrings({}),
    expected: [],
  });

  assert({
    given: 'single object remark',
    should: 'return message with name of object',
    actual: () =>
      validationRemarksToStrings({
        property1: {
          [objectValidationRemarkKey]: 'foo',
        },
      }),
    expected: ['property1: foo'],
  });

  assert({
    given: 'object with remark for itself and a property',
    should: 'return message with name of object and one for property',
    actual: () =>
      validationRemarksToStrings({
        property1: {
          [objectValidationRemarkKey]: 'foo',
          subProp: 'bar',
        },
      }),
    expected: ['property1: foo', 'property1.subProp: bar'],
  });

  assert({
    given: 'property containing an array',
    should: 'return message containing property and array index',
    actual: () =>
      validationRemarksToStrings({
        property1: {
          '[0]': 'some remark',
        },
      }),
    expected: ['property1.[0]: some remark'],
  });

  assert({
    given: 'deeply nested object',
    should: 'return messages for all keys',
    actual: () =>
      validationRemarksToStrings({
        property1: {
          '[0]': {
            [objectValidationRemarkKey]: 'message1',
            prop1: 'message2',
            prop2: {
              a: 'message3',
              b: 'message4',
            },
          },
          '[2]': 'message5',
        },
        property2: {
          foo: 'message6',
        },
      }),
    expected: [
      'property1.[0]: message1',
      'property1.[0].prop1: message2',
      'property1.[0].prop2.a: message3',
      'property1.[0].prop2.b: message4',
      'property1.[2]: message5',
      'property2.foo: message6',
    ],
  });
});

describe('logWarningIfValidationRemarksArePresent()', () => {
  beforeAll(() => {
    console.groupCollapsed = jest.fn();
    console.warn = jest.fn();
    console.info = jest.fn();
  });

  test('with no validation remarks', () => {
    logWarningIfValidationRemarksArePresent('foo', {});
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
  });

  test('with validation remarks', () => {
    logWarningIfValidationRemarksArePresent('foo', {
      prop1: 'bar',
      prop2: 'bar',
    });
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledTimes(2);
  });
});
