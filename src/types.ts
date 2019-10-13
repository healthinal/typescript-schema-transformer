// tslint:disable:no-shadowed-variable

export const objectValidationRemarkKey = Symbol();

export type ValidationRemarksIndexType =
  | string
  | typeof objectValidationRemarkKey;
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
  : DeepWithoutUnionTypes<T>)[];
