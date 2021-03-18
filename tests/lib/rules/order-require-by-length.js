/**
 * @fileoverview Order require statements by line length
 * @author Recidvst
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/order-require-by-length"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
});

class errorTemplate {
  constructor(output, message, messageId) {
    this.message = message || "Require statements are not ordered aesthetically.";
    this.type = "VariableDeclaration";
    this.suggestions = [
      {
        messageId: messageId || "orderRequireByLength",
        output: output,
      },
    ];
  }
}

var ruleTester = new RuleTester();
ruleTester.run("order-require-by-length", rule, {
  valid: [
    // valid and in standard order
    {
      code: `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`,
      options: [{ reverseOrder: false }],
      output: `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`,
      errors: [
        new errorTemplate(
          `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`
        ),
        new errorTemplate(
          `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`
        ),
        new errorTemplate(
          `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`
        ),
        new errorTemplate(
          `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`
        ),
      ],
    },
    // valid and in reversed order
    {
      code: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`,
      options: [{ reverseOrder: true }],
      output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`,
      errors: [
        new errorTemplate(
          `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`
        ),
        new errorTemplate(
          `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`
        ),
        new errorTemplate(
          `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`
        ),
        new errorTemplate(
          `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`
        ),
      ],
    },
    // valid when only one item
    {
      code: `const c = require('test');`,
      options: [{ reverseOrder: true }],
      output: `const c = require('test');`,
      errors: [
        new errorTemplate(`const c = require('test');`),
        new errorTemplate(`const c = require('test');`),
        new errorTemplate(`const c = require('test');`),
        new errorTemplate(`const c = require('test');`),
      ],
    },
  ],

  invalid: [
    // invalid because not in correct order (standard)
    {
      code: `const a = require('testing');\nconst c = require('test');\nconst e = require('btester');\nconst f = require('atester');`,
      options: [{ reverseOrder: false }],
      output: `const f = require('atester');\nconst e = require('btester');\nconst a = require('testing');\nconst c = require('test');`,
      errors: [
        // new errorTemplate(`const f = require('atester');\nconst e = require('btester');\nconst a = require('testing');\nconst c = require('test');`),
        // new errorTemplate(`const f = require('atester');\nconst e = require('btester');\nconst a = require('testing');\nconst c = require('test');`),
        // new errorTemplate(`const f = require('atester');\nconst e = require('btester');\nconst a = require('testing');\nconst c = require('test');`),
        // new errorTemplate(`const f = require('atester');\nconst e = require('btester');\nconst a = require('testing');\nconst c = require('test');`),
      ],
    },
    //   // invalid because not in correct order (reversed)
    //   {
    //     code: `const a = require('testing');\nconst c = require('test');\nconst f = require('btester');\nconst e = require('atester');`,
    //     options: [{ reverseOrder: true }],
    //     output: `const c = require('test');\nconst a = require('testing');\nconst e = require('atester');\nconst f = require('btester');`,
    //     errors: [
    //       new errorTemplate(`const c = require('test');\nconst a = require('testing');\nconst e = require('atester');\nconst f = require('btester');`),
    //       new errorTemplate(`const c = require('test');\nconst a = require('testing');\nconst e = require('atester');\nconst f = require('btester');`),
    //       new errorTemplate(`const c = require('test');\nconst a = require('testing');\nconst e = require('atester');\nconst f = require('btester');`),
    //       new errorTemplate(`const c = require('test');\nconst a = require('testing');\nconst e = require('atester');\nconst f = require('btester');`),
    //     ],
    //   },
    //   // invalid because arrays are different lengths
    //   {
    //     code: `const lengthtest = require('break-test');\nconst a = require('testing');\nconst c = require('test');\nconst b = require('tester');`,
    //     options: [{ reverseOrder: true }],
    //     output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst lengthtest = require('break-test');`,
    //     errors: [
    //       new errorTemplate(`const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst lengthtest = require('break-test');`),
    //       new errorTemplate(`const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst lengthtest = require('break-test');`),
    //       new errorTemplate(`const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst lengthtest = require('break-test');`),
    //       new errorTemplate(`const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst lengthtest = require('break-test');`),
    //     ],
    //   },
    //   // invalid because one array is null
    //   {
    //     code: `const nulltest = require('break-test');\nconst a = require('testing');\nconst c = require('test');\nconst b = require('tester');`,
    //     options: [{ reverseOrder: true }],
    //     output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst nulltest = require('break-test');`,
    //     errors: [
    //       new errorTemplate(`const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst nulltest = require('break-test');`),
    //       new errorTemplate(`const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst nulltest = require('break-test');`),
    //       new errorTemplate(`const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst nulltest = require('break-test');`),
    //       new errorTemplate(`const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst nulltest = require('break-test');`),
    //     ],
    //   },
    //   // invalid because one array is empty
    //   {
    //     code: ``,
    //     options: [{ reverseOrder: true }],
    //     errors: [
    //       new errorTemplate(`valid require statement;`, `Require statements are empty or otherwise invalid.`, `orderRequireInvalid`),
    //     ],
    //   },
  ],
});
