module.exports = ({ gulp, plugins = {} } = {}) => {
  const { plumberNotifier, newer, flatten, imagemin } = plugins;

  return {
    favicon: () =>
      gulp
        .src('src/favicon.ico')
        .pipe(newer('demo/'))
        .pipe(gulp.dest('demo/')),
    fonts: () =>
      gulp
        .src('src/components/font/*.{eot,ttf,woff,woff2}')
        .pipe(newer('demo/assets/fonts/'))
        .pipe(flatten())
        .pipe(gulp.dest('demo/assets/fonts/')),
    images: () =>
      gulp
        .src([
          'src/assets/images/**/*.{png,gif,jpg,jpeg}',
          '!src/components/sprites/**/*.png'
        ])
        .pipe(plumberNotifier())
        .pipe(newer('demo/assets/images/'))
        .pipe(imagemin())
        .pipe(gulp.dest('demo/assets/images/')),
    vendors: () =>
      gulp
        .src('src/assets/js/vendor/**/*')
        .pipe(plumberNotifier())
        .pipe(newer('demo/assets/js/vendor/'))
        .pipe(gulp.dest('demo/assets/js/vendor/'))
  };
};
