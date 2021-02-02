import {
  AnyTransformationSchema,
  ExtractOriginalTypeFromTransformationSchema,
  OptionalTransformationSchema,
  SupportedValueTypes,
} from './types';

export const optionalSchema = <
  V extends SupportedValueTypes,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T extends AnyTransformationSchema<V, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
>(
  schema: T
): OptionalTransformationSchema<
  ExtractOriginalTypeFromTransformationSchema<
    V,
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T10,
    T
  >
> => ({
  optionalTransformationSchema: schema as any,
});
