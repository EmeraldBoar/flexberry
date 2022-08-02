import gulp from 'gulp';
import path from '../config/path.js';
import app from '../config/app.js';

import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import pugs from 'gulp-pug';
import webpHtml from 'gulp-webp-html';


const pug = () => {  
  return gulp.src(path.pug.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: 'PUG',
        message: error.message
      }))
    }))
    .pipe(pugs(app.pug))
    .pipe(webpHtml())
    .pipe(gulp.dest(path.pug.dest));
}

export default pug;
