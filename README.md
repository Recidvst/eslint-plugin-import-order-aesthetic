[![Travis (.com)](https://img.shields.io/travis/com/Recidvst/eslint-plugin-import-order-aesthetic.svg)](https://travis-ci.com/Recidvst/eslint-plugin-import-order-aesthetic)
[![Coverage Status](https://coveralls.io/repos/github/Recidvst/eslint-plugin-import-order-aesthetic/badge.svg?branch=master)](https://coveralls.io/github/Recidvst/eslint-plugin-import-order-aesthetic?branch=master)
[![license](https://img.shields.io/github/license/recidvst/eslint-plugin-import-order-aesthetic.svg)](https://github.com/Recidvst/eslint-plugin-import-order-aesthetic/blob/master/LICENSE)

# eslint-plugin-import-order-aesthetic

Forget alphabetical or chronological ordering, the future is in bringing aesthetic order to import statements.

_Not yet published as not fully tested._

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
npm i eslint --save-dev
```

Next, install `eslint-plugin-import-order-aesthetic`:

```
npm install eslint-plugin-import-order-aesthetic --save-dev
```

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

## Usage

Add `import-order-aesthetic` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["import-order-aesthetic"]
}
```

Configure the rules you want to use under the rules section of your `.eslintrc` configuration file:

```js
{
  "rules": {
    "import-order-aesthetic/order-import-by-length": ['error', { reverseOrder: true }],
    "import-order-aesthetic/order-require-by-length": ['error', { reverseOrder: false }],
  }
}
```

## Config

### `reverseOrder`

The default behaviour of this rule is a 'top-heavy' order. Set `reverseOrder` to `true` to use a 'bottom-heavy' order.

- `false` (default)
- `true`

```js
'reverseOrder': true
```

e.g.

```js
"import-order-aesthetic/order-import-by-length": ['error', { reverseOrder: true }],
```

## Todo

- Fix bug with null/empty array tests
- Finish testing and checking for edge cases
- Tidy up test files to avoid code duplication
- Publish v1.0.0 as an NPM package
- Potentially refactor the validation logic to be more efficient
