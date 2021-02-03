// tslint:disable:no-shadowed-variable

export const objectValidationRemarkKey = Symbol();

export type ValidationRemarks =
  | string
  | {
      [objectValidationRemarkKey]?: string;
      [key: string]: ValidationRemarks;
    };

export const getTransformationSchemaKey = Symbol();

export const optionalSchemaKey = Symbol();

export type UnionType<T extends any[]> = {
  ['some-arbitrary-name-to-prevent-structural-type-equality']: never;
};

export type SupportedValueTypes = boolean | number | string | undefined;

// The array comparison syntax will prevent boolean from splitting up into ValueTransformer<true> and ValueTransformer<false>
// (see https://github.com/Microsoft/TypeScript/issues/30029#issuecomment-466183104)
export type TransformationSchema<T> = undefined extends Extract<T, undefined>
  ? [T] extends [SupportedValueTypes]
    ?
        | OptionalTransformationSchema<Exclude<T, undefined>>
        | ValueTransformationSchema<T>
    : OptionalTransformationSchema<Exclude<T, undefined>>
  : [T] extends [SupportedValueTypes]
  ? ValueTransformationSchema<T>
  : T extends (infer U)[]
  ? ArrayTransformationSchema<U>
  : T extends UnionType<infer U>
  ? UnionTypeTransformationSchema<U>
  : ObjectTransformationSchema<T>;

export type ValueTransformationSchema<T extends SupportedValueTypes> = (
  value: unknown
) => [T, string | undefined];

export type ArrayTransformationSchema<T> = [TransformationSchema<T>];

export type ObjectTransformationSchema<T> = {
  [K in keyof T]: TransformationSchema<T[K]>;
};

export type OptionalTransformationSchema<T> = {
  readonly [optionalSchemaKey]: TransformationSchema<Exclude<T, undefined>>;
};

type MapTupleToTransformationSchemas<Tuple extends [...any[]]> = {
  [Index in keyof Tuple]: TransformationSchema<Tuple[Index]>;
} & { length: Tuple['length'] };

export type TupleToUnionTypeTransformationSchemaFunction<T extends any[]> = (
  // In theory, it would be better to use unknown but this would in turn
  // make the the transformation functions unnecessary verbose.
  base: any
) => TupleToUnion<MapTupleToTransformationSchemas<T>>;

export type UnionTypeTransformationSchema<T extends any[]> = {
  [getTransformationSchemaKey]: TupleToUnionTypeTransformationSchemaFunction<T>;
};

export type DeepWithoutUnionTypes<T> = T extends SupportedValueTypes
  ? T
  : undefined extends Extract<T, undefined>
  ? DeepWithoutUnionTypes<Exclude<T, undefined>> | undefined
  : T extends (infer U)[]
  ? DeepWithoutUnionTypes<U>[]
  : T extends UnionType<infer U>
  ? DeepWithoutUnionTypes<TupleToUnion<U>>
  : { [K in keyof T]: DeepWithoutUnionTypes<T[K]> };

type TupleToUnion<T extends any[]> = T extends [infer T1]
  ? T1
  : T extends [infer T1, infer T2]
  ? T1 | T2
  : T extends [infer T1, infer T2, infer T3]
  ? T1 | T2 | T3
  : T extends [infer T1, infer T2, infer T3, infer T4]
  ? T1 | T2 | T3 | T4
  : T extends [infer T1, infer T2, infer T3, infer T4, infer T5]
  ? T1 | T2 | T3 | T4 | T5
  : T extends [infer T1, infer T2, infer T3, infer T4, infer T5, infer T6]
  ? T1 | T2 | T3 | T4 | T5 | T6
  : T extends [
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7
    ]
  ? T1 | T2 | T3 | T4 | T5 | T6 | T7
  : T extends [
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7,
      infer T8
    ]
  ? T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8
  : T extends [
      infer T1,
      infer T2,
      infer T3,
      infer T4,
      infer T5,
      infer T6,
      infer T7,
      infer T8,
      infer T9
    ]
  ? T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9
  : never;
