var Parser = require("jison").Parser;

const DOUBLE_QUOTE_STRING = "DOUBLE_QUOTE_STRING";

var grammar = {
  lex: {
    rules: [
      ['"', 'this.begin("DOUBLE_QUOTE_STRING"); return "\\"";'],
      [['DOUBLE_QUOTE_STRING'], '"', 'this.popState(); return "\\"";'],
      ["\\s+", "/* skip whitespace */"],
      /** NUMBER
       * Support "1" , "-1" , "1.0" , "-1.0" , "1." , ".1"
       */
      ["[-]?((\\d+(\\.\\d*)?)|(\\d*\\.\\d+))", 'return "NUMBER";'],
      // [
      //   [DOUBLE_QUOTE_STRING],
      //   '[^"\\r\\n]*',
      //   'console.log(yytext); return "DOUBLE_QUOTE_STRING";'
      // ],
      ["$", 'return "EOF";']
    ]
  },
  bnf: {
    entry: [["expr EOF", "return $1"]],
    expr: [
      ["number", "$$ = $1"],
      // ["string", "$$ = $1"]
    ],
    number: [["NUMBER", "$$ = Number($1)"]],
    // string: [
    //   [`double_quote_string`, "$$ = $1"]
    //   // [`single_quote_string`, '$$ = $1']
    // ],
    // double_quote_string: [
    //   [`" "`, '$$ = ""'],
    //   [`" DOUBLE_QUOTE_STRING "`, "$$ = $2"]
    // ]
    // single_quote_string: [
    //   [`' '`, '$$ = ""'],
    //   [`' SINGLE_QUOTE_STRING '`, '$$ = $2']
    // ],
  }
};

var parser = new Parser(grammar);
function parse(txt) {
  return parser.parse(txt);
}

module.exports = parse;

console.log(parse(`1`));
