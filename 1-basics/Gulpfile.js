var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('styles', function() {
  gulp.src('./assets/styles/site.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: "compressed"
    }))
    .pipe(gulp.dest('./dist/styles'))
});

gulp.task('scripts', function() {
  return gulp.src(
           ['./assets/scripts/jquery.js',
            './assets/scripts/jquery.flexslider.js',
            './assets/scripts/site.js']
          )
    .pipe(uglify())
    .pipe(concat('site.js'))
    .pipe(gulp.dest('./dist/scripts'))
});
