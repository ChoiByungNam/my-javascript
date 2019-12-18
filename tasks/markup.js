function markup({
  gulp,
  plugins,
  name,
  src,
  basepath = 'src/',
  dest = 'demo/'
}) {
  const { plumberNotifier, newer, htmlhint, fileInclude } = plugins;
  const displayName = `markup:${name}`;
  const task = () => {
    return gulp
      .src(src)
      .pipe(plumberNotifier())
      .pipe(
        fileInclude({
          prefix: '@@',
          indent: true,
          basepath: basepath
        })
      )
      .pipe(newer(dest))
      .pipe(htmlhint({ htmlhintrc: '.htmlhintrc' }))
      .pipe(htmlhint.reporter())
      .pipe(gulp.dest(dest));
  };

  task.displayName = displayName;
  return task;
}

module.exports = ({ gulp, plugins = {} } = {}) => {
  return {
    app: markup({
      gulp,
      plugins,
      name: 'app',
      src: ['src/pages/**/*.html', '!**/_*/*', '!**/_*.*'],
      basepath: 'src',
      dest: 'demo/pages'
    }),
    index: markup({
      gulp,
      plugins,
      name: 'index',
      src: ['src/*.html'],
      basepath: 'src',
      dest: 'demo'
    })
  };
};
