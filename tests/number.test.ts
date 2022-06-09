import numberGuard from '../src/number';

test('should returns int number for stringified int value', () => {
  const actual = numberGuard('1');
  expect(actual).toBe(1);
});
test('should returns int number for stringified int value with providing fallback value', () => {
  const actual = numberGuard('0', 1);
  expect(actual).toBe(0);
});
test('should returns int number for non integer string with fallback value', () => {
  const actual = numberGuard('some not a number string', 1);
  expect(actual).toBe(1);
});
test('should returns 0 for NaN string value without providing fallback value', () => {
  const actual = numberGuard('NaN');
  expect(actual).toBe(0);
});

test('should returns number for NaN string value with providing fallback value', () => {
  const actual = numberGuard('NaN', 5);
  expect(actual).toBe(5);
});

test('should returns number for NaN string value with providing fallback value', () => {
  const actual = numberGuard('NaN', 5);
  expect(actual).toBe(5);
});

test('should not throws an "TypeError" if "throwOnUndefined:false"', () => {
  expect(numberGuard(undefined, 5, { throwOnUndefined: false })).toBe(5);
});

test('should throws "TypeError" if "throwOnUndefined:true"', () => {
  expect(() => numberGuard(undefined, 5, { throwOnUndefined: true })).toThrowError(TypeError);
});

test('should throws "TypeError" if "throwOnNaN:true"', () => {
  expect(() => numberGuard('NaN', 5, { throwOnNaN: true })).toThrowError(TypeError);
});

test('should throws "TypeError" if "throwOnNaN:true" for any non-number string', () => {
  expect(() => numberGuard('random string', 5, { throwOnNaN: true })).toThrowError(TypeError);
});

test('should throws "TypeError" if "throwOnFinite:true" for Infinite-like string', () => {
  expect(() => numberGuard('Infinity', 5, { throwOnFinite: true })).toThrowError(TypeError);
});

test('should throws "TypeError" if "throwOnSafeInteger:true" for non a number string', () => {
  expect(() => numberGuard('long string', 5, { throwOnSafeInteger: true })).toThrowError(RangeError);
});

test('should throws "TypeError" if "throwOnSafeInteger:true" for Infinity-like string', () => {
  expect(() => numberGuard('Infinity', 5, { throwOnSafeInteger: true })).toThrowError(RangeError);
});

test('should throws "TypeError" if "throwOnSafeInteger:true" for Number.MAX_SAFE_INTEGER+10 string', () => {
  expect(() => numberGuard(String(Number.MAX_SAFE_INTEGER) + '10', 5, { throwOnSafeInteger: true })).toThrowError(RangeError);
});
