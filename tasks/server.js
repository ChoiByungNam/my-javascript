const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackBundler = webpack(webpackConfig);

module.exports = function server() {
  browserSync.init({
    server: {
      baseDir: 'demo/',
      directory: true
    },
    middleware: [
      webpackDevMiddleware(webpackBundler, {
        publicPath: webpackConfig.output.publicPath,
        serverSideRender: true
      }),
      webpackHotMiddleware(webpackBundler)
    ],
    cors: true,
    startPath: '/',
    files: ['demo/**/*.html', 'demo/**/*.css', 'demo/assets/images/**/*'],
    ghostMode: false,
    notify: false
  });
};
