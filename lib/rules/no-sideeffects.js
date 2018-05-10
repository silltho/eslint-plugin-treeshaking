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
        const entry = context.options[0]
        const currentFilePath = context.getFilename()
        const isEntry = currentFilePath.indexOf(entry) > -1
        /*console.log('currentFile: ', currentFilePath)
        console.log('entry: ', entry)
        console.log('isEntry: ', isEntry)*/
        if (isEntry) {
          console.log('currentFile: ', currentFilePath)
          context.report(node, 'sideeffects are not allowed')
        }
      }
    }
  }
}
