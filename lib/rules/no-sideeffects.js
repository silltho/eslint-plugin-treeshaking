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
      {
        string: 'test'
      }
    ]
  },

  create: function(context) {
    return {
      'Program > ExpressionStatement': function(node) {
        //console.log('context:', context)
        //console.log('node:', node)
        const entry = context.options[0]
        const currentFile = context.getFilename()
        console.log('currentFile: ', currentFile)
        console.log('entry: ', entry)
        //if(entry === currentFile)
        context.report(node, 'sideeffects are not allowed')
      }
    }
  }
}
