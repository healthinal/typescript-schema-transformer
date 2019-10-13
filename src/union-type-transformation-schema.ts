import {
  baseTransformationSchemaKey,
  getTransformationSchemaKey,
  TransformationSchema,
  UnionTypeTransformationSchema2,
  UnionTypeTransformationSchema3,
  UnionTypeTransformationSchema4,
  UnionTypeTransformationSchema5,
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
};

export const createUnionTypeTransformationSchema: CreateUnionTypeTransformationSchema = (
  baseTransformationSchema: any,
  getTransformationSchema: any
) => ({
  [baseTransformationSchemaKey]: baseTransformationSchema,
  [getTransformationSchemaKey]: getTransformationSchema,
});
