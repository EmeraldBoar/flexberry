import gulp from 'gulp';
import path from '../config/path.js';
import app from '../config/app.js';


import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import webpCss from 'gulp-webp-css';
import browserSync from 'browser-sync';



import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);


const scss = () => {  
  return gulp.src(path.scss.src, { sourcemaps: app.isDev })
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: 'SCSS',
        message: error.message
      }))
    }))
    .pipe(sass())
    // .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(groupCssMediaQueries())
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
    .pipe(browserSync.stream());
}

export default scss;
