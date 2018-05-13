/**
 * @fileoverview
 * @author Thomas Siller
 */
'use strict'

const mm = require('micromatch')

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
        type: 'array'
      }
    ]
  },

  create: function(context) {
    const messageText = 'sideeffects are not allowed'

    function shouldBeAnalysed() {
      const filesToAnalyse = context.options[0]
      const currentFilePath = context.getFilename()
      return mm.some([currentFilePath], filesToAnalyse, {})
    }

    function reportSideEffect(node) {
      if (shouldBeAnalysed()) {
        context.report(node, messageText)
      }
    }

    return {
      'Program > :not(ImportDeclaration, ExportNamedDeclaration, ExportDefaultDeclaration)': reportSideEffect
    }
  }
}
