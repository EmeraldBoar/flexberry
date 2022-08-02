import gulp from 'gulp';
import path from '../config/path.js';
import app from '../config/app.js';

import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import webp from 'gulp-webp';
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';



const img = () => {  
  return gulp.src(path.img.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: 'Image',
        message: error.message
      }))
    }))
    .pipe(newer(path.img.dest))
    .pipe(webp())
    .pipe(gulp.dest(path.img.dest))
    .pipe(gulp.src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(gulpIf(app.isProd, imagemin(app.imagemin)))
    .pipe(gulp.dest(path.img.dest))
    .pipe(browserSync.stream());
}

export default img;
