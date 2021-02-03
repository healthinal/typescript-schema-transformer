import {
  getTransformationSchemaKey,
  TupleToUnionTypeTransformationSchemaFunction,
  UnionTypeTransformationSchema,
} from './types';

export const createUnionTypeTransformationSchema = <T extends any[]>(
  getTransformationSchema: TupleToUnionTypeTransformationSchemaFunction<T>
): UnionTypeTransformationSchema<T> => ({
  [getTransformationSchemaKey]: getTransformationSchema,
});
