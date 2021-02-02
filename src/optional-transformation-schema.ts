import {
  AnyTransformationSchema,
  ExtractOriginalTypeFromTransformationSchema,
  OptionalTransformationSchema,
} from './types';

export const optionalSchema = <T extends AnyTransformationSchema>(
  schema: T
): OptionalTransformationSchema<
  ExtractOriginalTypeFromTransformationSchema<T>
> => ({
  optionalTransformationSchema: schema as any,
});
