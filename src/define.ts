import { assertFunction, assertString } from './assert';
import { kRevoke } from './constants';

/**
 * Define new guard function
 *
 * @example
 * const booleanGuard = defineGuard((val: string | undefined) => {
 *  return !!val
 * });
 * @template Result Transformed value
 * @param {Function} fn guard definition
 * @return {*}
 */
export default function define<Result, Args extends unknown[] = []>(fn: (variable?: string, ...args: Args) => Result): (envLike: string | undefined, ...args: Args) => Result {
  assertFunction(fn);
  const { proxy, revoke } = Proxy.revocable(fn, {
    apply(target: any, thisArg: any, argArray: any[]) {
      assertString(argArray[0]);
      return Reflect.apply(target, thisArg, argArray);
    },
  });
  (fn as any)[kRevoke] = revoke;
  return proxy;
}
