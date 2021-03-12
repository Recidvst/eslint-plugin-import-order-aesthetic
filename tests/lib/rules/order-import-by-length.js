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
         }
     ]
 });
 