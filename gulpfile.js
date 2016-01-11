'use strict'

var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', function() {
  exec('mocha', function(err) {
    if (err) {
      console.log(err);
    }
  });
});
