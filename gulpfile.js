import gulp from 'gulp';
import path from './gulp/config/path.js';
import app from './gulp/config/app.js';


// Tasks
import clear from './gulp/tasks/clear.js'
import pug from './gulp/tasks/pug.js'
import html from './gulp/tasks/html.js'
import css from './gulp/tasks/css.js'
import scss from './gulp/tasks/scss.js'
import js from './gulp/tasks/js.js'
import img from './gulp/tasks/img.js'
import { fonts, fontsStyle } from './gulp/tasks/fonts.js'
import server from './gulp/tasks/server.js'
import svg from './gulp/tasks/svg.js'



// Watcher
const watcher = () => {
  gulp.watch(path.html.watch, html);
  // gulp.watch(path.pug.watch, pug);
  gulp.watch(path.scss.watch, scss);
  gulp.watch(path.js.watch, js);
  gulp.watch(path.img.watch, img);
  gulp.watch(path.fonts.watch, fonts);
  gulp.watch(path.svg.watch, svg);
}

const font = gulp.series(fonts, fontsStyle);


const build = gulp.series(
  clear,
  font,
  gulp.parallel(html, scss, js, img, svg),
)

const dev = gulp.series(
  build,
  gulp.parallel(watcher, server)
)
console.log(process.argv);


export default app.isProd ? build : dev;
