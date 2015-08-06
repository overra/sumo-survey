'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var jade = require('gulp-jade');
var scss = require('gulp-sass');
var concat = require('gulp-concat');
var merge = require('merge2');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var sequence = require('gulp-sequence');
var sync = require('browser-sync');
var nodemon = require('gulp-nodemon');

var bundler = browserify({
  entries: ['./client/src/application.js']
});

bundler.transform(babelify);

gulp.task('scripts', scripts);
gulp.task('views', views);
gulp.task('styles', styles);
gulp.task('watch', watch);

function scripts () {
  return bundler.bundle()
    .on('error', util.log.bind(util, 'Browserify error'))
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('client/public'))
    .pipe(sync.reload({stream: true}));
}

function views () {
  return gulp.src('client/src/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('client/public'))
    .pipe(sync.reload({stream: true}));
}

function styles () {
 var styles = gulp.src('client/src/application.scss')
   .pipe(scss());

 var vendorStyles = gulp.src([
   'node_modules/angular-material/angular-material.min.css'
 ]);

 return merge(vendorStyles, styles)
   .pipe(concat('application.css'))
   .pipe(gulp.dest('client/public'))
   .pipe(sync.reload({stream: true}));
}

function watch(done) {
  bundler = watchify(bundler);
  bundler.on('update', scripts);
  bundler.on('log', util.log);

  nodemon({
    script: 'index.js',
    ext: 'js',
    watch: ['index.js', 'server/']
  });

  sequence(['views', 'styles', 'scripts'], function () {
    sync.init({
      proxy: 'localhost:3000'
    });

    gulp.watch('client/src/**/*.jade', ['views']);
    gulp.watch('client/src/**/*.scss', ['styles']);
    done();
  });
}
