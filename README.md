# eslint-plugin-silltho-plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-silltho`:

```
$ npm install git+ssh://git@github.com:silltho/eslint-plugin-thesis.git

or

$ npm install eslint-plugin-silltho --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-silltho` globally.

## Usage

Add `silltho` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["silltho"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "silltho/rule-name": 2
  }
}
```

## Supported Rules

* Fill in provided rules here
