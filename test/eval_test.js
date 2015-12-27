"use strict";

var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var syntax = require('../js/eval.js').syntax;
var evalProgram = require('../js/eval.js').evalProgram;

describe('eval test', function () {
  describe('syntax()', function () {
    it('test 1 + 2 should return 3', function () {
      assert.equal(syntax()['+']([1, 2]), 3);
    });
    it('test 21 + 35 + 12 + 7 should return 75', function () {
      assert.equal(syntax()['+']([21, 35, 12, 7]), 75);
    });
    it('test 2.7 + 10 should return 12.7', function () {
      assert.equal(syntax()['+']([2.7, 10]), 12.7);
    });
    it('test 10 - 6 should return 4', function () {
      assert.equal(syntax()['-']([10, 6]), 4);
    });
    it('test 25 * 4 * 12 should return 1200', function () {
      assert.equal(syntax()['*']([25, 4, 12]), 1200);
    });
    it('test 10 / 5 should return 2', function () {
      assert.equal(syntax()['/']([10, 5]), 2);
    });
    it('test 1 / 8 should return 0.125', function () {
      assert.equal(syntax()['/']([1, 8]), 0.125);
    });
    it('test 1 > 2 should return false', function () {
      assert.equal(syntax()['>']([1, 2]), false);
    });
    it('test 5 > 1 should return true', function () {
      assert.equal(syntax()['>']([5 ,1]), true);
    });
    it('test 1 < 2 should return true', function () {
      assert.equal(syntax()['<']([1, 2]), true);
    });
    it('test 5 < 1 should return false', function () {
      assert.equal(syntax()['<']([5, 1]), false);
    });
    it('test 1 >= 2 should return false', function () {
      assert.equal(syntax()['>=']([1, 2]), false);
    });
    it('test 1 >= 1 should return true', function () {
      assert.equal(syntax()['>=']([1, 1]), true);
    });
    it('test 1 <= 2 should return true', function () {
      assert.equal(syntax()['<=']([1, 2]), true);
    });
    it('test 1 <= 1 should return true', function () {
      assert.equal(syntax()['<=']([1, 1]), true);
    });
    it('test true and false should return false', function () {
      assert.equal(syntax()['and']([true, false]), false);
    });
    it('test true and true should return true', function () {
      assert.equal(syntax()['and']([true, true]), true);
    });
    it('test true or false should return true', function () {
      assert.equal(syntax()['or']([true, false]), true);
    });
    it('test false or false should return false', function () {
      assert.equal(syntax()['or']([false, false]), false);
    });
    it('test not true should return false', function () {
      assert.equal(syntax()['not'](true), false);
    });
    it('test not false should return true', function () {
      assert.equal(syntax()['not'](false), true);
    });
    it('test not 1 should return false', function () {
      assert.equal(syntax()['not'](1), false);
    });
    it('test not 0 should return true', function () {
      assert.equal(syntax()['not'](0), true);
    });
  });
});