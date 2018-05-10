/**
 * @fileoverview
 * @author Thomas Siller
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
      'Program > ExpressionStatement': function(node) {
        //console.log('context:', context)
        //console.log('node:', node)
        context.report(node, 'sideeffects are not allowed')
      }
    }
  }
}
