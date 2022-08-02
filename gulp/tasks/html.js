import gulp from 'gulp';
import path from '../config/path.js';
import app from '../config/app.js';

import fileInclude from 'gulp-file-include';
import notify from 'gulp-notify';
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import webpHtml from 'gulp-webp-html';
import browserSync from 'browser-sync';


const html = () => {  
  return gulp.src(path.html.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: 'HTML',
        message: error.message
      }))
    }))
    .pipe(fileInclude())
    .pipe(htmlmin(app.htmlmin))
    .pipe(gulp.dest(path.html.dest))
    .pipe(browserSync.stream());
};

export default html;
