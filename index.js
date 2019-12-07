var Parser = require('jison').Parser;

var grammar = {
  lex: {
    // https://stackoverflow.com/questions/25889540/jison-start-conditions-with-json-format
    startConditions: {
      DOUBLE_QUOTE_STRING_START_CONDITION: '// string starts with double quote',
      SINGLE_QUOTE_STRING_START_CONDITION: '// string starts with single quote'
    },
    rules: [
      ['\\s+', '/* skip whitespace */'],
      /** DOUBLE QUOTE STRING
       * Note: visual "\n" we see in console when call JSON.stringify("a\nb") actually is "a" + "\" + "n" + "b"
       */
      [`"`, `this.begin("DOUBLE_QUOTE_STRING_START_CONDITION"); return '"';`],
      [
        ['DOUBLE_QUOTE_STRING_START_CONDITION'],
        `[^"\\r\\n]+`,
        'return "DOUBLE_QUOTE_STRING";'
      ],
      [
        ['DOUBLE_QUOTE_STRING_START_CONDITION'],
        `"`,
        `this.popState(); return '"';`
      ],
      /** SINGLE QUOTE STRING
       */
      [`'`, `this.begin("SINGLE_QUOTE_STRING_START_CONDITION"); return "'";`],
      [
        ['SINGLE_QUOTE_STRING_START_CONDITION'],
        `[^'\\r\\n]+`,
        'return "SINGLE_QUOTE_STRING";'
      ],
      [
        ['SINGLE_QUOTE_STRING_START_CONDITION'],
        `'`,
        `this.popState(); return "'";`
      ],
      /** IDENTIFIER
      * - Start with alphabet or underscore or $
      * - Followed by alphanumerics or underscores or $
      */
      ['[\\$a-zA-Z_][\\w\\$]*', 'return "IDENTIFIER"'],
      /** NUMBER
       * Support "1" , "-1" , "1.0" , "-1.0" , "1." , ".1"
       */
      ['[-]?((\\d+(\\.\\d*)?)|(\\d*\\.\\d+))', 'return "NUMBER";'],
      [',', 'return ",";'],
      ['\\[', 'return "[";'],
      [']', 'return "]";'],
      ['{', 'return "{";'],
      ['}', 'return "}";'],
      [':', 'return ":";'],
      ['$', 'return "EOF";']
    ]
  },
  bnf: {
    entry: [['expr EOF', 'return $1']],
    expr: [
      ['number', '$$ = $1'],
      ['string', '$$ = $1'],
      ['array', '$$ = $1'],
      ['object', '$$ = $1'],
    ],
    number: [['NUMBER', '$$ = Number($1)']],
    string: [
      ['double_quote_string', '$$ = $1'],
      ['single_quote_string', '$$ = $1']
    ],
    double_quote_string: [
      [`" "`, '$$ = ""'],
      [`" DOUBLE_QUOTE_STRING "`, '$$ = $2']
    ],
    single_quote_string: [
      [`' '`, '$$ = ""'],
      [`' SINGLE_QUOTE_STRING '`, '$$ = $2']
    ],
    array: [['[ argList ]', '$$ = $2']],
    argList: [
      ['expr , argList', '$$ = [$1].concat($3)'],
      ['expr', '$$ = [$1]'],
      ['', '$$ = []']
    ],
    object: [['{ objProperties }', '$$ = $2']],
    objProperties: [
      [
        'key : value , objProperties',
        '$$ = Object.assign({[$1]: $3}, $5)'
      ],
      ['key : value', '$$ = {[$1] : $3}'],
      ['', '$$ = {}']
    ],
    key: [
      ['string', '$$ = $1'],
      ['IDENTIFIER', '$$ = $1']
    ],
    value: [
      ['expr', '$$ = $1']
    ],
  }
};

var parser = new Parser(grammar);
function parse(txt) {
  return parser.parse(txt);
}

module.exports = parse;
