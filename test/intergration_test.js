"use strict";

var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var parse = require('../js/parser.js').parse;
var evalProgram = require('../js/eval.js').evalProgram;

describe('Integration Test', function () {
  describe('Test simple expression', function () {
    it('test (+ 1 2) should return 3', function () {
      assert.equal(evalProgram(parse('(+ 1 2)')), 3);
    });
    it('test (+ (+ 1 2) (+ 1 2)) should return 6', function () {
      assert.equal(evalProgram(parse('(+ (+ 1 2) (+ 1 2))')), 6);
    });
    it('test (* (+ 1 2) 3) should return 9', function () {
      assert.equal(evalProgram(parse('(* (+ 1 2) 3)')), 9);
    });
  });
});