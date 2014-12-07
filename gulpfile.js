var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jade = require('gulp-jade');
var react = require('gulp-react');
var uglify = require('gulp-uglify');

var paths = {
  watch: {
    sass: ['./scss/**/*.scss'],
    jade: ['./jade/**/*.jade'],
    jsx: ['./jsx/**/*.jsx'],
    js: ['./js/**/*.js']
  },
  compile:{
    sass: ['./scss/ionic.app.scss'],
    jade: ['./jade/**/*.jade', '!./jade/**/_*.jade']
  },
  www:{
    css: './www/css/',
    html: './www/',
    js: './www/js/'
  }  
};

gulp.task('default', ['sass', 'jade', 'jsx', 'js']);

gulp.task('sass', function(done) {
  gulp.src(paths.compile.sass)
    .pipe(sass())
    .pipe(minifyCss({
      keepSpecialComments: 0
     }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.www.css))
    .on('end', done);
});

gulp.task('jade', function (done) {
    gulp.src(paths.compile.jade)
      .pipe(jade())
      .pipe(gulp.dest(paths.www.html))
      .on('end', done);
});

gulp.task('jsx', function () {
    return gulp.src(paths.watch.jsx)
        .pipe(react())
        .pipe(gulp.dest(paths.www.js));
});

gulp.task('js', function () {
    gulp.src(paths.watch.js)
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.www.js));
});


gulp.task('watch', function() {
  gulp.watch(paths.watch.sass, ['sass']);
  gulp.watch(paths.watch.jade, ['jade']);
  gulp.watch(paths.watch.jsx, ['jsx']);
  gulp.watch(paths.watch.js, ['js']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
