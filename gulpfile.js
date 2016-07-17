var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var htmlmin = require('gulp-html-minifier');
var inlinesource = require('gulp-inline-source');

gulp.task('default',
  function () {
    gulp.watch('src/css/main.css')
      .on('change', browserSync.reload);
    gulp.watch('src/js/main.js', ['lint'])
      .on('change', browserSync.reload);
    gulp.watch('src/index.html')
      .on('change', browserSync.reload);

    browserSync.init({
      server: './src',
    });
  });

gulp.task('copy-styles', function () {
  gulp.src('src/css/main.scss')
    .pipe(sass({
      outputStyle: 'compressed',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy-html', function () {
  gulp.src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function () {
  return gulp.src('src/**/*.{jpg,jpeg,png,gif}')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()],
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-scripts', function () {
  gulp.src('src/js/main.js') //.pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('dist', [
  'copy-images',
  'copy-styles',
  'copy-scripts',
  'copy-html',
]);

gulp.task('distserve', ['dist'],
  function () {
    browserSync.init({
      server: './dist',
    });
  }
);
