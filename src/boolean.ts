import { assertString } from './assert';

type Options = {
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
 * @param {boolean} [fallbackValue=false]
 * @return {*} parsed value or `TypeError`
 * @example
 * booleanGuard('1'); //true
 * booleanGuard('long string'); //false
 * booleanGuard('long string', true); //true
 * booleanGuard('yes', false, {trueSymbols: ['yes']}); //true
 */
export default function booleanGuard(variable: string | undefined, fallbackValue = false, options?: Options) {
  assertString(variable);
  const defaultTrueSymbols = ['1', 'true'] as const;
  if (variable === undefined) {
    if (options?.throwOnUndefined) {
      throw new TypeError('booleanGuard. variable is undefined');
    }
    return fallbackValue;
  }
  // merge default options with provided options
  const trueSymbols = [...new Set(options?.trueSymbols ? [...defaultTrueSymbols, ...options.trueSymbols] : defaultTrueSymbols)];
  const isTrueMatched = trueSymbols.some(symbol => symbol === variable);
  if (isTrueMatched) {
    return true;
  } else if (options?.throwOnFail) {
    throw new TypeError(`booleanGuard. variable is not matched with ${trueSymbols}`);
  }
  return fallbackValue;
}
