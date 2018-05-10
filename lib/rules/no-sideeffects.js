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
      ExpressionStatement: function(node) {
        const entry = context.options[0]
        const currentFilePath = context.getFilename()
        const isEntry = currentFilePath.indexOf(entry) > -1
        //console.log('currentFile: ', currentFilePath)
        //console.log('entry: ', entry)
        if (isEntry) {
          console.log('wuhu')
          //console.log('currentFile: ', currentFilePath)
          context.report(node, 'sideeffects are not allowed')
        }
      }
    }
  }
}
