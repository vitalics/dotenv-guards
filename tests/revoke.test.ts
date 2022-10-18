import define from '../src/define';
import revoke from '../src/revoke';

test('should throw an error if function is not declared via "define"', () => {
  expect(() => revoke(jest.fn())).toThrowError(ReferenceError)
});

test('should throw TypeError if calling function after cleanup', () => {
  const fn = define(jest.fn());
  revoke(fn);
  expect(() => fn('')).toThrowError(TypeError);
});
