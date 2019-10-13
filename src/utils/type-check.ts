export const isNumber = (value: any): value is number =>
  typeof value === 'number';

export const isString = (value: any): value is string =>
  typeof value === 'string';

export const isBoolean = (value: any): value is boolean =>
  typeof value === 'boolean';

export const isObject = (value: any): value is { [key: string]: unknown } =>
  value !== null && typeof value === 'object';
