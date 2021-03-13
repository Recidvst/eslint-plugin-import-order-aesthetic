# Order require statements by line length (order-require-by-length)

## Rule Details

Examples of **correct** code for this rule:

```js
const a = require("test");
const b = require("tester");
const c = require("testing");
```

```js
const c = require("testing");
const b = require("tester");
const a = require("test");
```

Examples of **incorrect** code for this rule:

```js
const a = require("test");
const c = require("testing");
const b = require("tester");
```

### Options

#### reverseOrder

The default behaviour of this rule is a 'top-heavy' order. Set `reverseOrder` to `true` to use a 'bottom-heavy' order.

- false (default)
- true

```js
'reverseOrder': true
```

## When Not To Use It

If you want to order your require statements by something sensible...
