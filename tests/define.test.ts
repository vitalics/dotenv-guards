import { isProxy } from 'util/types';

import define from '../src/define';

test('should returns function', () => {
  const fn = define(() => {
    return;
  })
  expect(typeof fn).toBe('function');
});

test('should throw an error if first incoming variable is not a string', () => {
  // @ts-expect-error
  expect(() => define('NaN')).toThrowError(TypeError);
});

test('should returns function', () => {
  const fn = define((val: string | undefined) => {
    return !!val;
  });
  const valid = fn('qwe');
  expect(valid).toBeTruthy();
});

test('should throw an error in case of first element is not a string', () => {
  const fn = define((val: string | undefined) => {
    return !!val;
  });
  // @ts-expect-error
  expect(() => fn(1234)).toThrowError(TypeError);
});

test('should returns proxy object', () => {
  const fn = define((val: string | undefined) => {
    return !!val;
  });
  expect(isProxy(fn)).toBeTruthy();
});

