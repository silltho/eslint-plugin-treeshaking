# disallow SideEffects onto Named Exports (no-named-exports-sideeffects)

SideEffects onto Named Exports can be prune away by Tree Shaking. This leads to inconsitent functionality.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import name from 'module-name'
import name2 from 'module-name2'
name2.sideeffect = 'sideeffect'
export { name }
export default name2
```

Examples of **correct** code for this rule:

```js
import test2 from 'module-name2'
test2.sideeffect = 'sideeffect'
export { test2 }
```
