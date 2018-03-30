/**
 * @fileoverview  
 * @author Thomas Siller
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-namespace-imports"),

    RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-namespace-imports", rule, {

    valid: [
        "import $ from 'jquery';",
        "import { filter } from 'lodash/fp'"
    ],

    invalid: [
        {
            code: "import * as lib from 'libary'",
            errors: [{
                message: "Prefer importing single functions over a full module",
                type: "ImportDeclaration"
            }]
        }
    ]
});
