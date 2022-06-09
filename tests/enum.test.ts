import enumGuard from '../src/enum';

test('should returns parsed value without providing fallback value', () => {
  const actual = enumGuard('NaN', ['NaN', 'qwe']);
  expect(actual).toBe('NaN');
});
test('should returns fallback value when test\'s provided', () => {
  const actual = enumGuard('zxc', ['NaN', 'qwe'], 'NaN');
  expect(actual).toBe('NaN');
});

test('should throw an error when fallback value is not provided', () => {
  const actual = () => enumGuard('zxc', ['NaN', 'qwe']);
  expect(actual).toThrowError(Error);
});
