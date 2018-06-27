/**
 * @fileoverview -desc-
 * @author silltho
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/empty-imports'),
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
ruleTester.run('empty-imports', rule, {
  valid: [
    {
      options: [['empty-import']],
      code: `
          import 'empty-import'
          import lib1 from 'lib1'
          export const export1 = 'export1'
          export default 'default'
        `,
      errors: []
    },
    {
      options: [],
      code: `
          import name from "module-name";
          import * as name2 from "module-name";
          import { member } from "module-name";
          import { member as alias } from "module-name";
          import { member1 , member2 } from "module-name";
          import { member3 , member2 as alias2 } from "module-name";
          import defaultMember, { member4 } from "module-name";
          import defaultMember2, * as alias3 from "module-name";
          import defaultMember3 from "module-name";
        `,
      errors: []
    }
  ],

  invalid: [
    {
      code: `
                import 'empty-import'
                import lib1 from 'lib1'
                export const export1 = 'export1'
                export default 'default'
            `,
      errors: [
        {
          message:
            'empty imports are removed by tree shaking. Make sure you add empty-import to package.json sideEffects option.',
          type: 'ImportDeclaration'
        }
      ]
    }
  ]
})
