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
      description: 'disallow SideEffects onto Named Exports',
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
      'Effects on reexported modules ({{ identifier }}) could be prune by TreeShaking.'
    const imports = []
    const namedExports = []
    const effects = []

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function saveImports(node) {
      imports.push(node)
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

    function getImportFromEffect(identifierName) {
      return imports.find(muliImport => {
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
        const effectedImport = getImportFromEffect(name)
        if (effectedImport) {
          // the expression is onto an import
          const localNames = getLocalNamesFromSpecifiers(
            effectedImport.specifiers
          )
          const foundLocalName = localNames.find(localName =>
            namedExports.includes(localName)
          )
          if (foundLocalName) {
            // it is a named export
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
      ImportDeclaration: saveImports,
      ExportNamedDeclaration: saveNamedExport,
      ExpressionStatement: saveExpression,
      'Program:exit': validateEffects
    }
  }
}
