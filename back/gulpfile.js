var gulp = require('gulp');
var configBS = require('./browserSync.config.js');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var node = null;

var http = require('http');
var fs = require('fs');
var mime = require('mime');

// Import dependencies
var jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    recess = require('gulp-recess'),
    minifyCSS = require('gulp-minify-css'),
    path = require('path');

// Define tasks

gulp.task('watch', function () {
    gulp.watch(['*.js'], ['js']);
    return gulp;
});

gulp.task('serve', ['watch'], function () {
    exec('node server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        browserSync.init(configBS);
    });
    return gulp;
});