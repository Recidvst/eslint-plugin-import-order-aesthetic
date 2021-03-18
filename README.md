# eslint-plugin-import-order-aesthetic

[![npm](https://img.shields.io/npm/dt/eslint-plugin-import-order-aesthetic.svg)](https://www.npmjs.com/package/eslint-plugin-import-order-aesthetic)
[![npm](https://img.shields.io/npm/v/eslint-plugin-import-order-aesthetic.svg)](https://www.npmjs.com/package/eslint-plugin-import-order-aesthetic)
[![Travis (.com)](https://img.shields.io/travis/com/Recidvst/eslint-plugin-import-order-aesthetic.svg)](https://travis-ci.com/Recidvst/eslint-plugin-import-order-aesthetic)
[![Coverage Status](https://coveralls.io/repos/github/Recidvst/eslint-plugin-import-order-aesthetic/badge.svg?branch=master)](https://coveralls.io/github/Recidvst/eslint-plugin-import-order-aesthetic?branch=master)
[![license](https://img.shields.io/github/license/recidvst/eslint-plugin-import-order-aesthetic.svg)](https://github.com/Recidvst/eslint-plugin-import-order-aesthetic/blob/master/LICENSE)

---

Forget alphabetical or chronological ordering, the future is in bringing aesthetic order to import and require statements.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
npm i eslint --save-dev
```

Next, install `eslint-plugin-import-order-aesthetic`:

```
npm install eslint-plugin-import-order-aesthetic --save-dev
```

---

## Requirements

As this rule is linting es6 modules, you are required to add `es6` to the `env` object in your `.eslintrc` configuration.

You will also need to add `sourceType: 'module'` to the `parserOptions` object.

```js
env: {
  es6: true
},
parserOptions: {
  sourceType: 'module'
}
```

---

## Usage

Add `import-order-aesthetic` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["import-order-aesthetic"]
}
```

Configure the [rules](#rules "Rules section of this readme") you want to use under the rules section of your `.eslintrc` configuration file:

```js
{
  "rules": {
    "import-order-aesthetic/order-import-by-length": ['error', { reverseOrder: true }],
    "import-order-aesthetic/order-require-by-length": ['error', { reverseOrder: false }],
  }
}
```

Example `.eslintrc.js` file:

```js
module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  plugins: ["import-order-aesthetic"],
  rules: {
    "import-order-aesthetic/order-import-by-length": [
      "error",
      { reverseOrder: true },
    ],
    "import-order-aesthetic/order-require-by-length": [
      "error",
      { reverseOrder: false },
    ],
  },
};
```

Using `--fix` with your `eslint` command will auto-arrange your import/require statements.

The fix functionality should work automatically with ESLint extensions in your code editor if you have it configured to fix on save etc.

---

## Rules

### `order-import-by-length`

Organise import statements aesthetically by ordering them according to line length and then alphabetically.

### `order-require-by-length`

Organise require statements aesthetically by ordering them according to line length and then alphabetically.

---

## Options

### `reverseOrder`

The default behaviour of both rules rule is a 'top-heavy' order. Set `reverseOrder` to `true` to use a 'bottom-heavy' order.

- `false` (default)
- `true`

Usage:

```js
"import-order-aesthetic/order-import-by-length": ['error', { reverseOrder: true }],
```

Default:

```js
const c = require("testing");
const b = require("tester");
const a = require("test");
```

Reversed:

```js
const a = require("test");
const b = require("tester");
const c = require("testing");
```

---

## Issues

At the moment the two rules are interpreted separately so will assess import and require statements independently. If you mix these two in a single file they will be ordered as normal, but not in relation to each other.

This is on the roadmap, PRs welcome.

---

## When Not To Use It

If you want to order your require statements by something sensible... :)

---

## Roadmap

- Debug potential issue with auto-fixing require statements when using the VSCode ESLint extension - imports work fine.
- Add support for mixed import & require statements
- Potentially refactor the validation logic to be more efficient
