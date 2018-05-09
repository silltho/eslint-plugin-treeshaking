/**
 * @fileoverview
 * @author Thomas Siller
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const allowedNodeTypes = [
  'ImportDeclaration',
  'ExportNamedDeclaration',
  'ExportDefaultDeclaration'
]

module.exports = {
  meta: {
    docs: {
      description: ' ',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    return {
      ExpressionStatement: function(node) {
        context.report(node, 'sideeffects are not allowed')
      }
    }
  }
}
