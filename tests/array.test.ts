import arrayGuard from '../src/array';

test('should parse string that not mathed as params and returns null', () => {
  const actual = arrayGuard('zxc', ['NaN', 'qwe']);
  expect(actual.length).toBe(1);
  expect(actual[0]).toBeNull();
});
test('should parse string that matched as params and returns null', () => {
  const actual = arrayGuard('qwe', ['NaN', 'qwe']);
  expect(actual.length).toBe(1);
  expect(actual[0]).toBe('qwe');
});
test('should parse string with "," symbol as separator and returns array of 2 values', () => {
  const actual = arrayGuard('qwe,zxc', ['NaN', 'qwe']);
  expect(actual.length).toBe(2);
  expect(actual[0]).toBe('qwe');
  expect(actual[1]).toBeNull();
});

test('should parse string with ";" symbol as separator and returns array of 1 values', () => {
  const actual = arrayGuard('qwe,zxc', ['NaN', 'qwe'], { separator: ';' });
  expect(actual.length).toBe(1);
  expect(actual[0]).toBeNull();
});

test('should parse string in strict mode and returns array of 1 values', () => {
  const actual = arrayGuard('qwe', ['NaN', 'qwe'], { strict: true });
  expect(actual.length).toBe(1);
  expect(actual[0]).toBe('qwe');
});

test('should parse string in strict mode and throws an error', () => {
  const actual = () => arrayGuard('zxc', ['NaN', 'qwe'], { strict: true });
  expect(actual).toThrowError(Error);
});

test('should throw an error if incoming variable is not a string or undefined', () => {
  // @ts-expect-error
  expect(() => arrayGuard(null)).toThrowError(TypeError);
});
