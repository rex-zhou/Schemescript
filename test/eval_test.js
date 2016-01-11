"use strict";

var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var symbolTable = require('../js/eval.js').symbolTable;
var evalProgram = require('../js/eval.js').evalProgram;
var isSelfEvaluating = require('../js/eval.js').isSelfEvaluating;

describe('eval test', function () {
  describe('test symbol table', function () {
    it('test 1 + 2 should return 3', function () {
      assert.equal(symbolTable['+']([1, 2]), 3);
    });
    it('test 21 + 35 + 12 + 7 should return 75', function () {
      assert.equal(symbolTable['+']([21, 35, 12, 7]), 75);
    });
    it('test 2.7 + 10 should return 12.7', function () {
      assert.equal(symbolTable['+']([2.7, 10]), 12.7);
    });
    it('test 10 - 6 should return 4', function () {
      assert.equal(symbolTable['-']([10, 6]), 4);
    });
    it('test 25 * 4 * 12 should return 1200', function () {
      assert.equal(symbolTable['*']([25, 4, 12]), 1200);
    });
    it('test 10 / 5 should return 2', function () {
      assert.equal(symbolTable['/']([10, 5]), 2);
    });
    it('test 1 / 8 should return 0.125', function () {
      assert.equal(symbolTable['/']([1, 8]), 0.125);
    });
    it('test 1 > 2 should return false', function () {
      assert.equal(symbolTable['>']([1, 2]), false);
    });
    it('test 5 > 1 should return true', function () {
      assert.equal(symbolTable['>']([5 ,1]), true);
    });
    it('test 1 < 2 should return true', function () {
      assert.equal(symbolTable['<']([1, 2]), true);
    });
    it('test 5 < 1 should return false', function () {
      assert.equal(symbolTable['<']([5, 1]), false);
    });
    it('test 1 >= 2 should return false', function () {
      assert.equal(symbolTable['>=']([1, 2]), false);
    });
    it('test 1 >= 1 should return true', function () {
      assert.equal(symbolTable['>=']([1, 1]), true);
    });
    it('test 1 <= 2 should return true', function () {
      assert.equal(symbolTable['<=']([1, 2]), true);
    });
    it('test 1 <= 1 should return true', function () {
      assert.equal(symbolTable['<=']([1, 1]), true);
    });
    it('test true and false should return false', function () {
      assert.equal(symbolTable['and']([true, false]), false);
    });
    it('test true and true should return true', function () {
      assert.equal(symbolTable['and']([true, true]), true);
    });
    it('test true or false should return true', function () {
      assert.equal(symbolTable['or']([true, false]), true);
    });
    it('test false or false should return false', function () {
      assert.equal(symbolTable['or']([false, false]), false);
    });
    it('test not true should return false', function () {
      assert.equal(symbolTable['not'](true), false);
    });
    it('test not false should return true', function () {
      assert.equal(symbolTable['not'](false), true);
    });
    it('test not 1 should return false', function () {
      assert.equal(symbolTable['not'](1), false);
    });
    it('test not 0 should return true', function () {
      assert.equal(symbolTable['not'](0), true);
    });
  });

  describe('isSelfEvaluating(expression)', function () {
    it('test 1 should return true', function () {
      assert.equal(isSelfEvaluating(1), true);
    });
    it('test - should return true', function () {
      assert.equal(isSelfEvaluating('-'), true);
    });
    it('test list should return false', function () {
      assert.equal(isSelfEvaluating(['list', '1', '2']), false);
    });
    it('test object should return false', function () {
      assert.equal(isSelfEvaluating({name:'rex', age:50}), false);
    });
  });

  describe('evalProgram(expression)', function () {
    it('test [\'+\', 1, 2] should return 3', function () {
      assert.equal(evalProgram(['+', 1, 2]), 3);
    });
    it('test [\'+\', 21, 25, 12, 7] should return 75', function () {
      assert.equal(evalProgram(['+', 21, 35, 12, 7]), 75);
    });
    it('test [\'+\', 2.7, 10] should return 12.7', function () {
      assert.equal(evalProgram(['+', 2.7, 10]), 12.7);
    });
    it('test [\'>\', 1 , 2] should return false', function () {
      assert.equal(evalProgram(['>', 1, 2]), false)
    });
    it('test [define, val, 3] should add val 3 in symbol table', function () {
      evalProgram(['define', 'val', 3]);
      assert.equal(symbolTable['val'], 3);
    });
    it('test [define, [add a b], [+ a b]] should works and (add 1 2) should return 3', function () {
      evalProgram(['define', ['add', 'a', 'b'], ['+', 'a', 'b']]);
      assert.equal(evalProgram(['add', 1, 2]), 3);
    });
    it('test [if, [> 3 5], 3, 5 ] should return 5', function () {
      assert.equal(evalProgram(['if', ['>', 3, 5], 3, 5]), 5);
    });
    it('test [if, ture, 3, 5] should return 3', function () {
      assert.equal(evalProgram(['if', true, 3, 5]), 3);
    });
  });
});
