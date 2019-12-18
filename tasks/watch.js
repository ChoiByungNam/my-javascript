module.exports = ({ gulp } = {}) => {
  return () => {
    gulp.watch('src/**/*.html', gulp.series(['html']));
    gulp.watch('src/components/sprites/**/*.png', gulp.series(['sprite+css']));
    gulp.watch('src/**/*.less', gulp.series(['css']));
    gulp.watch(
      [
        'src/assets/**/*.{png,gif,jpg,jpeg}',
        '!src/components/sprites/**/*.png'
      ],
      gulp.series(['img'])
    );
    // gulp.watch('src/assets/js/vendor/**/*', gulp.series(['js']));
    gulp.watch('src/assets/js/vendor/**/*', gulp.series(['js:vendor']));
  };
};
