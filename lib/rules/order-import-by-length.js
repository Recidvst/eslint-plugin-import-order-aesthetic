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
    fixable: 'code',
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

    // get source
    const sourceCode = context.getSourceCode();

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
        if (arr1[i].length !== arr2[i].length) {
          return false;
        };
      };
      return true;   
    }

    const findRootNode = function(node) {
      let parent = node;
      while (parent.parent != null && parent.parent.body == null) {
        parent = parent.parent;
      }
      return parent;
    }

    return {
      ImportDeclaration: function(node) {
        
        if (node.specifiers.length && node.range.length) { // Ignoring unassigned imports
          const length = node.range.reduce((acc, cur) =>  cur - acc ); // get length of string from range
          statementArr.push({
            node,
            length
          });
          sortedArr.push({
            node,
            length
          });
        }

        // sort fn
        if (sortedArr.length > 0) {
          // TODO how to also sort by alphabet ? e.g. with localeCompare
          sortedArr.sort(function(a, b) { // sort by length
            return a.length - b.length;
          });
        }

        testNode = node; // set control var to ImportDeclaration node

      },
      onCodePathEnd: function(codePath, node) {

        // after analysing the code path, validate rule and return report
        if (!doArraysMatch(statementArr, sortedArr)) {
          // send report if arrays don't match
          context.report({
            node: testNode,
            message: 'Imports are not ordered aesthetically.',
            // fix method to re-order statements
            fix: function(fixer) {
              let fixerArr = [];
              for (var f = 0; f < node.body.length; f++) {
                fixerArr.push(
                  fixer.replaceTextRange(
                  [
                    node.body[f].range[0], node.body[f].range[1]
                  ], 
                  sourceCode.getText(sortedArr[f].node)
                  )
                );
              } 
              return fixerArr;
            } 
          });             
        }
        
      }

    };
  }
}
