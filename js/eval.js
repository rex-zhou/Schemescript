(function (exports) {
  "use strict";
 
  function syntax() {
    var syntaxMap = {
      '+': function (arr) {
        return arr.reduce((a, b) => a + b);
      },
      '-': function (arr) {
        return arr.reduce((a, b) => a - b);
      },
      '*': function (arr) {
        return arr.reduce((a, b) => a * b);
      },
      '/': function (arr) {
        return arr.reduce((a, b) => a / b);
      },
      '>': function (arr) {
        return arr.reduce((a, b) => a > b);
      },
      '<': function (arr) {
        return arr.reduce((a, b) => a < b);
      },
      '>=': function (arr) {
        return arr.reduce((a, b) => a >= b);
      },
      '<=': function (arr) {
        return arr.reduce((a, b) => a <= b);
      },
      '=': function (arr) {
        return arr.reduce((a, b) => a == b);
      },
      'and': function (arr) {
        return arr.reduce((a, b) => a && b);
      },
      'or': function (arr) {
        return arr.reduce((a, b) => a || b);
      },
      'not': function (arr) {
        return !arr;
      }
    }

    return syntaxMap;
  }

  function evalProgram(param, syntax) {
    if (typeof (param) == 'string') {
      return syntax[param];
    } else if (!(param instanceof Array)) {
      return param;
    } else if (param[0] == 'define') {
      console.log('define not supported yet');
    } else {
      var operator = evalProgram(param[0], syntax);
      var args = param.slice(1);
      var i = 0;
      for (; i < args.length; i++) {
        args[i] = evalProgram(args[i], syntax);
      }
      return operator(args);
    }
  }
  
  exports.syntax = syntax;
  exports.evalProgram = evalProgram;
})(this);