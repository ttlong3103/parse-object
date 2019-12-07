# parse-object

> Support parsing string contains object-liked syntax that can not be parsed by JSON.parse()

[![NPM](https://img.shields.io/npm/v/parse-object.svg)](https://www.npmjs.com/package/parse-object) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Sometimes, you receive string that has value like `"{ sort: { date: 'DES' } }"` and you want to parse it into an object. First solution would be, of course, `JSON.parse()`.
However, your string is not valid JSON-formatted string so `JSON.parse()` will fail to parse it. That is the reason why I made this `parse-object` module.

# Install

```bash
npm install --save parse-object
```

## Usage

```javascript
const parse = require('parse-object');

const str = "{ sort: { date: 'DES' } }";
console.log(parse(str)); // { sort: { date: 'DES' } }
console.log(JSON.parse(str)); // raise error
```

`parse-object` can also parse any output from `JSON.stringify()`

```javascript
const parse = require('parse-object');

const stringified = JSON.stringify({ name: "me", id: 123456 });
console.log(parse(stringified)); //  { name: "me", id: 123456 }
```