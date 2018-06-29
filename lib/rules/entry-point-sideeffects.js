/**
 * @fileoverview -todo
 * @author silltho
 */
'use strict'

const mm = require('micromatch')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: '-todo',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: 'string'
      }
    ]
  },

  create: function(context) {
    const messageText = 'Sideeffects in the entry-point are not allowed.'

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function isEntryPoint() {
      const entryPointOption = context.options[0]
      if (entryPointOption) {
        const currentFilePath = context.getFilename()
        return mm.isMatch(currentFilePath, entryPointOption)
      }
      return false
    }

    function reportSideEffect(node) {
      if (isEntryPoint()) {
        context.report(node, messageText)
      }
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      'Program > :not(ImportDeclaration, ExportNamedDeclaration, ExportDefaultDeclaration)': reportSideEffect
    }
  }
}
