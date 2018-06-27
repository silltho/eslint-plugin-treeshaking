/**
 * @fileoverview -todo-
 * @author silltho
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/sideeffects-named-exports'),
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
ruleTester.run('sideeffects-named-exports', rule, {
  valid: [
    {
      options: [],
      code: `
          import name from "module-name";
          import name2 from "module-name2";
          name2.sideeffect = 'sideeffect'
          export {
            name
          }
          export default name2
        `,
      errors: []
    },
    {
      options: [],
      code: `
          import name from "module-name";
          import name2 from "module-name2";
          console.log('test123')
          export default name2
        `,
      errors: []
    },
    {
      options: [],
      code: `
          import name from "module-name";
          import name2 from "module-name2";
          const tmp = 'tmp'
          export {
            tmp as name,
            name as name2
          }
        `,
      errors: []
    }
  ],

  invalid: [
    {
      options: [],
      code: `
            import test2 from "module-name2";
            test2.sideeffect = 'sideeffect'
            export { test2 }
    `,
      errors: [
        {
          message:
            'Effects on reexported modules (test2) could be prune away by TreeShaking.',
          type: 'ExpressionStatement'
        }
      ]
    },
    {
      options: [],
      code: `
          import test2 from "module-name2";
          test2.init('initSomeThing')
          export { test2 }
        `,
      errors: [
        {
          message:
            'Effects on reexported modules (test2) could be prune away by TreeShaking.',
          type: 'ExpressionStatement'
        }
      ]
    },
    {
      options: [],
      code: `
          import { counter as temp1, incCounter as temp2 } from "module-name2";
          temp2();
          export { temp1 as tmp }
        `,
      errors: [
        {
          message:
            'Effects on reexported modules (temp1) could be prune away by TreeShaking.',
          type: 'ExpressionStatement'
        }
      ]
    },
    {
      options: [],
      code: `
          import { counter, incCounter } from "module-name2";
          incCounter();
          export { counter }
        `,
      errors: [
        {
          message:
            'Effects on reexported modules (counter) could be prune away by TreeShaking.',
          type: 'ExpressionStatement'
        }
      ]
    }
  ]
})
