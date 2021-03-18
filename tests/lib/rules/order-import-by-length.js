/**
 * @fileoverview Order imports by line length
 * @author Recidvst
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/order-import-by-length"),
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
    message = "Import is not ordered aesthetically.",
    messageId = "orderImportsByLength",
    type = "ImportDeclaration"
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
ruleTester.run("order-import-by-length", rule, {
  valid: [
    // valid and in standard order
    {
      code: `import { abc } from 'testing';\nimport { y } from 'tester';\nimport { x } from 'test';`,
      options: [{ reverseOrder: false }],
      output: `import { abc } from 'testing';\nimport { y } from 'tester';\nimport { x } from 'test';`,
      errors: [...defaultError.duplicate(3)],
    },
    // valid and in reversed order
    {
      code: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';`,
      options: [{ reverseOrder: true }],
      output: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';`,
      errors: [...defaultError.duplicate(3)],
    },
    // valid when only one item
    {
      code: `import { x } from 'test';`,
      options: [{ reverseOrder: true }],
      output: `import { x } from 'test';`,
      errors: [defaultError],
    },
  ],

  invalid: [
    // invalid because not in correct order (standard)
    {
      code: `import { abc } from 'testing';\nimport { x } from 'test';\nimport { y } from 'atester';\nimport { z } from 'btester';`,
      output: `import { abc } from 'testing';\nimport { z } from 'btester';\nimport { y } from 'atester';\nimport { x } from 'test';`,
      options: [{ reverseOrder: false }],
      errors: [...defaultError.duplicate(4)],
    },
    // invalid because not in correct order (reversed)
    {
      code: `import { x } from 'test';\nimport { abc } from 'testing';\nimport { z } from 'btester';\nimport { y } from 'atester';`,
      options: [{ reverseOrder: true }],
      output: `import { x } from 'test';\nimport { y } from 'atester';\nimport { z } from 'btester';\nimport { abc } from 'testing';`,
      errors: [...defaultError.duplicate(4)],
    },
    // invalid because one array is null
    {
      code: `import { nulltest } from 'break-test';\nimport { x } from 'test';\nimport { abc } from 'testing';\nimport { y } from 'tester';`,
      options: [{ reverseOrder: true }],
      errors: [
        new errorTemplate(
          "Import is empty or otherwise invalid.",
          "orderImportsInvalid",
          "Program"
        ),
      ],
    },
    // invalid because one code is not an import
    {
      code: `import { invalid } from 'break-test';`,
      options: [{ reverseOrder: true }],
      errors: [
        new errorTemplate(
          "Import is empty or otherwise invalid.",
          "orderImportsInvalid",
          "ImportDeclaration"
        ),
      ],
    },
  ],
});
