import {
  baseTransformationSchemaKey,
  getTransformationSchemaKey,
  TransformationSchema,
  UnionTypeTransformationSchema2,
  UnionTypeTransformationSchema3,
  UnionTypeTransformationSchema4,
  UnionTypeTransformationSchema5,
  UnionTypeTransformationSchema6,
  UnionTypeTransformationSchema7,
  UnionTypeTransformationSchema8,
  UnionTypeTransformationSchema9,
} from './types';

type CreateUnionTypeTransformationSchema = {
  <B, T1, T2>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) => TransformationSchema<T1> | TransformationSchema<T2>
  ): UnionTypeTransformationSchema2<B, T1, T2>;
  <B, T1, T2, T3>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) =>
      | TransformationSchema<T1>
      | TransformationSchema<T2>
      | TransformationSchema<T3>
  ): UnionTypeTransformationSchema3<B, T1, T2, T3>;
  <B, T1, T2, T3, T4>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) =>
      | TransformationSchema<T1>
      | TransformationSchema<T2>
      | TransformationSchema<T3>
      | TransformationSchema<T4>
  ): UnionTypeTransformationSchema4<B, T1, T2, T3, T4>;
  <B, T1, T2, T3, T4, T5>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) =>
      | TransformationSchema<T1>
      | TransformationSchema<T2>
      | TransformationSchema<T3>
      | TransformationSchema<T4>
      | TransformationSchema<T5>
  ): UnionTypeTransformationSchema5<B, T1, T2, T3, T4, T5>;
  <B, T1, T2, T3, T4, T5, T6>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) =>
      | TransformationSchema<T1>
      | TransformationSchema<T2>
      | TransformationSchema<T3>
      | TransformationSchema<T4>
      | TransformationSchema<T5>
      | TransformationSchema<T6>
  ): UnionTypeTransformationSchema6<B, T1, T2, T3, T4, T5, T6>;
  <B, T1, T2, T3, T4, T5, T6, T7>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) =>
      | TransformationSchema<T1>
      | TransformationSchema<T2>
      | TransformationSchema<T3>
      | TransformationSchema<T4>
      | TransformationSchema<T5>
      | TransformationSchema<T6>
      | TransformationSchema<T7>
  ): UnionTypeTransformationSchema7<B, T1, T2, T3, T4, T5, T6, T7>;
  <B, T1, T2, T3, T4, T5, T6, T7, T8>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) =>
      | TransformationSchema<T1>
      | TransformationSchema<T2>
      | TransformationSchema<T3>
      | TransformationSchema<T4>
      | TransformationSchema<T5>
      | TransformationSchema<T6>
      | TransformationSchema<T7>
      | TransformationSchema<T8>
  ): UnionTypeTransformationSchema8<B, T1, T2, T3, T4, T5, T6, T7, T8>;
  <B, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) =>
      | TransformationSchema<T1>
      | TransformationSchema<T2>
      | TransformationSchema<T3>
      | TransformationSchema<T4>
      | TransformationSchema<T5>
      | TransformationSchema<T6>
      | TransformationSchema<T7>
      | TransformationSchema<T8>
      | TransformationSchema<T9>
  ): UnionTypeTransformationSchema9<B, T1, T2, T3, T4, T5, T6, T7, T8, T9>;
};

export const createUnionTypeTransformationSchema: CreateUnionTypeTransformationSchema = (
  baseTransformationSchema: any,
  getTransformationSchema: any
) => ({
  [baseTransformationSchemaKey]: baseTransformationSchema,
  [getTransformationSchemaKey]: getTransformationSchema,
});
