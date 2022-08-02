import browserSync from 'browser-sync';

const server = () => {
  browserSync.init( {
    server: {
      baseDir: "./public/"
    }
  })
}

export default server;
