import fs from 'fs';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })))
    .pipe(ttf2woff())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};


export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts/fonts.scss`;

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

  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
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

            const templateFont = `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`;

            fs.appendFile(fontsFile, templateFont, cb);

            newFileOnly = fontFileName;
          }
        });

      } else {
        console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить');
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() { };
}
