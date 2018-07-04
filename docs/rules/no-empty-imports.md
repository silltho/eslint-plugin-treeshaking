# disallow Empty Imports (no-empty-imports)

Empty Imports e.g. `import 'main.css'` can be prune away by Tree Shaking. Empty Imports that can't be avoided should be added to the `sideeffects` property in the package.json file.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import 'empty-import'
```

Examples of **correct** code for this rule:

```js
import Empty from 'empty-import'
import { empty } from 'empty-import'
```

### Options

`knownSideEffects: ['glob-pattern']` allows the following empty imports. Should be copied from `package.json` `sideeffects`.
