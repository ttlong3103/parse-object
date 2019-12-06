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

