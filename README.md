# eslint-plugin-import-order-aesthetic

Forget alphabetical or chronological ordering, the future is in bringing aesthetic order to import statements.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
npm i eslint --save-dev
```

Next, install `eslint-plugin-import-order-aesthetic`:

```
npm install eslint-plugin-import-order-aesthetic --save-dev
```

## Usage

Add `import-order-aesthetic` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "import-order-aesthetic"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "import-order-aesthetic/order-import-by-length": 2
    }
}
```

## Supported Rules

- import-order-aesthetic/order-import-by-length

## Further Reading

- https://eslint.org/docs/developer-guide/
- https://astexplorer.net/

## Todo

- Finish adding support for reverseOrder option
- Add support for secondary alphabetisation sorting
- Add support for the `--fix` command
- Add support for `require` as well as `import`
