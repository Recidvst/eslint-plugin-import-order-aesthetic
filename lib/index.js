/**
 * @fileoverview Forget alphabetical or chronological ordering, the future is in bringing aesthetic order to import statements.
 * @author Recidvst
 */
"use strict";
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

module.exports.configs = {
  configs: {
    browserConfig: {
      plugins: ["import-order-aesthetic"],
      env: ["browser"],
      rules: {
        "eslint-plugin-import-order-aesthetic/order-import-by-length": [
          "error",
          { reverseOrder: false },
        ],
        "eslint-plugin-import-order-aesthetic/order-require-by-length": [
          "error",
          { reverseOrder: false },
        ],
      },
    },
    nodeConfig: {
      plugins: ["import-order-aesthetic"],
      env: ["node"],
      rules: {
        "eslint-plugin-import-order-aesthetic/order-import-by-length": [
          "error",
          { reverseOrder: false },
        ],
        "eslint-plugin-import-order-aesthetic/order-require-by-length": [
          "error",
          { reverseOrder: false },
        ],
      },
    },
  },
};
