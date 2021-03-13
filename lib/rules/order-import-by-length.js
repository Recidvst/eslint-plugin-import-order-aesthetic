/**
 * @fileoverview Order imports by line length
 * @author Recidvst
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "Order imports by line length",
      category: "Stylistic Issues",
      recommended: true,
      url: "https://github.com/Recidvst/eslint-plugin-import-order-aesthetic",
      suggestion: true,
    },
    messages: {
      orderImportsByLength: "Order your imports by line length because it looks better :)",
      orderImportsInvalid: "Imports are empty or otherwise invalid.",
    },
    fixable: "code",
    schema: [
      {
        enum: ["always", "never"],
      },
      {
        type: "object",
        properties: {
          reverseOrder: {
            type: "boolean",
          },
        },
      },
    ],
  },

  create: function (context) {
    // variables should be defined here
    let statementArr = [];
    let sortedArr = [];
    let testNode = null;

    const ENV = process.env.NODE_ENV;

    // get source
    const sourceCode = context.getSourceCode();

    // get rule option
    const optionOrderReversed = context.options[1] && context.options[1].reverseOrder;

    //----------------------------------------------------------------------
    // Helpers
    //---------------------------------------------- ------------------------

    // check if two arrays match
    const doArraysMatch = function (arr1, arr2) {
      // Check if the arrays exist
      if (arr1 == null || arr2 == null) return false;
      // Check if the arrays are the same length
      if (arr1.length !== arr2.length) return false;
      // Check if all items exist and are in the same order
      for (var i = 0; i < arr1.length; i++) {
        if (arr1[i].length !== arr2[i].length) {
          return false;
        }
      }
      return true;
    };

    // pass fixer fn to context report fix param
    const fixerFunction = function (fixer, source, node, correctArr) {
      let fixerArr = [];
      for (var f = 0; f < node.body.length; f++) {
        fixerArr.push(
          fixer.replaceTextRange(
            [node.body[f].range[0], node.body[f].range[1]],
            source.getText(correctArr[f].node)
          )
        );
      }
      return fixerArr;
    };

    return {
      // handle imports (es modules)
      ImportDeclaration: function (node) {
        if (node.specifiers.length && node.range.length) {
          const length = node.range.reduce((acc, cur) => cur - acc); // get length of string from range
          statementArr.push({
            node,
            length,
          });
          sortedArr.push({
            node,
            length,
          });
        }

        // sort fn
        if (sortedArr.length > 0) {
          sortedArr.sort(function (a, b) {
            // get string values for alphabetic comparison
            const aText = sourceCode.getText(a.node);
            const bText = sourceCode.getText(b.node);
            // sort by length
            if (optionOrderReversed) {
              return a.length - b.length || aText.localeCompare(bText);
            } else {
              return b.length - a.length || bText.localeCompare(aText);
            }
          });
        }
        testNode = node; // set control var to ImportDeclaration node
      },
      // triggered when all imports have been checked
      onCodePathEnd: function (codePath, node) {

        if (statementArr && statementArr.length > 0 && sortedArr && sortedArr.length > 0) {
          // just for testing - if array builder fails and the arrays are different lengths, doArraysMatch should return false
          if (
            ENV === "testing" &&
            sourceCode.getText(statementArr[0].node) === "import { lengthtest } from 'break-test';"
          ) {
            for (var s = 0; s < sortedArr.length; s++) {
              statementArr.push(sortedArr[s]);
            }
          }

          // just for testing - if array builder fails and one is null, doArraysMatch should return false
          if (
            ENV === "testing" &&
            sourceCode.getText(statementArr[0].node) === "import { nulltest } from 'break-test';"
          ) {
            statementArr = null;
          }

          // after analysing the code path, validate rule and return report
          if (!doArraysMatch(statementArr, sortedArr)) {
            // send report if arrays don't match
            context.report({
              node: testNode,
              message: "Imports are not ordered aesthetically.",
              suggest: [
                {
                  messageId: "orderImportsByLength",
                  fix: function (fixer) {
                    return fixerFunction(fixer, sourceCode, node, sortedArr);
                  },
                },
              ],
              // fix method to re-order statements
              fix: function (fixer) {
                return fixerFunction(fixer, sourceCode, node, sortedArr);
              },
            });
          }

        }
        else {
          // send report if arrays are empty or null
          context.report({
            loc: node.loc,
            message: "Imports are empty or otherwise invalid.",
            suggest: [
              {
                messageId: "orderImportsInvalid",
                fix: function (fixer) {
                  return fixer.replaceText(node, 'valid import statement;');
                },
              },
            ],
          });
        }

      },
    };
  },
};
