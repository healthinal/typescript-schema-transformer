import { forEach, join, keys, reduce } from 'ramda';

import { hasNoValidationRemarks } from './helper';
import { objectValidationRemarkKey, ValidationRemarks } from './types';
import { isString } from './utils';

export const validationRemarksToStrings = (
  validationRemarks: ValidationRemarks,
  objectKeys: readonly string[] = []
): readonly string[] =>
  isString(validationRemarks)
    ? [`${join('.', objectKeys)}: ${validationRemarks}`]
    : [
        ...(isString(validationRemarks[objectValidationRemarkKey])
          ? validationRemarksToStrings(
              validationRemarks[objectValidationRemarkKey] as string,
              objectKeys
            )
          : []),
        ...reduce(
          (remarksAsStrings, remarksObjectKey) => [
            ...remarksAsStrings,
            ...validationRemarksToStrings(validationRemarks[remarksObjectKey], [
              ...objectKeys,
              remarksObjectKey,
            ]),
          ],
          [] as readonly string[],
          keys(validationRemarks) as readonly string[] // keys() does not return Symbols used as key
        ),
      ];

export const logWarningIfValidationRemarksArePresent = (
  transformationName: string,
  validationRemarks: ValidationRemarks
) => {
  if (!hasNoValidationRemarks(validationRemarks)) {
    console.warn(
      `There were unexpected values present while transforming ${transformationName}.`
    );
    console.groupCollapsed(`Warnings for ${transformationName}`);
    forEach(
      warning => console.info(warning),
      validationRemarksToStrings(validationRemarks)
    );
    console.groupEnd();
  }
};
