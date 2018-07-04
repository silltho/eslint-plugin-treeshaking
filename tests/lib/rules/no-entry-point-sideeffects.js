/**
 * @fileoverview -todo
 * @author silltho
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-entry-point-sideeffects'),
  RuleTester = require('eslint').RuleTester

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
})

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('entry-point-sideeffects', rule, {
  valid: [
    {
      options: [],
      filename: 'test/usr/src/entry.js',
      code: `
        import module from 'module'
        console.log('sideeffect')
        export const export1 = 'export1'
        export default 'default'
      `,
      errors: []
    },
    {
      options: [],
      filename: 'test/usr/src/entry.js',
      code: `
        import module from 'module'
        module.test = 'tmp'
        export const export1 = 'export1'
        export default 'default'
      `,
      errors: []
    },
    {
      options: [],
      filename: 'test/usr/src/entry.js',
      code: `
        import module from 'module'
        console.log('test')
        export const export1 = 'export1'
        export default 'default'
      `,
      errors: []
    },
    {
      options: ['**/src/entry.js'],
      filename: 'test/usr/src/entry.js',
      code: `
        import module from 'module'
        export const export1 = 'export1'
        export default 'default'
      `,
      errors: []
    }
  ],

  invalid: [
    {
      options: ['**/src/entry.js'],
      filename: 'test/usr/src/entry.js',
      code: `
        import module from 'module'
        module.test = 'tmp'
        export const export1 = 'export1'
        export default 'default'
      `,
      errors: [
        {
          message: 'Sideeffects in the entry-point are not allowed.',
          type: 'ExpressionStatement'
        }
      ]
    },
    {
      options: ['**/src/entry.js'],
      filename: 'test/usr/src/entry.js',
      code: `
        import module from 'module'
        console.log('test')
        export const export1 = 'export1'
        export default 'default'
      `,
      errors: [
        {
          message: 'Sideeffects in the entry-point are not allowed.',
          type: 'ExpressionStatement'
        }
      ]
    }
  ]
})
