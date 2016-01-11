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
      var procedure = expression[1];
      if (isSelfEvaluating(procedure)) {
        symbolTable[procedure] = expression.slice(2);
      } else {
        var subProcedure = procedure[0];
        var operation = expression[2];
        symbolTable[subProcedure] = symbolTable[operation[0]];
      }
    } else if (expression[0] == 'if'){
      if (evalProgram(expression[1])) {
        return evalProgram(expression[2]);
      } else {
        return evalProgram(expression[3]);
      }
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
