const transform = require('babel-core').transform;
const plugin = require('..');

// TODO better way ?
// https://github.com/facebook/jest/blob/master/packages/expect/src/jest_matchers_object.js
const JEST_MATCHERS_OBJECT = Symbol.for('$$jest-matchers-object');

expect.extend({
  toTranspileTo(received, expected) {
    const transpiled = transform(received.content, {
      filename: received.filename,
      babelrc: false,
      plugins: [[plugin, { compose: received.compose }]],
    }).code;
    return global[JEST_MATCHERS_OBJECT].matchers.toBe(transpiled.trim(), expected.trim());
  },
});
