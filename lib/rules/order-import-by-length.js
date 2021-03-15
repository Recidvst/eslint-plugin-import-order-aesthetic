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
    let importNodes = [];

    const ENV = process.env.NODE_ENV;

    // get source
    const sourceCode = context.getSourceCode();

    // get rule option
    const optionOrderReversed = context.options[0] && context.options[0].reverseOrder;

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
    const fixerFunction = function (fixer, source, node, sortedArrNode) {
      let fixerArr = [];
      fixerArr.push(
        fixer.replaceTextRange([node.range[0], node.range[1]], source.getText(sortedArrNode.node))
      );
      return fixerArr;
    };

    return {
      // handle imports (es modules)
      ImportDeclaration: function (node) {
        if (node.type === "ImportDeclaration" && node.specifiers.length && node.range.length) {
          const length = node.range.reduce((acc, cur) => cur - acc); // get length of string from range
          statementArr.push({
            node,
            length,
          });
          sortedArr.push({
            node,
            length,
          });

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

          importNodes.push(node);
        }
      },
      // triggered when all imports have been checked
      onCodePathEnd: function (codePath, node) {
        // TESTING
        if (
          ENV === "testing" &&
          statementArr.length > 0 &&
          sourceCode.getText(statementArr[0].node) === "import { nulltest } from 'break-test';"
        ) {
          statementArr = null;
        }

        if (
          ENV === "testing" &&
          (!statementArr || statementArr.length < 1 || !sortedArr || sortedArr.length < 1)
        ) {
          // send report if arrays are empty or null
          context.report({
            loc: node.loc,
            message: "Imports are empty or otherwise invalid.",
            suggest: [
              {
                messageId: "orderImportsInvalid",
                fix: function (fixer) {
                  return fixer.replaceText(node, "valid import statement;");
                },
              },
            ],
          });
        } else if (
          ENV === "testing" &&
          sourceCode.getText(statementArr[0].node) === "import { lengthtest } from 'break-test';"
        ) {
          for (var s = 0; s < sortedArr.length; s++) {
            statementArr.push(sortedArr[s]);
          }
        }

        // after analysing the code path, validate rule and return report
        if (!doArraysMatch(statementArr, sortedArr)) {
          for (var i = 0; i < importNodes.length; i++) {
            // send report if arrays don't match
            context.report({
              node: importNodes[i],
              message: "Imports are not ordered aesthetically.",
              suggest: [
                {
                  messageId: "orderImportsByLength",
                  fix: function (fixer) {
                    return fixerFunction(fixer, sourceCode, importNodes[i], sortedArr[i]);
                  },
                },
              ],
              // fix method to re-order statements
              fix: function (fixer) {
                return fixerFunction(fixer, sourceCode, importNodes[i], sortedArr[i]);
              },
            });
          }
        }
      },
    };
  },
};
