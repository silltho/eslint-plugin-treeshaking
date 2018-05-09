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
      Program: function(node) {
        node.body.forEach(node => {
          if (allowedNodeTypes.indexOf(node.type) === -1) {
            context.report(node, 'sideeffects are not allowed')
          }
        })
      }
    }
  }
}
