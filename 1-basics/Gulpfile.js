var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('./assets/styles/site.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: "compressed"
    }))
    .pipe(gulp.dest('./dist/styles'))
});
