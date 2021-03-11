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
    }
  });

var ruleTester = new RuleTester();
ruleTester.run('order-import-by-length', rule, {

    valid: [
        {
            code: `
            import { x } from 'test';
            import { y } from 'tester';
            import { abc } from 'testing';
            `,
            options: [ 'always', { reverseOrder: true } ],
            errors: [{
                message: 'Imports are not ordered aesthetically.',
                type: 'ImportDeclaration'
            }]
        }
    ],

    invalid: [
        {
            code: `
            import { abc } from 'testing';
            import { x } from 'test';
            import { y } from 'tester';
            `,
            options: [ 'always', { reverseOrder: false } ],
            errors: [{
                message: 'Imports are not ordered aesthetically.',
                type: 'ImportDeclaration'
            }]
        },
        {
            code: `
            import { x } from 'test';
            import { abc } from 'testing';
            import { y } from 'tester';
            `,
            options: [ 'always', { reverseOrder: true } ],
            errors: [{
                message: 'Imports are not ordered aesthetically.',
                type: 'ImportDeclaration'
            }]
        }
    ]
});
