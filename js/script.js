"use strict";

function execute() {
  var progarm = document.getElementById("inputcode").value;
  var interProgarm = parse(progarm);
  console.log(interProgarm);
  var output = evalProgram(interProgarm, syntax());
  document.getElementById("outputarea").innerHTML = output;
}

function parse(param) {
  return parseToken(tokenize(param));
}

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
    syntax.set(param[1], evalProgram(param[2], syntax));
  } else {
    var operator = evalProgram(param[0], syntax);
    var args = param.slice(1);
    console.log(args);
    var i = 0;
    for (; i < args.length; i++) {
      args[i] = evalProgram(args[i], syntax);
    }
    return operator(args);
  }
}