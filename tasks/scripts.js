const log = require('fancy-log');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

module.exports = () =>
  new Promise((resolve, reject) => {
  this.displayName = 'webpack';
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      log.error('Webpack', err);
      reject(err);
    }

    log(stats.toString({ colors: true }));

    resolve();
  });
});