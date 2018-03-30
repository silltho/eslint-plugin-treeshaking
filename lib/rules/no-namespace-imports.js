/**
 * @fileoverview  
 * @author Thomas Siller
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: " ",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
        return {

            ImportDeclaration: function(node) {

                node.specifiers.forEach(function(specifier) {
                    if (specifier.type === 'ImportNamespaceSpecifier' &&
                        specifier.local.type === 'Identifier') {

                        context.report(node, 'Prefer importing single functions over a full module');
                    }
                });
            }
        };
    }
};
