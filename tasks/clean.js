const del = require('del');

module.exports = {
  demo: () => del(['demo/']),
  pages: () => del(['demo/pages/']),
  css: () => del(['demo/**/*.css']),
  js: () => del(['demo/**/*.js']),
  sprites: () => del(['src/components/sprites/*.less'])
};
