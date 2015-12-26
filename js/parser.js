(function (exports) {
  "use strict";

  function tokenize(param) {
    return param.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').match(/\S+/g);
  }

  function readToken(token) {
    var result = parseFloat(token);
    if (isNaN(result)) {
      result = token.toString();
    }
    return result;
  }

  function parseToken(tokenArray) {
    if (tokenArray.length == 0) {
      throw "Unexpected EOF while reading";
    }

    var token = tokenArray.shift();
    if (token == "(") {
      var expression = [];
      while (tokenArray[0] != ")") {
        expression.push(parseToken(tokenArray));
      }
      tokenArray.shift();
      return expression;
    } else if (token == ")") {
      throw "unexpected ')' ";
    } else {
      return readToken(token);
    }
  }

  exports.tokenize = tokenize;
  exports.readToken = readToken;
  exports.parseToken = parseToken;
})(this);