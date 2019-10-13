import { forEach, join, keys, reduce } from 'ramda';

import { hasNoValidationRemarks } from './helper';
import {
  objectValidationRemarkKey,
  ValidationRemarks,
  ValidationRemarksIndexType,
} from './types';
import { isString } from './utils';

const validationRemarksToStrings = (
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
          (remarksAsStrings, remarksObjectKey: ValidationRemarksIndexType) => [
            ...remarksAsStrings,
            ...(remarksObjectKey === objectValidationRemarkKey
              ? [
                  `${join('.', objectKeys)}: ${
                    validationRemarks[remarksObjectKey]
                  }`,
                ]
              : validationRemarksToStrings(
                  validationRemarks[remarksObjectKey],
                  [...objectKeys, remarksObjectKey]
                )),
          ],
          [] as readonly string[],
          keys(validationRemarks) as ValidationRemarksIndexType[]
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
