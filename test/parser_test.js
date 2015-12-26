"use strict";
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var tokenize = require('../js/parser.js').tokenize;
var readToken = require('../js/parser.js').readToken;
var parseToken = require('../js/parser.js').parseToken;

describe('parser', function () {
  describe('#tokenize(param)', function () {
    it('(define r 1)', function () {
      assert.deepEqual(tokenize('(define r 1)'), ['(', 'define', 'r', '1', ')']);
    });

    it('(+ 1 2)', function () {
      assert.deepEqual(tokenize('(+ 1 2)'), ['(', '+', '1', '2', ')']);
    });

    it('(+ (+ 1 2) (+ 1 2))', function () {
      assert.deepEqual(tokenize('(+ (+ 1 2) (+ 1 2))'), ['(', '+', '(', '+', '1', '2', ')', '(', '+', '1', '2', ')', ')']);
    });
  });

  describe('#readToken(token)', function () {
    it('parse int 100', function () {
      assert.equal(readToken('100'), 100);
    });
    
    it('parse float 100.123', function () {
      assert.equal(readToken('100.123'), 100.123);
    });
    
    it('parse float 0.12334', function () {
      assert.equal(readToken('0.12334'), 0.12334);
    });
    
    it('parse string +', function () {
      assert.equal(readToken('+'), '+');
    });
    
    it('parse string define', function () {
      assert.equal(readToken('define'), 'define');
    });
    
    it('parse string r', function () {
      assert.equal(readToken('r'), 'r');
    });
  });
  
  describe('#parseToken(tokenArray)', function () {
    it('should throw exception when array is empty', function () {
      expect(function() {
        parseToken([]);
      }).to.Throw('Unexpected EOF while reading');
    });
    
    it('should throw exception when ) not mach', function () {
      expect(function() {
        parseToken([')']);
      }).to.Throw("unexpected ')'");
    });
    
    it('parse (define pi 3.14)', function () {
      assert.deepEqual(parseToken(['(', 'define', 'pi', '3.14', ')']), ['define', 'pi', 3.14]);
    });
    
    it('parse (+ 1 2)', function () {
      assert.deepEqual(parseToken(['(', '+', '1', '2', ')']), ['+', 1, 2]);
    });
    
    it('parse (+ (+ 1 2) (+ 1 2))', function () {
      assert.deepEqual(parseToken(['(', '+', '(', '+', '1', '2', ')', '(', '+', '1', '2', ')', ')']), ['+', ['+', 1, 2], ['+', 1, 2]]);
    });
  });
});