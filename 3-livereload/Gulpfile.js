var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var assetPaths = {
  scripts: ['assets/scripts/jquery.js',
            'assets/scripts/jquery.flexslider.js',
            'assets/scripts/site.js'],
  images:   'assets/images/**/*.jpg',
  fonts:    'assets/fonts/**/*',
  styles:   'assets/styles/site.scss',
  html:     './*.html'
}

var distPaths = {
  scripts: 'dist/scripts',
  images:  'dist/images',
  fonts:   'dist/fonts',
  styles:  'dist/styles'
}

gulp.task('sass', function() {
  gulp.src(assetPaths.styles)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: "compressed"
    }))
    .pipe(gulp.dest(distPaths.styles))
    .pipe(reload({stream: true}))
});

// Flexslider uses an icon font and our CSS has a relative path.
// Thus, we move fonts over to the dist folder as well
gulp.task('fonts', function() {
  gulp.src(assetPaths.fonts)
    .pipe(gulp.dest(distPaths.fonts))
});

gulp.task('scripts', function() {
  // These files are processed in order, instead of globbing js/*
  // as site requires flexslider requires jquery
  gulp.src(assetPaths.scripts)
    .pipe(uglify())
    .pipe(concat('site.js'))
    .pipe(gulp.dest(distPaths.scripts))
});

gulp.task('images', function () {
  gulp.src(assetPaths.images)
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 5,
    }))
    .pipe(gulp.dest(distPaths.images))
});

gulp.task('watch', function() {
  gulp.watch(assetPaths.scripts, ['scripts']);
  gulp.watch(assetPaths.styles, ['sass']);
  gulp.watch(assetPaths.images, ['images']);
});

gulp.task('serve', ['sass'], function() {
  browserSync({
    server: "./"
  });

  gulp.watch(assetPaths.scripts, ['scripts']).on('change', reload);
  gulp.watch(assetPaths.styles, ['sass']);
  gulp.watch(assetPaths.images, ['images']).on('change', reload);
  gulp.watch(assetPaths.html).on('change', reload);
});

// When running the Styles task, move over fonts before compiling Sass
gulp.task('styles', ['fonts', 'sass'])

gulp.task('default', ['styles', 'scripts', 'images'])
