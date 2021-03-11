/**
 * @fileoverview Order imports by line length
 * @author Recidvst
 */
 'use strict';

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Order imports by line length',
      category: 'Stylistic Issues',
      recommended: true,
      url: '', // github repo,
      suggestion: false
    },
    fixable: null, // 'code'
    schema: [
      {
        'enum': ['always', 'never']
      },
      {
        'type': 'object',
        'properties': {
          'reverseOrder': {
            'type': 'boolean'
          }
        }
      }
    ]
  },

  create: function(context) {

    // variables should be defined here
    let statementArr = [];
    let sortedArr = [];
    let testNode = null;

    //----------------------------------------------------------------------
    // Helpers
    //---------------------------------------------- ------------------------

    const doArraysMatch = function (arr1, arr2) {
      // Check if the arrays exist
      if (arr1 === arr2) return true;
      if (arr1 == null || arr2 == null) return false;
      // Check if the arrays are the same length
      if (arr1.length !== arr2.length) return false;
      // Check if all items exist and are in the same order
      for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        };
      };
      return true;   
    }

    return {
      ImportDeclaration: function(node) {
        
        if (node.specifiers.length && node.range.length) { // Ignoring unassigned imports
          const length = node.range.reduce((acc, cur) =>  cur - acc ); // get length of string from range
          statementArr.push(length);
          sortedArr.push(length);
        }

        if (sortedArr.length > 0) {
          // TODO how to also sort by alphabet ? e.g. with localeCompare
          sortedArr.sort(function(a, b) { // sort by length
            return a - b;
          });
        }

        testNode = node; // set control var to ImportDeclaration node

      },
      onCodePathEnd: function(codePath, node) {
        // after analysing the code path, validate rule and return report

        if (!doArraysMatch(statementArr, sortedArr)) {
          context.report({
            node: testNode, 
            message: 'Imports are not ordered aesthetically.',
            // fix: function(fixer) { // fix method to re-order statements
            //   return fixer.replaceText(node, text);
            // } 
          });             
        }
      }

    };
  }
}