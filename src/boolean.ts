import { assertString } from './assert';

export type Options = {
  /**
   * Fallback value if parsing was wrong
   *
   * @type {boolean}
   */
  fallback?: boolean;
  /**
   * Array of possible values which will be converted as `true`.
   * 
   * @default
   * ['1', 'true']
   */
  trueSymbols?: readonly string[] | string[];
  /**
   * Throw an error if incoming value is undefined, fallback value is not returned, since it returns an error
   * @default
   * undefined
   */
  throwOnUndefined?: boolean;
  /**
   * Throw an error if incoming value is not matching with `trueSymbols` option
   * @default
   * undefined
   */
  throwOnFail?: boolean;
};
/**
 * Guard that parse environment variable and returns a boolean value anyway
 * 
 * Returns `false` if parse was not successfully
 *
 * @export
 * @param {(string | undefined)} variable
 * @param {Options} options Parsing options.
 * @return {*} parsed value or `TypeError`
 * @example
 * booleanGuard('1'); //true
 * booleanGuard('long string'); //false
 * booleanGuard('long string', true); //true
 * booleanGuard('yes', false, {trueSymbols: ['yes']}); //true
 */
export default function booleanGuard(variable: string | undefined, options?: Options): boolean {
  assertString(variable);
  const defaultTrueSymbols = ['1', 'true'] as const;
  const fallback = options?.fallback ?? false;
  if (variable === undefined) {
    if (options?.throwOnUndefined) {
      throw new TypeError('booleanGuard. variable is undefined');
    }
    return fallback;
  }
  // merge default options with provided options
  const trueSymbols = [...new Set(options?.trueSymbols ? [...defaultTrueSymbols, ...options.trueSymbols] : defaultTrueSymbols)];
  const isTrueMatched = trueSymbols.some(symbol => symbol === variable);
  if (isTrueMatched) {
    return true;
  } else if (!isTrueMatched && options?.throwOnFail) {
    throw new TypeError(`booleanGuard. variable is not matched with ${trueSymbols}`);
  }
  return fallback;
}
