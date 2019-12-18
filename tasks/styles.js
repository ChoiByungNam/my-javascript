// Enviroment Variable
const isProduction = process.env.NODE_ENV === 'production';

const autoprefixer = require('autoprefixer');
const postcssClean = require('postcss-clean');

function style({
  gulp,
  plugins,
  name,
  src,
  autoprefixerOptions,
  dest = 'demo/assets/css/'
}) {
  const {
    plumberNotifier,
    less,
    csslint,
    postcss,
    sourcemaps,
    flatten,
    newer
  } = plugins;

  const displayName = `style:${name}`;
  const task = () => {
    return (
      gulp
        .src(src)
        .pipe(plumberNotifier())
        .pipe(newer(dest))
        .pipe(plugins.if(!isProduction, sourcemaps.init()))
        // Less
        .pipe(
          less({
            // Set import root for less files
            paths: ['./src']
          })
        )
        // CSS Lint
        .pipe(csslint('./.csslintrc'))
        .pipe(csslint.formatter())
        .pipe(csslint.formatter('fail'))
        // Autoprefixer
        .pipe(postcss([autoprefixer(autoprefixerOptions)]))
        .pipe(
          plugins.if(
            isProduction,
            postcss([
              postcssClean({
                aggressiveMerging: false,
                restructuring: false,
                format: 'keep-breaks'
              })
            ])
          )
        )
        .pipe(plugins.if(!isProduction, sourcemaps.write()))
        .pipe(gulp.dest(dest))
    );
  };

  task.displayName = displayName;
  return task;
}

module.exports = ({ gulp, plugins = {} } = {}) => {
  return {
    app: style({
      gulp,
      plugins,
      name: 'app',
      src: [
        'src/**/*.less',
        '!src/components/**/*',
        '!**/_*/*',
        '!**/_*.*'
      ],
      dest: 'demo'
    })
  };
};
