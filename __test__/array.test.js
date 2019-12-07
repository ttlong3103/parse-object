const parse = require('..');

test('Array 1', () => {
  expect(parse(`[1, -1.1,'a', "b"]`)).toEqual([1, -1.1, 'a', 'b']);
});

test('Array 2', () => {
  expect(parse(`[.1, -1.1,'a', "b"]`)).toEqual([0.1, -1.1, 'a', 'b']);
});

test('Array 3', () => {
  expect(parse(`[00001, -.1,'"a"', "b"]`)).toEqual([1, -0.1, '"a"', 'b']);
});

test('Array 4', () => {
  expect(parse(`[[00001, -.1,'"a"', "b"], [00001, -.1,'"a"', "b"]]`)).toEqual([
    [1, -0.1, '"a"', 'b'],
    [1, -0.1, '"a"', 'b']
  ]);
});

test('Array 5', () => {
  expect(parse(`[[[3, [4, [5]]]]]`)).toEqual([[[3, [4, [5]]]]]);
});

test('Array 6', () => {
  expect(() => {
    parse(`[123`);
  }).toThrow();
});

test('Array 7', () => {
  expect(() => {
    parse(`"abc"]`);
  }).toThrow();
});
