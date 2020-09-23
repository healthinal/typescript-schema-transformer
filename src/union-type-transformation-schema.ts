import {
  baseTransformationSchemaKey,
  getTransformationSchemaKey,
  TransformationSchema,
  UnionType2,
  UnionType3,
  UnionType4,
  UnionType5,
  UnionType6,
  UnionType7,
  UnionType8,
  UnionType9,
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
  <B, T extends UnionType2<any, any>>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) => T extends UnionType2<infer T1, infer T2>
      ? TransformationSchema<T1> | TransformationSchema<T2>
      : never
  ): T extends UnionType2<infer T1, infer T2>
    ? UnionTypeTransformationSchema2<B, T1, T2>
    : never;
  <B, T extends UnionType3<any, any, any>>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) => T extends UnionType3<infer T1, infer T2, infer T3>
      ?
          | TransformationSchema<T1>
          | TransformationSchema<T2>
          | TransformationSchema<T3>
      : never
  ): T extends UnionType3<infer T1, infer T2, infer T3>
    ? UnionTypeTransformationSchema3<B, T1, T2, T3>
    : never;
  <B, T extends UnionType4<any, any, any, any>>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) => T extends UnionType4<infer T1, infer T2, infer T3, infer T4>
      ?
          | TransformationSchema<T1>
          | TransformationSchema<T2>
          | TransformationSchema<T3>
          | TransformationSchema<T4>
      : never
  ): T extends UnionType4<infer T1, infer T2, infer T3, infer T4>
    ? UnionTypeTransformationSchema4<B, T1, T2, T3, T4>
    : never;
  <B, T extends UnionType5<any, any, any, any, any>>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) => T extends UnionType5<infer T1, infer T2, infer T3, infer T4, infer T5>
      ?
          | TransformationSchema<T1>
          | TransformationSchema<T2>
          | TransformationSchema<T3>
          | TransformationSchema<T4>
          | TransformationSchema<T5>
      : never
  ): T extends UnionType5<infer T1, infer T2, infer T3, infer T4, infer T5>
    ? UnionTypeTransformationSchema5<B, T1, T2, T3, T4, T5>
    : never;
  <B, T extends UnionType6<any, any, any, any, any, any>>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) => T extends UnionType6<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6
    >
      ?
          | TransformationSchema<T1>
          | TransformationSchema<T2>
          | TransformationSchema<T3>
          | TransformationSchema<T4>
          | TransformationSchema<T5>
          | TransformationSchema<T6>
      : never
  ): T extends UnionType6<
    infer T1,
    infer T2,
    infer T3,
    infer T4,
    infer T5,
    infer T6
  >
    ? UnionTypeTransformationSchema6<B, T1, T2, T3, T4, T5, T6>
    : never;
  <B, T extends UnionType7<any, any, any, any, any, any, any>>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) => T extends UnionType7<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7
    >
      ?
          | TransformationSchema<T1>
          | TransformationSchema<T2>
          | TransformationSchema<T3>
          | TransformationSchema<T4>
          | TransformationSchema<T5>
          | TransformationSchema<T6>
          | TransformationSchema<T7>
      : never
  ): T extends UnionType7<
    infer T1,
    infer T2,
    infer T3,
    infer T4,
    infer T5,
    infer T6,
    infer T7
  >
    ? UnionTypeTransformationSchema7<B, T1, T2, T3, T4, T5, T6, T7>
    : never;
  <B, T extends UnionType8<any, any, any, any, any, any, any, any>>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) => T extends UnionType8<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7,
      infer T8
    >
      ?
          | TransformationSchema<T1>
          | TransformationSchema<T2>
          | TransformationSchema<T3>
          | TransformationSchema<T4>
          | TransformationSchema<T5>
          | TransformationSchema<T6>
          | TransformationSchema<T7>
          | TransformationSchema<T8>
      : never
  ): T extends UnionType8<
    infer T1,
    infer T2,
    infer T3,
    infer T4,
    infer T5,
    infer T6,
    infer T7,
    infer T8
  >
    ? UnionTypeTransformationSchema8<B, T1, T2, T3, T4, T5, T6, T7, T8>
    : never;
  <B, T extends UnionType9<any, any, any, any, any, any, any, any, any>>(
    baseTransformationSchema: TransformationSchema<B>,
    getTransformationSchema: (
      base: B
    ) => T extends UnionType9<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7,
      infer T8,
      infer T9
    >
      ?
          | TransformationSchema<T1>
          | TransformationSchema<T2>
          | TransformationSchema<T3>
          | TransformationSchema<T4>
          | TransformationSchema<T5>
          | TransformationSchema<T6>
          | TransformationSchema<T7>
          | TransformationSchema<T8>
          | TransformationSchema<T9>
      : never
  ): T extends UnionType9<
    infer T1,
    infer T2,
    infer T3,
    infer T4,
    infer T5,
    infer T6,
    infer T7,
    infer T8,
    infer T9
  >
    ? UnionTypeTransformationSchema9<B, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    : never;
};

export const createUnionTypeTransformationSchema: CreateUnionTypeTransformationSchema = (
  baseTransformationSchema: any,
  getTransformationSchema: any
) => ({
  [baseTransformationSchemaKey]: baseTransformationSchema,
  [getTransformationSchemaKey]: getTransformationSchema,
});
