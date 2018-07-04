/**
 * @fileoverview -desc-
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
      description: 'disallow Empty Imports',
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
    const messageText =
      'empty imports are removed by tree shaking. Make sure you add {{ identifier }} to package.json sideEffects option.'
    const knownSideEffects = context.options[0] || []
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function isKnownSideEffect(emptyImportNode) {
      return mm.any(emptyImportNode.source.value, knownSideEffects, null)
    }

    function reportEmptyImport(emptyImportNode) {
      context.report({
        node: emptyImportNode,
        message: messageText,
        data: {
          identifier: emptyImportNode.source.value
        }
      })
    }

    function isEmptyImport(importNode) {
      if (
        importNode.specifiers.length === 0 &&
        !isKnownSideEffect(importNode)
      ) {
        reportEmptyImport(importNode)
      }
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration: isEmptyImport
    }
  }
}
