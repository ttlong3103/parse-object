var Parser = require("jison").Parser;

var grammar = {
  lex: {
    rules: [
      ["\\s+", "/* skip whitespace */"],
      /** NUMBER
       * Support "1" , "-1" , "1.0" , "-1.0" , "1." , ".1"
       */
      ["[-]?((\\d+(\\.\\d*)?)|(\\d*\\.\\d+))", 'return "NUMBER";'],
      ["$", 'return "EOF";']
    ]
  },
  bnf: {
    entry: [["expr EOF", "return $1"]],
    expr: [["number", "$$ = $1"]],
    number: [["NUMBER", "$$ = Number($1)"]]
  }
};

var parser = new Parser(grammar);
function parse(txt) {
  return parser.parse(txt);
}

module.exports = parse;
