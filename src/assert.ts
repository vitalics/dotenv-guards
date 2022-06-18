export function assertString(val: unknown): asserts val is string | undefined {
  if (typeof val === 'string' || val === undefined) {
    return;
  }
  throw new TypeError(`Guards. incoming variable is not string or undefined`);
}
