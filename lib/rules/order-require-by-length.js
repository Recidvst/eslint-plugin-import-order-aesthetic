/**
 * @fileoverview Order require statements by line length
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
      description: "Order require statements by line length",
      category: "Stylistic Issues",
      recommended: true,
      url: "https://github.com/Recidvst/eslint-plugin-import-order-aesthetic",
    },
    hasSuggestions: true,
    messages: {
      orderRequireByLength:
        "Order your require statements by line length because it looks better :)",
      orderRequireInvalid: "Require statements are empty or otherwise invalid.",
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
    // variables
    let statementArr = [];
    let sortedArr = [];

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
      // Check if all items exist and are in the same order
      for (var i = 0; i < arr1.length; i++) {
        if (arr1[i].length !== arr2[i].length) {
          return false;
        }
      }
      return true;
    };

    // array sort fn
    function sortByLengthThenAlphabet(a, b) {
      // get string values for alphabetic comparison
      const aText = sourceCode.getText(a.node);
      const bText = sourceCode.getText(b.node);
      if (optionOrderReversed) {
        return a.length - b.length || aText.localeCompare(bText);
      } else {
        return b.length - a.length || bText.localeCompare(aText);
      }
    }

    // pass fixer fn to context report fix param
    const fixerFunction = function (fixer, source, node, sortedArrNode) {
      let fixerArr = [];
      fixerArr.push(
        fixer.replaceTextRange([node.range[0], node.range[1]], source.getText(sortedArrNode)),
      );
      return fixerArr;
    };

    return {
      // handle require statements
      VariableDeclaration: function (node) {
        // test for a badly parsed statement
        let breakNode = false;
        if (
          ENV === "testing" &&
          sourceCode.getText(node) === "const invalid = require('break-test');"
        ) {
          breakNode = true;
        }

        // push all require statements into arrays for sorting and comparison
        const declaration = node.declarations && node.declarations[0];
        /* istanbul ignore next */
        if (
          node.type === "VariableDeclaration" &&
          node.range.length &&
          declaration &&
          declaration.init &&
          declaration.init.callee &&
          declaration.init.callee.name === "require"
        ) {
          const length = node.range.reduce((acc, cur) => cur - acc); // get length of string from range
          let thisNodeObj = {
            node,
            length,
          };
          statementArr.push(thisNodeObj);
          sortedArr.push(thisNodeObj);

          // sort fn
          sortedArr.sort(sortByLengthThenAlphabet);

          if (breakNode) {
            context.report({
              node: node,
              message: "Require statement is empty or otherwise invalid.",
              suggest: [
                {
                  messageId: "orderRequireInvalid",
                  fix: function (fixer) {
                    return fixer.replaceText(node, "valid require statement;");
                  },
                },
              ],
            });
          }
        }
      },

      // handle require statements that aren't expressed as variables e.g. require('dotenv').config();
      ExpressionStatement: function (node) {
        // test for a badly parsed statement
        let breakNode = false;
        if (ENV === "testing" && sourceCode.getText(node) === "require('break-test');") {
          breakNode = true;
        }

        // push all require statements into arrays for sorting and comparison
        const expression = node.expression;
        let name = false;

        if (
          expression &&
          expression.callee &&
          expression.callee.object &&
          expression.callee.object.callee
        ) {
          name = expression.callee.object.callee.name;
        } else {
          name = expression.callee && expression.callee.name;
        }

        /* istanbul ignore next */
        if (
          node.type === "ExpressionStatement" &&
          expression &&
          expression.type === "CallExpression" &&
          node.range.length &&
          name &&
          name === "require"
        ) {
          const length = node.range.reduce((acc, cur) => cur - acc); // get length of string from range
          let thisNodeObj = {
            node,
            length,
          };
          statementArr.push(thisNodeObj);
          sortedArr.push(thisNodeObj);

          // sort fn
          sortedArr.sort(sortByLengthThenAlphabet);

          if (breakNode) {
            context.report({
              node: node,
              message: "Require statement is empty or otherwise invalid.",
              suggest: [
                {
                  messageId: "orderRequireInvalid",
                  fix: function (fixer) {
                    return fixer.replaceText(node, "valid require statement;");
                  },
                },
              ],
            });
          }
        }
      },

      // triggered when all imports have been checked
      onCodePathEnd: function (codePath, node) {
        // test for a broken/null array
        if (
          ENV === "testing" &&
          statementArr.length > 0 &&
          sourceCode.getText(statementArr[0].node) === "const nulltest = require('break-test');"
        ) {
          statementArr = null;
        }

        // after analysing the code path, validate rule and return report
        if (!doArraysMatch(statementArr, sortedArr)) {
          if (statementArr && statementArr.length > 0) {
            for (var i = 0; i < statementArr.length; i++) {
              // send report if arrays don't match
              context.report({
                node: statementArr[i].node,
                message: "Require statement is not ordered aesthetically.",
                suggest: [
                  {
                    messageId: "orderRequireByLength",
                    fix: function (fixer) {
                      return fixerFunction(
                        fixer,
                        sourceCode,
                        statementArr[i].node,
                        sortedArr[i].node,
                      );
                    },
                  },
                ],
                // fix method to re-order statements
                fix: function (fixer) {
                  return fixerFunction(fixer, sourceCode, statementArr[i].node, sortedArr[i].node);
                },
              });
            }
          } else {
            // send report if arrays are empty or null
            context.report({
              node: node,
              message: "Require statement is empty or otherwise invalid.",
              suggest: [
                {
                  messageId: "orderRequireInvalid",
                  fix: function (fixer) {
                    return fixer.replaceText(node, "valid require statement;");
                  },
                },
              ],
            });
          }
        }
      },
    };
  },
};
