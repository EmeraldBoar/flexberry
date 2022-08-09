import fs from 'fs';
import gulp from 'gulp';
import path from '../config/path.js';


import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import browserSync from 'browser-sync';

const fonts = () => {
  return gulp.src(path.fonts.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: 'Fonts',
        message: error.message,
      })),
    }))
    .pipe(ttf2woff())
    .pipe(gulp.dest(path.fonts.dest))
    .pipe(gulp.src(path.fonts.src))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.fonts.dest))
    .pipe(browserSync.stream());
};

const fontsStyle = () => {
  let fontsFile = `${path.pathSrc}/scss/fonts/fonts.scss`;

  const weights = {
    'thin': 100,
    'light': 200,
    'medium': 300,
    'regular': 400,
    'semibold': 600,
    'bold': 700,
    'extrabold': 800,
    'heavy': 800,
    'black': 900,
  };

  fs.readdir(path.fonts.dest, function (err, fontsFiles) {
    if (fontsFiles) {
      if(!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);

        let newFileOnly;

        fontsFiles.forEach((fontFile) => {
          let fontFileName = fontFile.split('.')[0];

          if (newFileOnly !== fontFileName) {
            const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            const fontWeightName = fontFileName.split('-')[1] ? fontFileName.split('-')[1].toLowerCase() : fontFileName;

            const fontWeight = weights[fontWeightName] ? weights[fontWeightName] : 400;

            const templateFont = `@font-face {\n  font-family: "${fontName}";\n  font-display: swap;\n  src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n  font-weight: ${fontWeight};\n  font-style: normal;\n}\r\n\n`;

            fs.appendFile(fontsFile, templateFont, cb);

            newFileOnly = fontFileName;
          }
        });

      } else {
        console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить');
      }
    }
  });

  return gulp.src(`${path.pathSrc}`);
  function cb() { }
}

export { fonts, fontsStyle};
