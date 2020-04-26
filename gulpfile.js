const gulp = require('gulp'); 
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const imagemin = require("gulp-imagemin");
const browserSync = require('browser-sync').create();

function css() {
    return src('sass/**/*.scss') 
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream())
}

function images() {
    return src('assets/img/**/*')
      .pipe(imagemin())
      .pipe(dest('dist/assets/img'));
  }

function watch() {
    browserSync.init({
        server: {
          baseDir: 'dist',
        }
      });

    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('./dist/**/*.html').on('change', browserSync.reload)
    gulp.watch("./assets/img/**/*", images);
}

exports.css = css;
exports.watch = watch;
exports.images = images;
