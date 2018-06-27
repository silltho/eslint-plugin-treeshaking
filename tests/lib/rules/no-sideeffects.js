/**
 * @fileoverview
 * @author Thomas Siller
 */
'use strict'

const codes = {
  1: `
    import { counter, incCounter } from 'counter'
    incCounter()
    export { counter }
  `,
  2: `
    import 'empty-import'
    export const export1 = 'export1'
    export default 'default'
  `,
  3: `
    console.log('sideeffect')
    export const export1 = 'export1'
    export default 'default'
  `,
  4: `
    import * as lib1 from 'libary1'
    import {func1} from 'libary2'
    import Lib3 from 'libary3'
    
    export const export1 = 'export1'
    export const exportFunc = () => 'exportFunc'
    export {
      func1,
      lib1
    }
    export default {
      export1,
      export2: 'export2'
    }
  `,
  5: `
    import obj from 'object'
    obj.a = 'sideeffect'
    export { obj }
  `
}

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
      options: [['', '**/src/entry.js']],
      filename: 'test/usr/src/entry.js',
      code: codes[4]
    }
  ],

  invalid: [
    {
      options: [['', '**/src/entry.js']],
      filename: 'test/usr/src/entry.js',
      code: code[1],
      errors: [
        {
          message:
            'This sideeffect will be removed by tree shaking. Make sure it does not effect any exports.',
          type: 'ExpressionStatement'
        }
      ]
    },
    {
      options: [['', '**/src/entry.js']],
      filename: 'test/usr/src/entry.js',
      code: code[2],
      errors: [
        {
          message:
            'empty imports are removed by tree shaking. Make sure you add empty-import to package.json sideEffects option.',
          type: 'ImportDeclaration'
        }
      ]
    },
    {
      options: [['', '**/src/entry.js']],
      filename: 'test/usr/src/entry.js',
      code: code[3],
      errors: [
        {
          message: 'sideeffects in the entry-point are not allowed',
          type: 'ExpressionStatement'
        }
      ]
    },
    {
      options: [['', '**/src/entry.js']],
      filename: 'test/usr/src/entry.js',
      code: code[5],
      errors: [
        {
          message:
            'This sideeffect will be removed by tree shaking. Make sure it does not effect any exports.',
          type: 'ExpressionStatement'
        }
      ]
    }
  ]
})
