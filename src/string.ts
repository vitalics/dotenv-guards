import { assertString } from './assert';

type Options = {
  /**
   * Fallback value. Will used if parsing was not successful
   *
   * @type {string}
   */
  fallback?: string;
  /**
   * Throw an error if incoming value is undefined
   *
   * @type {boolean}
   */
  throwOnUndefined?: boolean;
  /**
   * Regexp to validate incoming value. Returns first match
   *
   * @type {RegExp}
   */
  regexp?: RegExp;
  /**
   * Throws an error if incoming value is `undefined` or `null` or empty string(``)
   *
   * @type {boolean}
   */
  throwOnNullable?: boolean;
  /**
   * matcher which returns incoming value if it is matched by function
   *
   */
  matcher?: (value: string) => boolean;
  /**
   * Throws an error if incoming value is `matcher` returns `false`
   *
   * @type {boolean}
   */
  throwOnMismatch?: boolean;
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
  if ((variable === undefined || variable === null || variable === 'null' || variable === 'undefined' || variable === '') && options?.throwOnNullable) {
    throw new TypeError('stringGuard. variable is "null" or "undefined"');
  }
  if (variable && options?.matcher && typeof options.matcher === 'function') {
    const isMatched = options.matcher(variable);
    if (!isMatched && options.throwOnMismatch) {
      throw new TypeError('stringGuard. variable is not matched');
    }
    return variable;
  }

  if (options?.regexp) {
    const match = variable?.match(options.regexp);
    if (match) {
      return match[0];
    }
  }
  return fallbackValue;
}

