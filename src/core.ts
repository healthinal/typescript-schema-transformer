import { addIndex, curry, has, isNil, keys, map, pipe, reduce } from 'ramda';

import { DeepWithoutUnionTypes } from '.';
import { getValidationRemark, hasNoValidationRemarks } from './helper';
import {
  getTransformationSchemaKey,
  objectValidationRemarkKey,
  optionalSchemaKey,
  ArrayTransformationSchema,
  ObjectTransformationSchema,
  OptionalTransformationSchema,
  SupportedValueTypes,
  TransformationSchema,
  ValidationRemarks,
  ValueTransformationSchema,
} from './types';
import { isObject, isString } from './utils';

const isValueTransformationSchema = <T extends SupportedValueTypes>(
  val: any
): val is ValueTransformationSchema<T> => typeof val === 'function';

const isOptionalTransformationSchema = <T>(
  val: any
): val is OptionalTransformationSchema<T> => !isNil(val?.[optionalSchemaKey]);

const isArrayTransformationSchema = <T>(
  val: any
): val is ArrayTransformationSchema<T> => Array.isArray(val);

const isUnionTypeTransformationSchema = (val: any): boolean =>
  !isNil(val?.[getTransformationSchemaKey]);

const transformWithValueTransformationSchema = <T extends SupportedValueTypes>(
  transformer: ValueTransformationSchema<T>,
  valueToTransform: unknown
): [T, ValidationRemarks] => {
  const [transformedValue, validationRemarks] = transformer(valueToTransform);
  return [
    transformedValue,
    isString(validationRemarks) ? validationRemarks : {},
  ];
};

const transformWithOptionalTransformationSchema = <T>(
  schema: OptionalTransformationSchema<T>,
  valueToTransform: unknown
): [T, ValidationRemarks] =>
  isNil(valueToTransform)
    ? [undefined, {}]
    : transformValueAccordingToSchemaUntyped(
        schema[optionalSchemaKey],
        valueToTransform
      );

const transformWithArrayTransformationSchema = <T>(
  [schema]: ArrayTransformationSchema<T>,
  arrayToTransform: unknown
): [readonly T[], ValidationRemarks] => {
  if (!Array.isArray(arrayToTransform)) {
    return [[], getValidationRemark('array', arrayToTransform, [])];
  }

  // @ts-ignore
  return pipe(
    map((objectToTransform) =>
      transformValueAccordingToSchemaUntyped(schema, objectToTransform)
    ),
    addIndex<
      [T | SupportedValueTypes, ValidationRemarks],
      [readonly T[], object]
    >(reduce)(
      // @ts-ignore
      ([accObj, accVal], [currObj, currVal], index: number) => [
        [...accObj, currObj],
        hasNoValidationRemarks(currVal)
          ? accVal
          : { ...accVal, [`[${index}]`]: currVal },
      ],
      [[], {}]
    )
  )(arrayToTransform);
};

// Leave out the type information since it would be extremely verbose
// and add no value for the external API
const transformWithUnionTypeTransformationSchema = (
  schema: any,
  valueToTransform: unknown
): [any, ValidationRemarks] => {
  const [result, validationRemarks] = transformValueAccordingToSchemaUntyped(
    schema[getTransformationSchemaKey](valueToTransform),
    valueToTransform
  );
  return [result, validationRemarks];
};

const transformWithObjectSchema = <T>(
  schema: ObjectTransformationSchema<T>,
  objectToTransform: unknown
): [any, ValidationRemarks] =>
  reduce(
    ([transformedObject, validationRemarks], propertyName) =>
      pipe(
        () => [
          schema[propertyName],
          has(propertyName as string, objectToTransform || {})
            ? (objectToTransform as any)[propertyName]
            : undefined,
        ],
        ([propertyTransformer, propertyValue]) =>
          transformValueAccordingToSchemaUntyped(
            propertyTransformer,
            propertyValue
          ),
        ([transformedPropertyValue, validationRemarksOfProperty]) => [
          {
            ...transformedObject,
            [propertyName]: transformedPropertyValue,
          },
          hasNoValidationRemarks(validationRemarksOfProperty)
            ? validationRemarks
            : {
                ...validationRemarks,
                [propertyName]: validationRemarksOfProperty,
              },
        ]
      )() as [DeepWithoutUnionTypes<T>, object],
    [
      {} as DeepWithoutUnionTypes<T>,
      isObject(objectToTransform) && !Array.isArray(objectToTransform)
        ? {}
        : {
            [objectValidationRemarkKey]: getValidationRemark(
              'object',
              objectToTransform,
              {}
            ),
          },
    ],
    keys(schema)
  );

// Untyped version to make the handling easier internally
const transformValueAccordingToSchemaUntyped = (
  schema: any,
  value: unknown
): [any, ValidationRemarks] => (transformWithSchema as any)(schema, value);

export const transformWithSchema: {
  <T>(schema: TransformationSchema<T>): (
    valueToTransform: unknown
  ) => [DeepWithoutUnionTypes<T>, ValidationRemarks];
  <T>(schema: TransformationSchema<T>, valueToTransform: unknown): [
    DeepWithoutUnionTypes<T>,
    ValidationRemarks
  ];
} = curry(<T>(schema: TransformationSchema<T>, value: unknown): [
  DeepWithoutUnionTypes<T>,
  ValidationRemarks
] =>
  isValueTransformationSchema(schema)
    ? transformWithValueTransformationSchema(schema, value)
    : isOptionalTransformationSchema(schema)
    ? transformWithOptionalTransformationSchema(schema, value)
    : isArrayTransformationSchema(schema)
    ? transformWithArrayTransformationSchema(schema, value)
    : isUnionTypeTransformationSchema(schema)
    ? transformWithUnionTypeTransformationSchema(schema, value)
    : transformWithObjectSchema(schema as any, value)
) as any;
