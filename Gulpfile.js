'use strict';

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	mocha = require('gulp-mocha');

var paths = {
	scripts: ['./**/*.js', '!./node_modules/**/*.js'],
	tests: './test/**/*.js'
};

gulp.task('lint', function () {
	gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function () {
    gulp.src(paths.tests, { read: false })
        .pipe(mocha({reporter: 'nyan'}))
        .on('error', gutil.log);
});

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['lint', 'mocha']);
});

gulp.task('default', ['lint', 'mocha', 'watch']);