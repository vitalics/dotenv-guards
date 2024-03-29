import numberGuard from '../src/number';

test('should returns int number for stringified int value', () => {
  const actual = numberGuard('1');
  expect(actual).toBe(1);
});
test('should returns int number for stringified int value with providing fallback value', () => {
  const actual = numberGuard('0', { fallback: 1 });
  expect(actual).toBe(0);
});
test('should returns int number for non integer string with fallback value', () => {
  const actual = numberGuard('some not a number string', { fallback: 1 });
  expect(actual).toBe(1);
});
test('should returns 0 for NaN string value without providing fallback value', () => {
  const actual = numberGuard('NaN');
  expect(actual).toBe(0);
});

test('should returns number for NaN string value with providing fallback value', () => {
  const actual = numberGuard('NaN', { fallback: 5 });
  expect(actual).toBe(5);
});

test('should returns number for NaN string value with providing fallback value', () => {
  const actual = numberGuard('NaN', { fallback: 5 });
  expect(actual).toBe(5);
});

test('should not throws an "TypeError" if "throwOnUndefined:false"', () => {
  expect(numberGuard(undefined, { fallback: 5, throwOnUndefined: false })).toBe(5);
});

test('should throws "TypeError" if "throwOnUndefined:true"', () => {
  expect(() => numberGuard(undefined, { fallback: 5, throwOnUndefined: true })).toThrowError(TypeError);
});

test('should throws "TypeError" if "throwOnNaN:true"', () => {
  expect(() => numberGuard('NaN', { fallback: 5, throwOnNaN: true })).toThrowError(TypeError);
});

test('should throws "TypeError" if "throwOnNaN:true" for any non-number string', () => {
  expect(() => numberGuard('random string', { fallback: 5, throwOnNaN: true })).toThrowError(TypeError);
});

test('should throws "TypeError" if "throwOnFinite:true" for Infinite-like string', () => {
  expect(() => numberGuard('Infinity', { fallback: 5, throwOnFinite: true })).toThrowError(TypeError);
});

test('should throws "RangeError" if "throwOnSafeInteger:true" for non a number string', () => {
  expect(() => numberGuard('long string', { fallback: 5, throwOnSafeInteger: true })).toThrowError(RangeError);
});

test('should throws "RangeError" if "throwOnSafeInteger:true" for Infinity-like string', () => {
  expect(() => numberGuard('Infinity', { fallback: 5, throwOnSafeInteger: true })).toThrowError(RangeError);
});

test('should throws "RangeError" if "throwOnSafeInteger:true" for Number.MAX_SAFE_INTEGER+10 string', () => {
  expect(() => numberGuard(String(Number.MAX_SAFE_INTEGER) + '10', { fallback: 5, throwOnSafeInteger: true })).toThrowError(RangeError);
});

test('should throws "TypeError" if "throwOnInteger:true" for integer-like value', () => {
  expect(() => numberGuard(String(12.0), { fallback: 5, throwOnInteger: true })).toThrowError(TypeError);
});

test('should throws "TypeError" if "throwOnFloat:true" for float-like value', () => {
  expect(() => numberGuard(String(12.2), { fallback: 5, throwOnFloat: true })).toThrowError(TypeError);
});

test('should throw an error if incoming variable is not a string or undefined', () => {
  // @ts-expect-error
  expect(() => numberGuard(null)).toThrowError(TypeError);
});
