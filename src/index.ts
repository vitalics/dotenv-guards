import arrayGuard from './array';
import booleanGuard from './boolean';
import enumGuard from './enum';
import numberGuard from './number';
import stringGuard from './string';
import define from './define';
import revoke from './revoke';

export { arrayGuard, booleanGuard, enumGuard, numberGuard, stringGuard, define, revoke };
export default { array: arrayGuard, boolean: booleanGuard, enum: enumGuard, number: numberGuard, string: stringGuard, define, revoke };
