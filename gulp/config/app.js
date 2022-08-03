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
    output: {
      filename: 'main.bundle.js'
    }
  },
  imagemin: {
    verbose: true
  },
}
