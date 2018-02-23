test('anonym class', () => {
  expect({
    filename: 'anonymousClass.js',
    content: `
export default class {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
   `,
  }).toTranspileTo(`
export default class anonymousClass {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
`);
});

test('named class', () => {
  expect({
    filename: 'anonymousClass.js',
    content: `
export default class View {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};
   `,
  }).toTranspileTo(`
export default class View {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};
`);
});
