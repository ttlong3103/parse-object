const parse = require('..');

test('Double quote string 1', () => {
  expect(parse(`"abc"`)).toBe('abc');
});

test('Double quote string 2', () => {
  expect(parse(`"123"`)).toBe('123');
});

test('Double quote string 3', () => {
  expect(parse(`"abc123"`)).toBe('abc123');
});

test('Double quote string with white spaces', () => {
  expect(parse(`"  abc  123     "`)).toBe('  abc  123     ');
});

test('Double quote string with visual \\n', () => {
  expect(parse(`"abc\\n123"`)).toBe('abc\\n123');
});

test('Double quote string contains single quotes', () => {
  expect(parse(`"'abc'"`)).toBe(`'abc'`);
});

test('Invalid double quote string 1', () => {
  expect(() => {
    parse(`"missing closing quote`)
  }).toThrow();
});

test('Invalid double quote string 2', () => {
  expect(() => {
    parse(`"the" hell???`)
  }).toThrow();
});

test('Invalid double quote string 3', () => {
  expect(() => {
    parse(`missing opening quote"`)
  }).toThrow();
});

test('Double quote string contains url', () => {
  expect(parse(`"https://github.com/ttlong3103/parse-object"`)).toBe('https://github.com/ttlong3103/parse-object');
});
// -----------------------------------------------------

test('Single quote string 1', () => {
  expect(parse(`'abc'`)).toBe('abc');
});

test('Single quote string 2', () => {
  expect(parse(`'123'`)).toBe('123');
});

test('Single quote string 3', () => {
  expect(parse(`'abc123'`)).toBe('abc123');
});

test('Single quote string with white spaces', () => {
  expect(parse(`'  abc  123     '`)).toBe('  abc  123     ');
});

test('Single quote string with visual \\n', () => {
  expect(parse(`'abc\\n123'`)).toBe('abc\\n123');
});

test('Single quote string contains double quotes', () => {
  expect(parse(`'"abc"'`)).toBe(`"abc"`);
});

test('Invalid single quote string 1', () => {
  expect(() => {
    parse(`'missing closing quote`)
  }).toThrow();
});

test('Invalid single quote string 2', () => {
  expect(() => {
    parse(`'the' hell???`)
  }).toThrow();
});

test('Invalid single quote string 3', () => {
  expect(() => {
    parse(`missing opening quote'`)
  }).toThrow();
});

test('Single quote string contains url', () => {
  expect(parse(`'https://github.com/ttlong3103/parse-object'`)).toBe('https://github.com/ttlong3103/parse-object');
});