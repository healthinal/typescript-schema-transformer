import {
  optionalSchemaKey,
  OptionalTransformationSchema,
  TransformationSchema,
} from './types';

export const optionalSchema = <T>(
  schema: TransformationSchema<Exclude<T, undefined>>
): OptionalTransformationSchema<T> => ({
  [optionalSchemaKey]: schema,
});
