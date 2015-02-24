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

// Flexslider uses an icon font and our CSS has a relative path.
// Thus, we move fonts over to the dist folder as well
gulp.task('fonts', function() {
  gulp.src('./assets/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('scripts', function() {
  // These files are processed in order, instead of globbing js/*
  // as site requires flexslider requires jquery
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

// When running the Styles task, move over fonts before compiling Sass
gulp.task('styles', ['fonts', 'sass'])
