(function (exports) {
  "use strict";

  var symbolTable = {
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

  function evalProgram(expression) {
    if (typeof (expression) == 'string') {
      return symbolTable[expression];
    } else if (!(expression instanceof Array)) {
      return expression;
    } else if (expression[0] == 'define') {
      throw "define not support yet"
    } else {
      var operator = evalProgram(expression[0]);
      var args = expression.slice(1);
      var i = 0;
      for (; i < args.length; i++) {
        args[i] = evalProgram(args[i]);
      }
      return operator(args);
    }
  }
  
  //Self evaluating just number and string
  function isSelfEvaluating(expression) {
    var result = parseFloat(expression);
    if (!isNaN(result)) {
      //Number is self evaluating expression
      return true;
    }

    if (typeof expression === "string") {
      //String is self evaluating expression
      return true;
    }
    return false;
  }
  
  exports.symbolTable = symbolTable;
  exports.evalProgram = evalProgram;
  exports.isSelfEvaluating = isSelfEvaluating;
})(this);