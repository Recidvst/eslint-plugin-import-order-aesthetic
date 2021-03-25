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
  constructor(
    message = "Require statement is not ordered aesthetically.",
    messageId = "orderRequireByLength",
    type = "VariableDeclaration"
  ) {
    this.message = message;
    this.type = type;
    this.suggestions = [
      {
        messageId: messageId,
      },
    ];
  }

  duplicate(number) {
    return Array.from(Array(number), () => {
      return Object.assign(new errorTemplate(), this);
    });
  }
}

const defaultError = new errorTemplate();

var ruleTester = new RuleTester();
ruleTester.run("order-require-by-length", rule, {
  valid: [
    // valid and in standard order
    {
      code: `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');\nrequire('hello').config();\nrequire('hello');`,
      options: [{ reverseOrder: false }],
      errors: [...defaultError.duplicate(5)],
    },
    // valid and in reversed order
    {
      code: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`,
      options: [{ reverseOrder: true }],
      errors: [...defaultError.duplicate(3)],
    },
    // valid when only one item
    {
      code: `const c = require('test');`,
      options: [{ reverseOrder: true }],
      errors: [defaultError],
    },
  ],

  invalid: [
    // invalid because not in correct order (standard)
    {
      code: `const a = require('testing');\nconst c = require('test');\nconst e = require('btester');\nconst f = require('atester');`,
      options: [{ reverseOrder: false }],
      output: `const f = require('atester');\nconst e = require('btester');\nconst a = require('testing');\nconst c = require('test');`,
      errors: [...defaultError.duplicate(4)],
    },
    // invalid because not in correct order (reversed)
    {
      code: `const a = require('testing');\nconst c = require('test');\nconst f = require('btester');\nconst e = require('atester');`,
      options: [{ reverseOrder: true }],
      output: `const c = require('test');\nconst a = require('testing');\nconst e = require('atester');\nconst f = require('btester');`,
      errors: [...defaultError.duplicate(4)],
    },
    // invalid because one array is null
    {
      code: `const nulltest = require('break-test');\nconst a = require('testing');\nconst c = require('test');\nconst b = require('tester');`,
      options: [{ reverseOrder: true }],
      errors: [
        new errorTemplate(
          "Require statement is empty or otherwise invalid.",
          "orderRequireInvalid",
          "Program"
        ),
      ],
    },
    // invalid because one code is not a require
    {
      code: `const invalid = require('break-test');`,
      options: [{ reverseOrder: true }],
      errors: [
        new errorTemplate(
          `Require statement is empty or otherwise invalid.`,
          `orderRequireInvalid`,
          `VariableDeclaration`
        ),
      ],
    },
    {
      code: `require('break-test');`,
      options: [{ reverseOrder: true }],
      errors: [
        new errorTemplate(
          `Require statement is empty or otherwise invalid.`,
          `orderRequireInvalid`,
          `ExpressionStatement`
        ),
      ],
    },
  ],
});
