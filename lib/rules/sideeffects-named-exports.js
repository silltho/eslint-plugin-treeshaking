/**
 * @fileoverview -todo-
 * @author silltho
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: '-todo-',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    const messageText =
      'Effects on reexported modules ({{ identifier }}) could be prune away by TreeShaking.'
    const multiImports = []
    const namedExports = []
    const effects = []

    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function saveMultiImports(node) {
      if (node.specifiers.length > 1) {
        //console.log('save import:', node)
        multiImports.push(node)
      }
    }

    function saveNamedExport(node) {
      if (node.specifiers.length > 0) {
        node.specifiers.forEach(specifier => {
          namedExports.push(specifier.local.name)
        })
      }
    }

    function saveExpression(node) {
      effects.push(node)
    }

    function reportEffectedNamedExport(effectNamedExportNode, identifier) {
      context.report({
        node: effectNamedExportNode,
        message: messageText,
        data: {
          identifier
        }
      })
    }

    function getIdentifierFromEffect(effect) {
      switch (effect.expression.type) {
        case 'AssignmentExpression': {
          return effect.expression.left
        }
        case 'CallExpression': {
          return effect.expression.callee
        }
        default: {
          return false
        }
      }
    }

    function getLocalNamesFromSpecifiers(specifiers) {
      return specifiers.map(specifier => getIdentifierName(specifier.local))
    }

    function getMultiImportFromEffect(identifierName) {
      return multiImports.find(muliImport => {
        return getLocalNamesFromSpecifiers(muliImport.specifiers).includes(
          identifierName
        )
      })
    }

    function getIdentifierName(identifier) {
      if (identifier.object) {
        return identifier.object.name
      }
      return identifier.name
    }

    function validateEffect(effect) {
      const identifier = getIdentifierFromEffect(effect)
      if (identifier) {
        const name = getIdentifierName(identifier)
        if (namedExports.includes(name)) {
          return reportEffectedNamedExport(effect, name)
        }
        const effectedMultiImport = getMultiImportFromEffect(name)
        if (effectedMultiImport) {
          const localNames = getLocalNamesFromSpecifiers(
            effectedMultiImport.specifiers
          )
          const foundLocalName = localNames.find(localName =>
            namedExports.includes(localName)
          )
          if (foundLocalName) {
            reportEffectedNamedExport(effect, foundLocalName)
          }
        }
      }
    }

    function validateEffects(node) {
      effects.forEach(validateEffect)
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration: saveMultiImports,
      ExportNamedDeclaration: saveNamedExport,
      'ExpressionStatement:exit': saveExpression,
      'Program:exit': validateEffects
    }
  }
}
