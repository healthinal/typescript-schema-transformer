import { has, isEmpty } from 'ramda';

import { objectValidationRemarkKey, ValidationRemarks } from './types';
import { isObject } from './utils';

export const hasNoValidationRemarks = (validationRemarks: ValidationRemarks) =>
  isObject(validationRemarks) &&
  !has(objectValidationRemarkKey as any, validationRemarks) &&
  isEmpty(validationRemarks);

export const getValidationRemark = (
  expectedType: string,
  value: any,
  transformedTo: any
) =>
  `Expected field to be of type ${
    expectedType + (transformedTo === undefined ? ' or undefined/null' : '')
  } -> transform ${JSON.stringify(value)} to ${JSON.stringify(transformedTo)}`;
