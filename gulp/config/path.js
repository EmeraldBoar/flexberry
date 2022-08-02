const pathSrc = './src'
const pathDest = './public'


const path = {
  root: pathDest,
  pathSrc,
  html: {
    src: `${pathSrc}/html/*.html`,
    watch: `${pathSrc}/html/**/*.html`,
    dest: pathDest,
  },
  pug: {
    src: `${pathSrc}/pug/*.pug`,
    watch: `${pathSrc}/pug/**/*.pug`,
    dest: pathDest,
  },
  css: {
    src: `${pathSrc}/css/*.css`,
    watch: `${pathSrc}/css/**/*.css`,
    dest: `${pathDest}/css`,
  },
  scss: {
    src: `${pathSrc}/scss/style.scss`,
    watch: `${pathSrc}/scss/**/*.scss`,
    dest: `${pathDest}/css`,
  },
  js: {
    src: `${pathSrc}/js/*.js`,
    watch: `${pathSrc}/js/**/*.js`,
    dest: `${pathDest}/js`,
  },
  img: {
    src: `${pathSrc}/img/*.{jpg,png,jpeg,gif}`,
    watch: `${pathSrc}/img/**/*.{png,jpg,jpeg,gif}`,
    dest: `${pathDest}/img`,
  },
  svg: {
    src: `${pathSrc}/img/icons/*.svg`,
    watch: `${pathSrc}/img/**/*.svg`,
    dest: `${pathDest}/img/icons`,
  },
  fonts: {
    src: `${pathSrc}/fonts/*.{ttf,eot,otf,otc,ttc,woff,woff2,svg}`,
    watch: `${pathSrc}/fonts/**/*.{ttf,eot,otf,otc,ttc,woff,woff2,svg}`,
    dest: `${pathDest}/fonts`,
  },
}


export default path;
