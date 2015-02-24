var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
  gulp.src('./assets/styles/site.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: "compressed"
    }))
    .pipe(gulp.dest('./dist/styles'))
});

gulp.task('fonts', function() {
  gulp.src('./assets/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('scripts', function() {
  gulp.src(
           ['./assets/scripts/jquery.js',
            './assets/scripts/jquery.flexslider.js',
            './assets/scripts/site.js']
          )
    .pipe(uglify())
    .pipe(concat('site.js'))
    .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('images', function () {
  gulp.src('./assets/images/*')
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 5,
    }))
    .pipe(gulp.dest('./dist/images'))
});

gulp.task('styles', ['fonts', 'sass'])
