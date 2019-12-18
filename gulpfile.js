// Environment Variable
const isProduction = process.env.NODE_ENV === 'production';

// Dependencies
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const dependencies = {
  gulp,
  plugins
};

// Task Functions
const clean = require('./tasks/clean');
const assets = require('./tasks/assets')(dependencies);
const markup = require('./tasks/markup')(dependencies);
const styles = require('./tasks/styles')(dependencies);
const scripts = require('./tasks/scripts');
const server = require('./tasks/server');
const watch = require('./tasks/watch')(dependencies);
const sprites = require('./tasks/sprites')(dependencies);

// Tasks
gulp.task('clean', gulp.parallel([clean.demo, clean.sprites]));
gulp.task('clean:app', gulp.parallel([clean.pages, clean.sprites]));
gulp.task(
  'assets',
  gulp.parallel([assets.favicon, assets.fonts, assets.vendors])
);
gulp.task('html', gulp.parallel([markup.index, markup.app]));
gulp.task('html:app', markup.app);
gulp.task('html:index', markup.index);
gulp.task('img', assets.images);
gulp.task('css:app', styles.app);
gulp.task('css', gulp.parallel('css:app'));
gulp.task('sprites', gulp.parallel(sprites));
gulp.task('sprite+css', gulp.series('sprites', 'css'));
gulp.task('js:vendor', assets.vendors);

const buildTasks = ['assets', 'img', 'sprite+css', 'html'];
let defaultTasks;

if (isProduction) {
  buildTasks.push('js');
  defaultTasks = gulp.series('clean', gulp.parallel(buildTasks));
} else {
  defaultTasks = gulp.series(
    'clean',
    gulp.parallel(buildTasks),
    gulp.parallel([server, watch])
  );
}

gulp.task('default', gulp.parallel(defaultTasks));
