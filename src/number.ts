import { assertString } from './assert';

export type Options = {
  /**
   * fallback value if parsing was wrong
   *
   * @type {number}
   */
  fallback?: number;
  /**
   * Throw an error if incoming value is not safe integer
   *
   * @type {boolean}
   * @default
   * false
   */
  throwOnSafeInteger?: boolean;
  /**
   * If `true` throwing an error if incoming value is undefined
   *
   * @type {boolean}
   * @default
   * false
   */
  throwOnUndefined?: boolean;

  /**
  * Throws an error if incoming value parsed to `NaN`
  * @default
  * false
  */
  throwOnNaN?: boolean;
  /**
   * Throws an error if incoming value parsed to `Infinity`
   * @default
   * false
   */
  throwOnFinite?: boolean;

};
/**
 * Guard that parse environment variable and returns a number anyway
 * 
 * Returns `0` if parse was not successfully
 *
 * @export
 * @param {(string | undefined)} variable variable to parse
 * @param {number} [fallback=0] fallback value if parsing was wrong
 * @param {Options} [options] parsing options
 * @return {*} 
 */
export default function numberGuard(variable: string | undefined, options?: Options) {
  assertString(variable);
  const fallback = options?.fallback ?? 0;
  if (variable === undefined) {
    if (options?.throwOnUndefined) {
      throw new TypeError('numberGuard. variable is undefined');
    }
    return fallback;
  }
  const floatValue = Number.parseFloat(variable);
  const isSafe = Number.isSafeInteger(floatValue);
  const isNaN = Number.isNaN(floatValue);
  if (options?.throwOnNaN && isNaN) {
    throw new TypeError('numberGuard. variable is NaN');
  }
  if (options?.throwOnFinite && !Number.isFinite(floatValue)) {
    throw new TypeError('numberGuard. variable is Infinity');
  }
  if (options?.throwOnSafeInteger && !isSafe) {
    throw new RangeError(`numberGuard. ${variable} is not a safe integer`);
  }
  if (isSafe && Number.isFinite(floatValue)) {
    return floatValue;
  }
  return fallback;
}
