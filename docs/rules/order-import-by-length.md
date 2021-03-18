# Order imports by line length (import-order-aesthetic)

## Rule Details

Examples of **correct** code for this rule:

```js
import { abc } from "testing";
import { x } from "tester";
import { y } from "test";
```

```js
import { x } from "test";
import { y } from "tester";
import { abc } from "testing";
```

Examples of **incorrect** code for this rule:

```js
import { x } from "test";
import { abc } from "testing";
import { y } from "tester";
```

## Options

### reverseOrder

The default behaviour of this rule is a 'top-heavy' order. Set `reverseOrder` to `true` to use a 'bottom-heavy' order.

- `false` (default)
- `true`

```js
"import-order-aesthetic/order-import-by-length": ['error', { reverseOrder: true }],
```

## When Not To Use It

If you want to order your imports by something sensible...
