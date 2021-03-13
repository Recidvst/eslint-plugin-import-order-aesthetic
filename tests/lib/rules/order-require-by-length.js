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

var ruleTester = new RuleTester();
ruleTester.run("order-require-by-length", rule, {
  valid: [
    // valid and in standard order
    {
      code: `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`,
      options: ["always", { reverseOrder: false }],
      output: `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`,
      errors: [
        {
          message: "Require statements are not ordered aesthetically.",
          type: "VariableDeclaration",
          suggestions: [
            {
              messageId: "orderRequireByLength",
              output: `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`,
            },
          ],
        },
      ],
    },
    // valid and in reversed order
    {
      code: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`,
      options: ["always", { reverseOrder: true }],
      output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`,
      errors: [
        {
          message: "Require statements are not ordered aesthetically.",
          type: "VariableDeclaration",
          suggestions: [
            {
              messageId: "orderRequireByLength",
              output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`,
            },
          ],
        },
      ],
    },
    // valid when only one item
    {
      code: `const c = require('test');`,
      options: ["always", { reverseOrder: true }],
      output: `const c = require('test');`,
      errors: [
        {
          message: "Require statements are not ordered aesthetically.",
          type: "VariableDeclaration",
          suggestions: [
            {
              messageId: "orderRequireByLength",
              output: `const c = require('test');`,
            },
          ],
        },
      ],
    },
  ],

  invalid: [
    // invalid because not in correct order (standard)
    {
      code: `const a = require('testing');\nconst c = require('test');\nconst b = require('tester');`,
      options: ["always", { reverseOrder: false }],
      output: `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`,
      errors: [
        {
          message: "Require statements are not ordered aesthetically.",
          type: "VariableDeclaration",
          suggestions: [
            {
              messageId: "orderRequireByLength",
              output: `const a = require('testing');\nconst b = require('tester');\nconst c = require('test');`,
            },
          ],
        },
      ],
    },
    // invalid because not in correct order (reversed)
    {
      code: `const a = require('testing');\nconst c = require('test');\nconst b = require('tester');`,
      options: ["always", { reverseOrder: true }],
      output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`,
      errors: [
        {
          message: "Require statements are not ordered aesthetically.",
          type: "VariableDeclaration",
          suggestions: [
            {
              messageId: "orderRequireByLength",
              output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');`,
            },
          ],
        },
      ],
    },
    // invalid because arrays are different lengths
    {
      code: `const lengthtest = require('break-test');\nconst a = require('testing');\nconst c = require('test');\nconst b = require('tester');`,
      options: ["always", { reverseOrder: true }],
      output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst lengthtest = require('break-test');`,
      errors: [
        {
          message: "Require statements are not ordered aesthetically.",
          type: "VariableDeclaration",
          suggestions: [
            {
              messageId: "orderRequireByLength",
              output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst lengthtest = require('break-test');`,
            },
          ],
        },
      ],
    },
    // invalid because one array is null
    {
      code: `const nulltest = require('break-test');\nconst a = require('testing');\nconst c = require('test');\nconst b = require('tester');`,
      options: ["always", { reverseOrder: true }],
      output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst nulltest = require('break-test');`,
      errors: [
        {
          message: "Require statements are not ordered aesthetically.",
          type: "VariableDeclaration",
          suggestions: [
            {
              messageId: "orderRequireByLength",
              output: `const c = require('test');\nconst b = require('tester');\nconst a = require('testing');\nconst nulltest = require('break-test');`,
            },
          ],
        },
      ],
    },
  ],
});
