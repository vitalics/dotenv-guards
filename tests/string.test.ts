import stringGuard from '../src/string';

test('should returns the same string if fallback value is not provided ', () => {
  const actual = stringGuard('qwe');
  expect(actual).toBe('qwe');
});
test('should returns undefined if input value is undefined and no fallback is not provided', () => {
  const actual = stringGuard(undefined);
  expect(actual).toBe('');
});
test('should returns fallback value if input variable is undefined and fallback value is provided', () => {
  const actual = stringGuard(undefined, { fallback: 'fallback' });
  expect(actual).toBe('fallback');
});
test('should thrown an error if input variable is undefined and throwOnUndefined = true', () => {
  expect(() => stringGuard(undefined, { throwOnUndefined: true })).toThrowError(TypeError);
});

test('should thrown an error if input variable is undefined and throwOnNullable = true', () => {
  expect(() => stringGuard(undefined, { throwOnNullable: true })).toThrowError(TypeError);
});
test('should thrown an error if input variable is "undefined" and throwOnNullable = true', () => {
  expect(() => stringGuard("undefined", { throwOnNullable: true })).toThrowError(TypeError);
});
test('should thrown an error if input variable is "null" and throwOnNullable = true', () => {
  expect(() => stringGuard("null", { throwOnNullable: true })).toThrowError(TypeError);
});

test('should thrown an error if input variable is null and throwOnNullable = true', () => {
  // @ts-expect-error
  expect(() => stringGuard(null, { throwOnNullable: true })).toThrowError(TypeError);
});

test('should return regexp match if input variable is matched by regexp', () => {
  const actual = stringGuard('qweasd', { regexp: /qwe/ });
  expect(actual).toBe('qwe');
});

test('should return value if input variable is matched by matcher function', () => {
  const actual = stringGuard('qweasd', {
    matcher(value) {
      return value.includes('qwe')
    },
  });
  expect(actual).toBe('qweasd');
});

test('should return input value if input variable is not matched by matcher function', () => {
  const actual = stringGuard('qweasd', {
    matcher(value) {
      return value.includes('asdf')
    },
  });
  expect(actual).toBe('qweasd');
});

test('should throw an error if input variable is not matched by matcher function and throwOnMismatch=true', () => {
  expect(() => stringGuard('qweasd', {
    matcher(value) {
      return value.includes('asdf')
    },
    throwOnMismatch: true,
  })).toThrowError(TypeError);
});

test('should throw an error if incoming variable is not a string or undefined', () => {
  // @ts-expect-error
  expect(() => stringGuard(null)).toThrowError(TypeError);
});
