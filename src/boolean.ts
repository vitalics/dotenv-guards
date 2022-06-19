import { assertString } from './assert';

type DefaultTrueSymbols = ['true', '1']
export type Parse<
  S extends string,
  Fallback = false,
  TrueSymbols extends string[] | readonly string[] = DefaultTrueSymbols
  > =
  TrueSymbols extends readonly string[] ? S extends TrueSymbols[number] ? true : S extends DefaultTrueSymbols[number] ? true : Fallback extends undefined ? false : Fallback : false;

export type Options<TrueSymbols extends readonly string[] | string[] = DefaultTrueSymbols> = {
  /**
   * Array of possible values which will be converted as `true`.
   * 
   * @default
   * ['1', 'true']
   */
  trueSymbols?: TrueSymbols;
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
export default function booleanGuard<
  S extends string,
  Fallback extends boolean = false,
  TrueSymbols extends readonly string[] | string[] = DefaultTrueSymbols,
  >
  (
    variable: S | undefined,
    fallback: Fallback = false as Fallback,
    options?: Options<TrueSymbols>
  ): Parse<S, Fallback, TrueSymbols> {
  assertString(variable);
  const defaultTrueSymbols = ['1', 'true'] as const;
  if (variable === undefined) {
    if (options?.throwOnUndefined) {
      throw new TypeError('booleanGuard. variable is undefined');
    }
    return fallback as Parse<S, Fallback, TrueSymbols>;
  }
  // merge default options with provided options
  const trueSymbols = [...new Set(options?.trueSymbols ? [...defaultTrueSymbols, ...options.trueSymbols] : defaultTrueSymbols)];
  const isTrueMatched = trueSymbols.some(symbol => symbol === variable);
  if (isTrueMatched) {
    return true as Parse<S, Fallback, TrueSymbols>;
  } else if (options?.throwOnFail) {
    throw new TypeError(`booleanGuard. variable is not matched with ${trueSymbols}`);
  }
  return fallback as Parse<S, Fallback, TrueSymbols>;
}
