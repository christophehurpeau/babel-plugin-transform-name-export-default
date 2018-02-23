test('anonym function', () => {
  expect({
    filename: 'anonymousFunction.js',
    content: `
export default function () {}
   `,
  }).toTranspileTo(`
export default function anonymousFunction() {}
`);
});

test('arrow function', () => {
  expect({
    filename: 'arrowFunction.js',
    content: `
export default () => {};
   `,
  }).toTranspileTo(`
export default (function arrowFunction() {});
`);
});

test('named function', () => {
  expect({
    filename: 'arrowFunction.js',
    content: `
export default function foo () {};
   `,
  }).toTranspileTo(`
export default function foo() {};
`);
});

test('async arrow function', () => {
  expect({
    filename: 'arrowFunction.js',
    content: `
export default async () => {};
   `,
  }).toTranspileTo(`
export default (async function arrowFunction() {});
`);
});

test('unsafe file name', () => {
  expect({
    filename: 'unsafe-name.js',
    content: `
export default () => {};
   `,
  }).toTranspileTo(`
export default (function unsafeName() {});
`);
});

test('file starting with a number', () => {
  expect({
    filename: '1-number-name.js',
    content: `
export default () => {};
   `,
  }).toTranspileTo(`
export default (function _1NumberName() {});
`);
});

test('clashingName', () => {
  expect({
    filename: 'clashingName.js',
    content: `
let clashingName,
    clashingName0,
    clashingName1;

clashingName = 'test';
clashingName0 = 'test';
clashingName1 = 'test';

export default () => {};
   `,
  }).toTranspileTo(`
let clashingName, clashingName0, clashingName1;

clashingName = 'test';
clashingName0 = 'test';
clashingName1 = 'test';

export default (function clashingName2() {});
`);
});

describe('compose', () => {
  test('compose arrow function', () => {
    expect({
      compose: false,
      filename: 'composeArrowFunction.js',
      content: `
export default compose()(() => {});
     `,
    }).toTranspileTo(`
export default compose()(() => {});
    `);
  });

  test('compose arrow function', () => {
    expect({
      compose: true,
      filename: 'composeArrowFunction.js',
      content: `
export default compose()(() => {});
     `,
    }).toTranspileTo(`
export default compose()(function composeArrowFunction() {});
    `);
  });
});

describe('index', () => {
  test('index.js with directory', () => {
    expect({
      filename: 'testDirectory/index.js',
      content: `
export default () => {};
     `,
    }).toTranspileTo(`
export default (function testDirectory() {});
    `);
  });

  test('index.js without directory', () => {
    expect({
      filename: 'index.js',
      content: `
export default () => {};
     `,
    }).toTranspileTo(`
export default (function index() {});
    `);
  });
});
