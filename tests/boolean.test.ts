import booleanGuard from '../src/boolean';

test('should returns "false" value without providing fallback value for random string', () => {
  const actual = booleanGuard('NaN');
  expect(actual).toBe(false);
});
test('should throw an error if "throwOnFail: true"', () => {
  expect(() => booleanGuard('NaN', { fallback: false, throwOnFail: true, })).toThrowError(TypeError);
});

test('should returns boolean value with providing fallback value', () => {
  const actual = booleanGuard('NaN', { fallback: true });
  expect(actual).toBe(true);
});

test('should throw an error if "throwOnUndefined: true"', () => {
  expect(() => booleanGuard(undefined, { fallback: true, throwOnUndefined: true })).toThrowError(TypeError);
});

test('should throw an error if incoming variable is not a string or undefined', () => {
  // @ts-expect-error
  expect(() => booleanGuard(null)).toThrowError(TypeError);
});
