import { assertFunction, assertString } from './assert';
import define from './define';

export type Options = {
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
 * @return {*} Guarded value or `TypeError`
 */
const stringGuard = define((variable: string | undefined, options?: Options) => {
  assertString(variable, { strict: options?.throwOnUndefined, error: new TypeError('stringGuard. variable is undefined') });
  const fallbackValue = options?.fallback ?? variable ?? '';
  if ((variable === undefined || variable === null || variable === 'null' || variable === 'undefined' || variable === '') && options?.throwOnNullable) {
    throw new TypeError('stringGuard. variable is "null" or "undefined"');
  }
  if (variable && options?.matcher) {
    assertFunction(options?.matcher);
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
    if (!match && options?.throwOnMismatch) {
      throw new TypeError('stringGuard. variable is not matched');
    }
  }
  return fallbackValue;
});

export default stringGuard;
