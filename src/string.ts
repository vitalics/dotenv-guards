import { assertString } from './assert';

type Options = {
  fallback?: string;
  throwOnUndefined?: boolean;
  regexp?: RegExp;
  throwOnNullable?: boolean;
};
/**
 * Guard that parse environment variable and returns a matched string
 * 
 *
 * @export
 * @param {(string | undefined)} variable variable to parse
 * @param {number} [fallbackValue=0] fallback value if parsing was wrong
 * @param {Options} [options] parsing options
 * @return {*} 
 */
export default function stringGuard(variable: string | undefined, options?: Options) {
  assertString(variable);
  const fallbackValue = options?.fallback ?? variable ?? '';
  if (variable === undefined && options?.throwOnUndefined) {
    throw new TypeError('stringGuard. variable is undefined');
  }
  if ((variable === undefined || variable === null || variable === 'null' || variable === 'undefined') && options?.throwOnNullable) {
    throw new TypeError('stringGuard. variable is "null" or "undefined"');
  }
  if (options?.regexp) {
    const match = variable?.match(options.regexp);
    if (match) {
      return match[0];
    }
  }
  return fallbackValue;
}

