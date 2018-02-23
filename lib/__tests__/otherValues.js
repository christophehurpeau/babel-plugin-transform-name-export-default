test('array', () => {
  expect({
    filename: 'array.js',
    content: `
export default [];
   `,
  }).toTranspileTo(`
export default [];
`);
});

test('boolean', () => {
  expect({
    filename: 'booleanValue.js',
    content: `
export default false;
   `,
  }).toTranspileTo(`
export default false;
`);
});

test('string', () => {
  expect({
    filename: 'stringValue.js',
    content: `
export default "hello";
   `,
  }).toTranspileTo(`
export default "hello";
`);
});

test('new String', () => {
  expect({
    filename: 'newStringValue.js',
    content: `
export default new String("hello");
   `,
  }).toTranspileTo(`
export default new String("hello");
`);
});

test('null', () => {
  expect({
    filename: 'nullValue.js',
    content: `
export default null;
   `,
  }).toTranspileTo(`
export default null;
`);
});

test('number', () => {
  expect({
    filename: 'numberValue.js',
    content: `
export default 1;
   `,
  }).toTranspileTo(`
export default 1;
`);
});

test('object', () => {
  expect({
    filename: 'objectValue.js',
    content: `
export default {
  name: "name",
  data: "data"
};
   `,
  }).toTranspileTo(`
export default {
  name: "name",
  data: "data"
};
`);
});
