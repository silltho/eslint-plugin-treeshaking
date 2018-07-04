# disallow SideEffects in the Entry Point (no-entry-point-sideeffects)

Any SideEffects in the entry point file can increase the bundle size. They should be avoided by moving them into the imported modules.

## Rule Details

Examples of **incorrect** code for this rule:

```js
console.log('sideeffect')
```

Examples of **correct** code for this rule:

```js
import module from 'module'
export const export1 = 'export1'
export default 'default'
```

### Options

`entryPoint: 'glob-pattern'` allows to identify the entry point of your program.
