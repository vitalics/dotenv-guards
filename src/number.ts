import { assertString } from './assert';
import define from './define';

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
  /**
   * Throws an error if incoming value is integer like, without decimal part
   * @default
   * false
   */
  throwOnInteger?: boolean;
  /**
   * Throws an error if incoming value is float like, with decimal part
   * @default
   * false
   */
  throwOnFloat?: boolean;
};
/**
 * Guard that parse environment variable and returns a number anyway
 * 
 * Returns `0` if parse was not successfully
 *
 * @export
 * @param {(string | undefined)} variable variable to parse
 * @param {Options} [options] parsing options
 * @return {*} number
 */
const numberGuard = define((variable: string | undefined, options?: Options) => {
  assertString(variable, { strict: options?.throwOnUndefined, error: new TypeError('numberGuard. variable is undefined') });
  const fallback = options?.fallback ?? 0;
  if (variable === undefined) {
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
  if (options?.throwOnInteger && Number.isInteger(floatValue)) {
    throw new TypeError('numberGuard. variable is integer');
  }
  if (options?.throwOnFloat && !Number.isInteger(floatValue)) {
    throw new TypeError('numberGuard. variable is floating');
  }
  if (isSafe && Number.isFinite(floatValue)) {
    return floatValue;
  }
  return fallback;
});

export default numberGuard;
