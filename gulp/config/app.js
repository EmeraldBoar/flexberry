const isProd = process.argv.includes('--production');
const isDev = !isProd;



export default {
  isProd,
  htmlmin: {
    collapseWhitespace: isProd
  },
  pug: {
    pretty: isDev
  },
  webpack: {
    mode: isProd ? 'production' : 'development',
    devtool: 'source-map',
  },
  imagemin: {
    verbose: true
  },
}
