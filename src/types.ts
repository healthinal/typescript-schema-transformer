// tslint:disable:no-shadowed-variable

export const objectValidationRemarkKey = Symbol();

export type ValidationRemarks =
  | string
  | {
      [objectValidationRemarkKey]?: string;
      [key: string]: ValidationRemarks;
    };

export const baseTransformationSchemaKey = Symbol();
export const getTransformationSchemaKey = Symbol();

export type UnionType2<T1, T2> = {
  ['some-arbitrary-name-to-prevent-structural-type-equality-2']: never;
};
export type UnionType3<T1, T2, T3> = {
  ['some-arbitrary-name-to-prevent-structural-type-equality-3']: never;
};
export type UnionType4<T1, T2, T3, T4> = {
  ['some-arbitrary-name-to-prevent-structural-type-equality-4']: never;
};
export type UnionType5<T1, T2, T3, T4, T5> = {
  ['some-arbitrary-name-to-prevent-structural-type-equality-5']: never;
};
export type UnionType6<T1, T2, T3, T4, T5, T6> = {
  ['some-arbitrary-name-to-prevent-structural-type-equality-6']: never;
};
export type UnionType7<T1, T2, T3, T4, T5, T6, T7> = {
  ['some-arbitrary-name-to-prevent-structural-type-equality-7']: never;
};
export type UnionType8<T1, T2, T3, T4, T5, T6, T7, T8> = {
  ['some-arbitrary-name-to-prevent-structural-type-equality-8']: never;
};
export type UnionType9<T1, T2, T3, T4, T5, T6, T7, T8, T9> = {
  ['some-arbitrary-name-to-prevent-structural-type-equality-9']: never;
};

export type SupportedValueTypes = boolean | number | string | undefined;

// The array comparison syntax will prevent boolean from splitting up into ValueTransformer<true> and ValueTransformer<false>
// (see https://github.com/Microsoft/TypeScript/issues/30029#issuecomment-466183104)
export type TransformationSchema<T> = [T] extends [SupportedValueTypes]
  ? ValueTransformationSchema<T>
  : T extends (infer U)[]
  ? ArrayTransformationSchema<U>
  : T extends UnionType2<infer T1, infer T2>
  ? UnionTypeTransformationSchema2<any, T1, T2>
  : T extends UnionType3<infer T1, infer T2, infer T3>
  ? UnionTypeTransformationSchema3<any, T1, T2, T3>
  : T extends UnionType4<infer T1, infer T2, infer T3, infer T4>
  ? UnionTypeTransformationSchema4<any, T1, T2, T3, T4>
  : T extends UnionType5<infer T1, infer T2, infer T3, infer T4, infer T5>
  ? UnionTypeTransformationSchema5<any, T1, T2, T3, T4, T5>
  : T extends UnionType6<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6
    >
  ? UnionTypeTransformationSchema6<any, T1, T2, T3, T4, T5, T6>
  : T extends UnionType7<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7
    >
  ? UnionTypeTransformationSchema7<any, T1, T2, T3, T4, T5, T6, T7>
  : T extends UnionType8<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7,
      infer T8
    >
  ? UnionTypeTransformationSchema8<any, T1, T2, T3, T4, T5, T6, T7, T8>
  : T extends UnionType9<
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
  ? UnionTypeTransformationSchema9<any, T1, T2, T3, T4, T5, T6, T7, T8, T9>
  : ObjectTransformationSchema<T>;

export type ValueTransformationSchema<T extends SupportedValueTypes> = (
  value: unknown
) => [T, string | undefined];

export type ArrayTransformationSchema<T> = [
  [T] extends [SupportedValueTypes]
    ? ValueTransformationSchema<T>
    : T extends UnionType2<infer T1, infer T2>
    ? UnionTypeTransformationSchema2<any, T1, T2>
    : T extends UnionType3<infer T1, infer T2, infer T3>
    ? UnionTypeTransformationSchema3<any, T1, T2, T3>
    : T extends UnionType4<infer T1, infer T2, infer T3, infer T4>
    ? UnionTypeTransformationSchema4<any, T1, T2, T3, T4>
    : T extends UnionType5<infer T1, infer T2, infer T3, infer T4, infer T5>
    ? UnionTypeTransformationSchema5<any, T1, T2, T3, T4, T5>
    : T extends UnionType6<
        infer T1,
        infer T2,
        infer T3,
        infer T4,
        infer T5,
        infer T6
      >
    ? UnionTypeTransformationSchema6<any, T1, T2, T3, T4, T5, T6>
    : T extends UnionType7<
        infer T1,
        infer T2,
        infer T3,
        infer T4,
        infer T5,
        infer T6,
        infer T7
      >
    ? UnionTypeTransformationSchema7<any, T1, T2, T3, T4, T5, T6, T7>
    : T extends UnionType8<
        infer T1,
        infer T2,
        infer T3,
        infer T4,
        infer T5,
        infer T6,
        infer T7,
        infer T8
      >
    ? UnionTypeTransformationSchema8<any, T1, T2, T3, T4, T5, T6, T7, T8>
    : T extends UnionType9<
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
    ? UnionTypeTransformationSchema9<any, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    : ObjectTransformationSchema<T>
];
export type ObjectTransformationSchema<T> = {
  [K in keyof T]: TransformationSchema<T[K]>;
};

export type UnionTypeTransformationSchema2<B, T1, T2> = {
  [baseTransformationSchemaKey]: TransformationSchema<B>;
  [getTransformationSchemaKey]: (
    base: B
  ) => TransformationSchema<T1> | TransformationSchema<T2>;
};
export type UnionTypeTransformationSchema3<B, T1, T2, T3> = {
  [baseTransformationSchemaKey]: TransformationSchema<B>;
  [getTransformationSchemaKey]: (
    base: B
  ) =>
    | TransformationSchema<T1>
    | TransformationSchema<T2>
    | TransformationSchema<T3>;
};
export type UnionTypeTransformationSchema4<B, T1, T2, T3, T4> = {
  [baseTransformationSchemaKey]: TransformationSchema<B>;
  [getTransformationSchemaKey]: (
    base: B
  ) =>
    | TransformationSchema<T1>
    | TransformationSchema<T2>
    | TransformationSchema<T3>
    | TransformationSchema<T4>;
};
export type UnionTypeTransformationSchema5<B, T1, T2, T3, T4, T5> = {
  [baseTransformationSchemaKey]: TransformationSchema<B>;
  [getTransformationSchemaKey]: (
    base: B
  ) =>
    | TransformationSchema<T1>
    | TransformationSchema<T2>
    | TransformationSchema<T3>
    | TransformationSchema<T4>
    | TransformationSchema<T5>;
};
export type UnionTypeTransformationSchema6<B, T1, T2, T3, T4, T5, T6> = {
  [baseTransformationSchemaKey]: TransformationSchema<B>;
  [getTransformationSchemaKey]: (
    base: B
  ) =>
    | TransformationSchema<T1>
    | TransformationSchema<T2>
    | TransformationSchema<T3>
    | TransformationSchema<T4>
    | TransformationSchema<T5>
    | TransformationSchema<T6>;
};
export type UnionTypeTransformationSchema7<B, T1, T2, T3, T4, T5, T6, T7> = {
  [baseTransformationSchemaKey]: TransformationSchema<B>;
  [getTransformationSchemaKey]: (
    base: B
  ) =>
    | TransformationSchema<T1>
    | TransformationSchema<T2>
    | TransformationSchema<T3>
    | TransformationSchema<T4>
    | TransformationSchema<T5>
    | TransformationSchema<T6>
    | TransformationSchema<T7>;
};
export type UnionTypeTransformationSchema8<
  B,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8
> = {
  [baseTransformationSchemaKey]: TransformationSchema<B>;
  [getTransformationSchemaKey]: (
    base: B
  ) =>
    | TransformationSchema<T1>
    | TransformationSchema<T2>
    | TransformationSchema<T3>
    | TransformationSchema<T4>
    | TransformationSchema<T5>
    | TransformationSchema<T6>
    | TransformationSchema<T7>
    | TransformationSchema<T8>;
};
export type UnionTypeTransformationSchema9<
  B,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9
> = {
  [baseTransformationSchemaKey]: TransformationSchema<B>;
  [getTransformationSchemaKey]: (
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
    | TransformationSchema<T9>;
};

export type DeepWithoutUnionTypes<T> = {
  [K in keyof T]: T[K] extends SupportedValueTypes
    ? T[K]
    : T[K] extends (infer U)[]
    ? DeepWithoutUnionTypesArray<U>
    : T[K] extends UnionType2<infer T1, infer T2>
    ? DeepWithoutUnionTypes<T1 | T2>
    : T[K] extends UnionType3<infer T1, infer T2, infer T3>
    ? DeepWithoutUnionTypes<T1 | T2 | T3>
    : T[K] extends UnionType4<infer T1, infer T2, infer T3, infer T4>
    ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4>
    : T[K] extends UnionType5<infer T1, infer T2, infer T3, infer T4, infer T5>
    ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5>
    : T[K] extends UnionType6<
        infer T1,
        infer T2,
        infer T3,
        infer T4,
        infer T5,
        infer T6
      >
    ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5 | T6>
    : T[K] extends UnionType7<
        infer T1,
        infer T2,
        infer T3,
        infer T4,
        infer T5,
        infer T6,
        infer T7
      >
    ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5 | T6 | T7>
    : T[K] extends UnionType8<
        infer T1,
        infer T2,
        infer T3,
        infer T4,
        infer T5,
        infer T6,
        infer T7,
        infer T8
      >
    ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>
    : T[K] extends UnionType9<
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
    ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>
    : DeepWithoutUnionTypes<T[K]>;
};
type DeepWithoutUnionTypesArray<T> = ([T] extends [SupportedValueTypes]
  ? T
  : T extends UnionType2<infer T1, infer T2>
  ? DeepWithoutUnionTypes<T1 | T2>
  : T extends UnionType3<infer T1, infer T2, infer T3>
  ? DeepWithoutUnionTypes<T1 | T2 | T3>
  : T extends UnionType4<infer T1, infer T2, infer T3, infer T4>
  ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4>
  : T extends UnionType5<infer T1, infer T2, infer T3, infer T4, infer T5>
  ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5>
  : T extends UnionType6<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6
    >
  ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5 | T6>
  : T extends UnionType7<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7
    >
  ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5 | T6 | T7>
  : T extends UnionType8<
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7,
      infer T8
    >
  ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>
  : T extends UnionType9<
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
  ? DeepWithoutUnionTypes<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>
  : DeepWithoutUnionTypes<T>)[];
