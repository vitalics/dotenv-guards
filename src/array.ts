import { assertString } from './assert';
import enumGuard from './enum';

type Options = {
  /**
   * If `true` throwing an error if at least one element is not matched
   *
   * @type {boolean}
   */
  strict?: boolean;
  /**
   * Parsing separator
   *
   * @type {(',' | ';' | '|')}
   * @default
   * ','
   */
  separator?: ',' | ';' | '|';
};
/**
 * Guard that parse environment variable and returns an array of parsed values.
 * 
 * Returns `null` for each element if parse was not successfully.
 * 
 * Strict mode throwing an `Error` if at least 1 element is not parsed
 *
 * @export
 * @template S
 * @param {(string | undefined)} variable environment variable
 * @param {readonly} values possible values
 * @param {ArrayGuardOptions} [options]
 * @return {*}  {((S | null)[])} parsed values or `null`
 * @example
 * arrayGuard('1,2,3', ['1', '2', '3'], {separator: ','}); // [1,2,3]
 */
export default function arrayGuard<S extends string, O extends Options = Options>(variable: string | undefined, values: readonly S[] | S[], options?: O): O['strict'] extends true ? S[] : (S | null)[] {
  assertString(variable);
  const separator = options?.separator || ',';

  const result = variable?.split(separator) || [];
  if (options && options.strict) {
    return result.map(element => enumGuard(element, values) as S) as any;
  } else {
    return result.map(res => enumGuard(res, values, null) as S | null) as any;
  }
}
