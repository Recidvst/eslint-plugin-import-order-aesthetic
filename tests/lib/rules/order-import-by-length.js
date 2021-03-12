/**
 * @fileoverview Order imports by line length
 * @author Recidvst
 */
 'use strict';

 //------------------------------------------------------------------------------
 // Requirements
 //------------------------------------------------------------------------------
 
 var rule = require('../../../lib/rules/order-import-by-length'), 
 
     RuleTester = require('eslint').RuleTester;
 
 //------------------------------------------------------------------------------
 // Tests
 //------------------------------------------------------------------------------
 
 RuleTester.setDefaultConfig({
     parserOptions: {
       ecmaVersion: 6,
       sourceType: 'module',
       ecmaFeatures: {
         modules: true
       }
     },
   });
 
 var ruleTester = new RuleTester();
 ruleTester.run('order-import-by-length', rule, {
 
     valid: [
        // valid and in standard order
         {
             code: `import { abc } from 'testing';\nimport { y } from 'tester';\nimport { x } from 'test';`,
             options: [ 'always', { reverseOrder: false } ],
             output: `import { abc } from 'testing';\nimport { y } from 'tester';\nimport { x } from 'test';`,
             errors: [{
                 message: 'Imports are not ordered aesthetically.',
                 type: 'ImportDeclaration',
                 suggestions: [{
                     messageId: "orderImportsByLength",
                     output: `import { abc } from 'testing';\nimport { y } from 'tester';\nimport { x } from 'test';`,
                 }],
             }]
         },
         // valid and in reversed order
         {
             code: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';`,
             options: [ 'always', { reverseOrder: true } ],
             output: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';`,
             errors: [{
                 message: 'Imports are not ordered aesthetically.',
                 type: 'ImportDeclaration',
                 suggestions: [{
                     messageId: "orderImportsByLength",
                     output: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';`,
                 }],
             }]
         }
     ],
 
     invalid: [
         // invalid because not in correct order (standard)
         {
             code: `import { abc } from 'testing';\nimport { x } from 'test';\nimport { y } from 'tester';`,
             options: [ 'always', { reverseOrder: false } ],
             output: `import { abc } from 'testing';\nimport { y } from 'tester';\nimport { x } from 'test';`,
             errors: [{
                 message: 'Imports are not ordered aesthetically.',
                 type: 'ImportDeclaration',
                 suggestions: [{
                     messageId: "orderImportsByLength",
                     output: `import { abc } from 'testing';\nimport { y } from 'tester';\nimport { x } from 'test';`,
                 }],
             }]
         },
         // invalid because not in correct order (reversed)
         {
             code: `import { x } from 'test';\nimport { abc } from 'testing';\nimport { y } from 'tester';`,
             options: [ 'always', { reverseOrder: true } ],
             output: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';`,
             errors: [{
                 message: 'Imports are not ordered aesthetically.',
                 type: 'ImportDeclaration',
                 suggestions: [{
                     messageId: "orderImportsByLength",
                     output: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';`,
                 }],
             }]
         },
         // invalid because arrays are different lengths
         {
             code: `import { lengthtest } from 'break-test';\nimport { x } from 'test';\nimport { abc } from 'testing';\nimport { y } from 'tester';`,
             options: [ 'always', { reverseOrder: true } ],
             output: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';\nimport { lengthtest } from 'break-test';`,
             errors: [{
                 message: 'Imports are not ordered aesthetically.',
                 type: 'ImportDeclaration',
                 suggestions: [{
                     messageId: "orderImportsByLength",
                     output: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';\nimport { lengthtest } from 'break-test';`,
                 }],
             }]
         },
         // invalid because one array is null
         {
             code: `import { nulltest } from 'break-test';\nimport { x } from 'test';\nimport { abc } from 'testing';\nimport { y } from 'tester';`,
             options: [ 'always', { reverseOrder: true } ],
             output: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';\nimport { nulltest } from 'break-test';`,
             errors: [{
                 message: 'Imports are not ordered aesthetically.',
                 type: 'ImportDeclaration',
                 suggestions: [{
                     messageId: "orderImportsByLength",
                     output: `import { x } from 'test';\nimport { y } from 'tester';\nimport { abc } from 'testing';\nimport { nulltest } from 'break-test';`,
                 }],
             }]
         }
     ]
 });
 