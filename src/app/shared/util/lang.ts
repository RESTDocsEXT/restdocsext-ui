/**
 * Some functions an utilities taken from the Angular facace module source.
 */

export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

export function isBoolean(obj: any): boolean {
  return typeof obj === 'boolean';
}

export function isNumber(obj: any): boolean {
  return typeof obj === 'number';
}

export function isString(obj: any): obj is string {
  return typeof obj === 'string';
}

export function isFunction(obj: any): boolean {
  return typeof obj === 'function';
}
