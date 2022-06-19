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

## API

### numberGuard

```javascript
numberGuard(value, fallbackValue, options)
```

Options:

- `throwOnFinite` - Throws an error if incoming value parsed to `Infinity`
- `throwOnNaN` - Throws an error if incoming value parsed to `NaN`
- `throwOnUndefined` - If `true` throwing an error if incoming value is undefined
- `throwOnSafeInteger` - Throws an error if incoming value is not safe integer

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

Options:

- `fallback` - fallback value if incoming value is not a boolean and cannot parse value to boolean.
- `trueSymbols` - Array of possible values which will be converted as `true`.
- `throwOnUndefined` Throw an error if incoming value is undefined, fallback value is not returned, since it returns an error.
- `throwOnFail` - Throw an error if incoming value is not matching with `trueSymbols` option.

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

Options:

- `strict` - If `true` throwing an error if at least one element is not matched.
- `separator` - Separator for incoming value string. Default is `,`.

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

Options:

- `fallback` - fallback value if incoming value is not matched by regex or matcher function.
- `throwOnUndefined` - Throw an error if incoming value is undefined, fallback value is not returned, since it returns an error.
- `regexp` - Regexp for incoming value. Returns first match.
- `throwOnNullable` - Throw an error if incoming value is null, undefined, empty string or empty array.
- `matcher` - Matcher function for incoming value. Returns boolean(is matched incoming string or not).
- `throwOnMismatch` - Throw an error if incoming value is not matched by regex or matcher function.

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
