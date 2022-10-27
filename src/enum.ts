import { assertString } from './assert';
import define from './define';

/**
 * Guard that parse environment variable and returns a first including of provided `values`.
 * 
 * Returns `null` if parse was not successfully and string is not matched with `values`
 *
 * @export
 * @template S
 * @param {(string | undefined)} variable environment variable to parse
 * @param {readonly} values enum values
 * @param {S} [fallbackValue] fallback value if parse was not successful.
 * @return {*} matched value, `fallbackValue` or `RangeError`.
 * @example
 * enumGuard('1', ['1', '2']); //1
 * enumGuard('5', ['1', '2'], '3'); //3, fallbackValue is '3'
 * enumGuard('5', ['1', '2']); // Unable process 5 from list: [1,2]
 * enumGuard('5', ['1', '2'], null); // null, fallback value is null
 */
const enumGuard = define(<S extends string>(variable: string | undefined, values: readonly S[], fallbackValue?: string | null): typeof fallbackValue extends null ? S | null : S => {
  assertString(variable);
  const result = values.find(v => v === variable);
  if (!result && !fallbackValue && fallbackValue !== null) {
    throw new RangeError(`Unable process ${variable} from list: ${values}`);
  }
  return (result || fallbackValue) as S;
});

export default enumGuard;
