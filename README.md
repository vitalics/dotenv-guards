# dotenv guards

![dotenv-guards](images/logo.png)

![release status](https://github.com/vitalics/dotenv-guards/actions/workflows/release.yaml/badge.svg)

![tests status](https://github.com/vitalics/dotenv-guards/actions/workflows/pr.yaml/badge.svg)

guards functions for dotenv package

## installation

```bash
npm i dotenv dotenv-guards
```

## usage

```js
import { numberGuard } from 'dotenv-guards';

const jobsAsNumber = numberGuard(process.env.jobs, 2); // return 2 if jobs is not a number
```

## Available guards

- `numberGuard` - parse a string to a number.
- `enumGuard` - parse a string to an enum.
- `booleanGuard` - parse a string to a boolean.
- `arrayGuard` - parse a string to an array.
- `string` - parse string and execute matchers.

## Custom guards

In case if you want to define custom guards - you can use `define` and `revoke` functions.

Example:

``` ts
import { define, revoke } from 'dotenv-guards';

// define new guard
const jsonGuard = define((val: string | undefined) => {
    return JSON.parse(val);
});

jsonGuard('{"qwe": true}'); // returns { qwe: true }

revoke(jsonGuard); // remove json guard

jsonGuard('{"qwe": true}'); // TypeError. jsonGuard is revoked
```

## API

### number guard

```javascript
numberGuard(value, fallbackValue, options)
```

### Parameters

- `value` - [`string`] - string-like variable.
- `options` - [`Object`]
  - `throwOnFinite` - [`boolean`] - Throws an error if incoming value parsed to `Infinity`. Default is `false`.
  - `throwOnNaN` - [`boolean`] - Throws an error if incoming value parsed to `NaN`. Default is `false`.
  - `throwOnUndefined` - [`boolean`] - If `true` throwing an error if incoming value is undefined. Default is `false`.
  - `throwOnSafeInteger` - [`boolean`] - Throws an error if incoming value is not safe integer. Default is `false`.

#### Returns

`string`

Example:

```js
// process.env.jobs = '2'
numberGuard(process.env.jobs); // returns 2 as number

// process.env.jobs = 'not a number string'
numberGuard(process.env.jobs); // returns 0 as number

// process.env.jobs = 'not a number string'
numberGuard(process.env.jobs, 0, {throwOnSafeInteger: true}); //throws an error
```

### boolean guard

```javascript
booleanGuard(value, options)
```

#### Parameters

- value - [`string`] - string-like variable.
- `options` - [`Object`]
  - `fallback` - fallback value if incoming value is not a boolean and cannot parse value to boolean.
  - `trueSymbols` - [`string`] - Array of possible values which will be converted as `true`. Default is `['1', 'true']`
  - `throwOnUndefined` Throw an error if incoming value is undefined, fallback value is not returned, since it returns an error. Default is `false`.
  - `throwOnFail` - Throw an error if incoming value is not matching with `trueSymbols` option. Default is `false`.

#### Returns

`string`

Example:

```javascript
// process.env.isDebug = 'true'
booleanGuard(process.env.isDebug); // returns true

// process.env.acceptDownloading = 'yes'
booleanGuard(process.env.acceptDownloading, false, {trueSymbols: ['yes']}); // returns true since 'yes' is in the array
```

### enum guard

```javascript
enum(value, arrayOfPossibleValues, fallbackValue)
```

### Parameters

- `value` - [`string`] - string-like variable.
- `arrayOfPossibleValues` - [`Array<string>`] - Array of possible values.
- `fallbackValue` - [`string`] - fallback value.

#### Returns

`string`

Example:

``` javascript
// process.env.NODE_ENV = 'test'
enumGuard(process.env.NODE_ENV, ['development', 'production'], 'development'); // returns 'development'

// or define more acceptable values
// process.env.NODE_ENV = 'test'
enumGuard(process.env.NODE_ENV, ['development', 'production', 'test'], 'development'); // returns 'test', since 'test' is in the array
```

### array guard

```javascript
array(value, arrayOfPossibleValues, options)
```

#### Parameters

- `value` - [`string`] - string-like variable.
- `arrayOfPossibleValues` - [`Array<string>`] - If `true` throwing an error if at least one element is not matched.
- `options` - [`Object`]
  - `strict` - [`boolean`] - If `true` throwing an error if at least one element is not matched. Default is `false`.
  - `separator` - [`string`] - Parsing separator. Default is `,`

#### Returns

`string`

Example:

```javascript
// process.env.array = 'val1,val2,val3'
arrayGuard(process.env.array, ['val1', 'val2']); // split string by `,` symbol and returns ['val1', 'val2']

// custom separator
// process.env.array = 'val1;val2;val3'
arrayGuard(process.env.array, ['val1', 'val2', 'val3'], {separator: ';'}); // split string by `;` symbol and returns ['val1', 'val2', 'val3']
```

### string guard

```javascript
string(value, options)
```

#### Parameters

- `value` - [string]. Parsing string-like value.
- `options`
  - `fallback`- [string] - fallback value if incoming value is not matched by regex or matcher function.
  - `throwOnUndefined`- [boolean] - Throw an error if incoming value is undefined, fallback value is not returned, since it returns an error.
  - `regexp`- [RegExp] - Regexp for incoming value. Returns first match.
  - `throwOnNullable` - [boolean] - Throw an error if incoming value is null, undefined, empty string or empty array.
  - `matcher` - [boolean] - Matcher function for incoming value. Returns boolean(is matched incoming string or not).
  - `throwOnMismatch` - [boolean] - Throw an error if incoming value is not matched by regex or matcher function.

#### Returns

`string`

Example:

```javascript
// process.env.token = 'hash123'
stringGuard(process.env.token); // returns hash123

// matcher function
// process.env.token = 'hash123'
arrayGuard(process.env.token, {
    matcher: (value) => value.startsWith('hash'),
}); // returns hash123

// miss matching
// process.env.token = 'hash123'
arrayGuard(process.env.token, {
    matcher: (value) => value.startsWith('random string'),
    fallback: 'qwerty'
}); // returns qwerty, since mismatch
```

### define(fn)

#### Parameters

- `function` - [Function] - First argument should accepts type `string | undefined`, otherwise it throws an `TypeError`

#### returns

Function

### revoke(fn)

#### Parameters

- `function` - [Function] - function reference from `define`. It will throw a `ReferenceError` in case of function is not created from `define`.

#### Returns

void
