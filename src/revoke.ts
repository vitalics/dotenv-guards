import { assertFunction } from './assert';
import { kRevoke } from './constants';

/**
 * Revokes guard function.
 *
 * It uses `Proxy.revokable`, after `revoke` function - each function calling will throw an error
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable
 *
 * @export
 * @param {Function} fn reference returned from `define`.
 */
export default function revoke(fn: Function) {
  const revokeFn = (fn as any)[kRevoke] as unknown;
  try {
    assertFunction(revokeFn);
  } catch (e) {
    throw new ReferenceError(`Unable to revoke function "${fn.name}"`);
  }
  revokeFn();
}
