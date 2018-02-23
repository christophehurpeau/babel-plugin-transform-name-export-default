# babel-plugin-transform-name-export-default [![NPM version][npm-image]][npm-url]

Name default exported functions when they don't have a name with the file name

[![Build Status][circleci-status-image]][circleci-status-url]
[![Travis Status][travisci-status-image]][travisci-status-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Dependency ci Status][dependencyci-image]][dependencyci-url]

## What it does

> myFile.js

```js
export default () => {};
```

Transforms to:

```js
export default (function myFile() {});
```

Usefull for naming stateless react components or anything that displays the function's name !

## Options

- `compose` - `true` or `false`

enables the naming inside the first argument, like a redux `connect` or `compose` function:

```js
export default compose()(() => {});
```

TransformsTo:

```js
export default compose()(function composeArrowFunction() {});
```

## Install

```bash
npm install --save-dev babel-plugin-transform-name-export-default
yarn add --dev babel-plugin-transform-name-export-default
```
## Usage

### Via `.babelrc`

**.babelrc**

```json
{
  "presets": ["transform-name-export-default"]
}
```

```json
{
  "presets": [["transform-name-export-default", { "compose": true }]]
}
```

### Via CLI

```sh
babel script.js --presets transform-name-export-default
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: [require('transform-name-export-default')]
});
```

```javascript
require("babel-core").transform("code", {
  presets: [[require('transform-name-export-default'), { compose: true }]]
});
```

# Thanks

- https://github.com/gajus/babel-plugin-transform-export-default-name

[npm-image]: https://img.shields.io/npm/v/babel-plugin-transform-name-export-default.svg?style=flat-square
[npm-url]: https://npmjs.org/package/babel-plugin-transform-name-export-default
[daviddm-image]: https://david-dm.org/christophehurpeau/undefined.svg?style=flat-square
[daviddm-url]: https://david-dm.org/christophehurpeau/undefined
[dependencyci-image]: https://dependencyci.com/github/christophehurpeau/undefined/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/christophehurpeau/undefined
[circleci-status-image]: https://img.shields.io/circleci/project/christophehurpeau/undefined/master.svg?style=flat-square
[circleci-status-url]: https://circleci.com/gh/christophehurpeau/undefined
[travisci-status-image]: https://img.shields.io/travis/christophehurpeau/undefined/master.svg?style=flat-square
[travisci-status-url]: https://travis-ci.org/christophehurpeau/undefined
