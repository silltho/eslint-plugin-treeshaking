# eslint-plugin-treeshaking

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-treeshaking`:

```
$ npm install git+ssh://git@github.com:silltho/eslint-plugin-thesis.git

or

$ npm install eslint-plugin-treeshaking --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-treeshaking` globally.

## Usage

Add `treeshaking` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["treeshaking"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "treeshaking/rule-name": 2
  }
}
```

## Supported Rules

* Fill in provided rules here
