# dotenv guards

guards functions for dotenv package

## installation

```bash
npm i dotenv dotenv-guards
```

## usage

```js
import { numberGuard } from 'dotenv-guards';

const jobsAsNumber = numberGuard(process.env.jobs, 2); // return 2 if jobs is not a number

// or via default import
import booleanGuard from 'dotenv-guards/boolean';
```

## Available guards

- `numberGuard` - parse a string to a number. (`/number`)
- `enumGuard` - parse a string to an enum. (`/enum`)
- `booleanGuard` - parse a string to a boolean. (`/boolean`)
- `arrayGuard` - parse a string to an array. (`/array`)

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

### boolean guard

```javascript
boolean(value, fallbackValue, options)
```

Options:

- `trueSymbols` - Array of possible values which will be converted as `true`.
- `throwOnUndefined` Throw an error if incoming value is undefined, fallback value is not returned, since it returns an error.
- `throwOnFail` - Throw an error if incoming value is not matching with `trueSymbols` option.

### enum guard

```javascript
enum(value, arrayOfPossibleValues, fallbackValue)
```

### array guard

```javascript
array(value, arrayOfPossibleValues, options)
```

Options:

- `strict` - If `true` throwing an error if at least one element is not matched.
- `separator` - Separator for incoming value string. Default is `,`.

