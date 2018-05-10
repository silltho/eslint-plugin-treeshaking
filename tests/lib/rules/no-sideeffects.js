/**
 * @fileoverview
 * @author Thomas Siller
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let rule = require('../../../lib/rules/no-sideeffects'),
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

let ruleTester = new RuleTester()
ruleTester.run('no-sideeffects', rule, {
  valid: [
    {
      options: ['entry.js'],
      filename: 'entry.js',
      code: `
        import * as lib1 from 'libary1'
        import {func1} from 'libary2'
        import Lib3 from 'libary3'
        
        export const export1 = 'export1'
        export const exportFunc = () => 'exportFunc'
        export default {
          export1,
          export2: 'export2'
        }
      `
    }
  ],

  invalid: [
    {
      options: ['entry.js'],
      filename: 'entry.js',
      code: `
        import * as lib1 from 'libary1'
        import {func1} from 'libary2'
        import Lib3 from 'libary3'
        
        console.log('sideeffect')
        
        export const export1 = 'export1'
        export const exportFunc = () => 'exportFunc'
        export default {
          export1,
          export2: 'export2'
        }
      `,
      errors: [
        {
          message: 'sideeffects are not allowed',
          type: 'ExpressionStatement'
        }
      ]
    },
    {
      options: ['entry.js'],
      filename: 'entry.js',
      code: `
        import * as lib1 from 'libary1'
        import {func1} from 'libary2'
        import Lib3 from 'libary3'
        
        func1()
        
        export const export1 = 'export1'
        export const exportFunc = () => 'exportFunc'
        export default {
          export1,
          export2: 'export2'
        }
      `,
      errors: [
        {
          message: 'sideeffects are not allowed',
          type: 'ExpressionStatement'
        }
      ]
    }
  ]
})
