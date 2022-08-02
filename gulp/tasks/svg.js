import gulp from 'gulp';
import path from '../config/path.js';
import svgSprite from "gulp-svg-sprite";
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';


export const sprite = () => {
  return gulp.src(path.svg.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: 'SVG',
        message: error.message
      }))
    }))
    .pipe(gulp.dest(path.svg.dest))
    .pipe(svgSprite ({
      mode: {
        stack: {
          sprite: `../sprite/sprite.svg`,
        },
      }
    }))
    .pipe(gulp.dest(path.svg.dest));
}

export default sprite;
