import gulp from 'gulp';
import path from '../config/path.js';
import app from '../config/app.js';

import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import webpCss from 'gulp-webp-css';
import browserSync from 'browser-sync';


const css = () => {  
  return gulp.src(path.css.src, { sourcemaps: app.isDev })
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: 'CSS',
        message: error.message
      }))
    }))
    .pipe(concat('style.css'))
    .pipe(webpCss())
    .pipe(groupCssMediaQueries())
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev }))
    .pipe(browserSync.stream());
}

export default css;
