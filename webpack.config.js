/* eslint-env node */
const { resolve, join, basename, sep } = require('path');
const glob = require('glob');
const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const getEntry = () => {
  const files = {};
  glob
    .sync('src/**/*.js', {
      ignore: ['src/components/**/*', 'src/util/**/*', 'src/polyfills/**/*', 'src/assets/js/vendor/**/*']
    })
    .forEach(function(item) {
      const match = basename(item).match(/(.+)\.js$/);
      const fileName = item.split('src/')[1];

      if (match) {
        files[fileName.match(/(.+)\.js$/)[1]] = [resolve(__dirname, item)];
      }
    });
  return files;
};

// https://webpack.js.org/configuration/
module.exports = {
  mode,
  devtool: mode === 'development' ? 'source-map' : '',
  watch: mode === 'development',
  entry: getEntry(),
  output: {
    filename: '[name].js',
    // path: resolve(__dirname, 'demo/assets/js/'),
    // publicPath: '/assets/js/'
    path: resolve(__dirname, 'demo'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // node_modules 내의 모듈들은 Babel 처리하지 않음.
        // 단, IE 11에서 swiper를 사용하려면 swiper와 dom7도 Babel 처리가 필요하므로
        // exclude 되지 않도록 처리.
        // Windows는 디렉토리 구분자가 `\`이므로 정규식 사용 시 `path.sep`을 사용하여
        // 플랫폼 별로 적합한 구분자 사용하도록 해주어야 함.
        exclude: filePath =>
          new RegExp(`node_modules\\${sep}(?!(dom7|swiper)\\${sep}).*`).test(
            filePath
          ),
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [resolve(__dirname, 'src'), 'node_modules']
  },
  devServer: {
    contentBase: join(__dirname, 'public')
  }
};
