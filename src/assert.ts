import { ok } from 'assert';

type AssertOptions = {
  strict?: boolean;
  error?: Error;
};
export function assertString(val: unknown, options?: AssertOptions): asserts val is string | undefined {
  if (val === undefined && options?.strict) {
    // @ts-ignore
    throw new TypeError(`Guards. Incoming variable is undefined and strict=true`, { cause: options?.error });
  }
  if (typeof val === 'string' || (val === undefined && !options?.strict)) {
    return;
  }
  // @ts-ignore
  throw new TypeError(`Guards. Incoming variable is not string or undefined. Got "${typeof val}"`, { cause: options?.error });
}

export function assertFunction(val: unknown): asserts val is Function {
  if (typeof val !== 'function') {
    throw new TypeError(`Guards. Incoming value is not a function. Got "${typeof val}"`)
  }
}
