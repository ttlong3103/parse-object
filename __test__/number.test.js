const parse = require('..');

test('Positive integer', () => {
  expect(parse('123456789')).toBe(123456789);
});

test('Negative integer', () => {
  expect(parse('-987654321')).toBe(-987654321);
});

test('Positive integer starts with 0', () => {
  expect(parse('00000002')).toBe(2);
});

test('Negative integer starts with 0', () => {
  expect(parse('-00000002')).toBe(-2);
});

test('Positive float', () => {
  expect(parse('12345.9760')).toBe(12345.976);
});

test('Negative float', () => {
  expect(parse('-0.12345679')).toBe(-0.12345679);
});

test('Positive float starts with 0', () => {
  expect(parse('0000000.2')).toBe(0.2);
});

test('Negative float starts with 0', () => {
  expect(parse('-0000000.2')).toBe(-0.2);
});

test('Positive number starts with dot', () => {
  expect(parse('.13579')).toBe(0.13579);
});

test('Negative number starts with dot', () => {
  expect(parse('-.24680')).toBe(-0.2468);
});

test('Positive number ends with dot', () => {
  expect(parse('2468.')).toBe(2468);
});

test('Negative number ends with dot', () => {
  expect(parse('-13579.')).toBe(-13579);
});