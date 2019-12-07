const parse = require('..');

test('Empty object', () => {
  expect(parse(`{}`)).toEqual({});
});

test('Object with string key 1', () => {
  expect(parse(`{"key": 1}`)).toEqual({ key: 1 });
});

test('Object with string key 2', () => {
  expect(parse(`{'key': 1}`)).toEqual({ key: 1 });
});

test('Object with identifier key', () => {
  expect(parse(`{key: 1}`)).toEqual({ key: 1 });
});

test('Object with all type of values and new line', () => {
  expect(
    parse(`{
      single_string: 'single',
      doubleString: "   ",
      positive_integer: 100,
      negative_integer: -99,
      positive_float: 15.9999,
      negetive_float: -123.1231234,
      array: [1, 2, 3],
      nested_array: [[1], [2, [3, 4]]],
      nested_object: {
        attr1: 1,
        attr2: '123',
        attr3: {}
      }
    }`)
  ).toEqual({
    single_string: 'single',
    doubleString: '   ',
    positive_integer: 100,
    negative_integer: -99,
    positive_float: 15.9999,
    negetive_float: -123.1231234,
    array: [1, 2, 3],
    nested_array: [[1], [2, [3, 4]]],
    nested_object: {
      attr1: 1,
      attr2: '123',
      attr3: {}
    }
  });
});

test('Check ignore white spaces', () => {
  expect(
    parse(`{a :1,         b: 2     , c: {                      }}`)
  ).toEqual({
    a: 1,
    b: 2,
    c: {}
  });
});

test('Check object with string value contains url', () => {
  expect(parse(`{url: "https://github.com/ttlong3103/parse-object/"}`)).toEqual(
    {
      url: 'https://github.com/ttlong3103/parse-object/'
    }
  );
});

describe('Parse Object is able to parse any thing from JSON.stringify() like:', () => {
  test('number', () => {
    const number = 2123;
    expect(parse(JSON.stringify(number))).toEqual(number);
  });
  test('string', () => {
    const string = 'this is a string';
    expect(parse(JSON.stringify(string))).toEqual(string);
  });
  test('array', () => {
    const array = [1, '2', '3', {}];
    expect(parse(JSON.stringify(array))).toEqual(array);
  });
  test('object', () => {
    const object = {
      num: 1,
      string: '2',
      array: [3],
      url: 'https://github.com/ttlong3103/parse-object',
      nested: {}
    };
    expect(parse(JSON.stringify(object))).toEqual(object);
  });
});
