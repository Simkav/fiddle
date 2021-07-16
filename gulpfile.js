'use strict'

const browserify = require('browserify')
const gulp = require('gulp')
const { watch } = require('gulp')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')

gulp.task('javascript', function () {
  var b = browserify({
    entries: './src/client/index.js',
    debug: true
  })

  return b
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./src/public/js/'))
})
