import { both, complement, includes, isNil, join, test } from 'ramda';

import { getValidationRemark } from './helper';
import { SupportedValueTypes, ValueTransformationSchema } from './types';
import {
  isBoolean,
  isNumber,
  isString,
  isValidDate,
  isValidIsoDate,
  isValidTime,
} from './utils';

export const createValueTransformationSchema = <T extends SupportedValueTypes>(
  type: string,
  defaultValue: T,
  isValid: (value: unknown) => boolean,
  shouldRaiseRemark: (value: unknown) => boolean = complement(isValid)
) => (
  overridableDefaultValue: T = defaultValue
): ValueTransformationSchema<T> => (value) => [
  isValid(value) ? (value as any) : overridableDefaultValue,
  shouldRaiseRemark(value)
    ? getValidationRemark(type, value, overridableDefaultValue)
    : undefined,
];

export const createValueTransformationSchemaForOptionalValue = <
  T extends SupportedValueTypes
>(
  type: string,
  isValid: (value: unknown) => boolean
) =>
  createValueTransformationSchema(
    type,
    undefined as T | undefined,
    isValid,
    (value) => !isValid(value) && !isNil(value)
  );

export const createSilentValueTransformationSchema = <
  T extends SupportedValueTypes
>(
  defaultValue: T,
  isValid: (value: unknown) => boolean
) =>
  createValueTransformationSchema(
    'silent transformer (never used)',
    defaultValue,
    isValid,
    () => false
  );

export const requiredStringSchema = createValueTransformationSchema<string>(
  'string',
  '',
  isString
);
export const silentRequiredStringSchema = createSilentValueTransformationSchema<
  string
>('', isString);
export const optionalStringSchema = createValueTransformationSchemaForOptionalValue<
  string
>('string', isString);

export const requiredNumberSchema = createValueTransformationSchema<number>(
  'number',
  0,
  isNumber
);
export const silentRequiredNumberSchema = createSilentValueTransformationSchema<
  number
>(0, isNumber);
export const optionalNumberSchema = createValueTransformationSchemaForOptionalValue<
  number
>('number', isNumber);

export const requiredBooleanSchema = createValueTransformationSchema<boolean>(
  'boolean',
  false,
  isBoolean
);
export const silentRequiredBooleanSchema = createSilentValueTransformationSchema<
  boolean
>(false, isBoolean);
export const optionalBooleanSchema = createValueTransformationSchemaForOptionalValue<
  boolean
>('boolean', isBoolean);

const isValidDateSchema = both(isString, isValidDate);
export const requiredDateSchema = createValueTransformationSchema<string>(
  'date',
  '0001-01-01',
  isValidDateSchema
);
export const optionalDateSchema = createValueTransformationSchemaForOptionalValue<
  string
>('date', isValidDateSchema);

const isValidTimeSchema = both(isString, isValidTime);
export const requiredTimeSchema = createValueTransformationSchema<string>(
  'time',
  '00:00:00',
  isValidTimeSchema
);
export const optionalTimeSchema = createValueTransformationSchemaForOptionalValue<
  string
>('time', isValidTimeSchema);

const isValidIsoDateTimeSchema = both(isString, isValidIsoDate);
export const requiredIsoDateTimeSchema = createValueTransformationSchema<
  string
>('iso date time string', '0001-01-01T00:00:00', isValidIsoDateTimeSchema);
export const optionalIsoDateTimeSchema = createValueTransformationSchemaForOptionalValue<
  string
>('iso date time string', isValidIsoDateTimeSchema);

const isColorString = test(/^#[a-fA-F0-9]{6}$/);
export const optionalColorStringSchema = createValueTransformationSchemaForOptionalValue<
  string
>('color string', both(isString, isColorString));

export const requiredEnumSchema = <T extends SupportedValueTypes>(
  enumValues: readonly T[],
  defaultValue: T = enumValues[0]
): ValueTransformationSchema<T> =>
  createValueTransformationSchema(
    `enum (one of these values: [${join(', ', enumValues)}])`,
    defaultValue,
    (value) => includes(value, enumValues)
  )(defaultValue);

export const staticValueSchema = <T extends SupportedValueTypes>(
  staticValue: T
): ValueTransformationSchema<typeof staticValue> =>
  createValueTransformationSchema(
    `static value (${staticValue})`,
    staticValue,
    (value) => value === staticValue
  )(staticValue);

export const addStaticValueSchema = <T extends SupportedValueTypes>(
  staticValue: T
): ValueTransformationSchema<typeof staticValue> =>
  createValueTransformationSchema(
    'static (never used)',
    staticValue,
    () => false,
    () => false
  )(staticValue);

export const noTransformationSchema = createValueTransformationSchemaForOptionalValue<
  any
>('no transformation (never used)', () => true)();
