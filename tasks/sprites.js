const { lstatSync, readdirSync } = require('fs');
const { resolve, join } = require('path');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');

function getSprites(src) {
  const source = resolve(__dirname, '../', src);
  return readdirSync(source)
    .map(name => {
      return {
        src: join(src, name),
        path: join(source, name),
        name: name
      };
    })
    .filter(dir => lstatSync(dir.path).isDirectory());
}

const defaults = {
  padding: 4,
  cssSpritesheetName: 'icon',
  cssTemplate: 'src/components/sprites/template.hbs',
  cssHandlebarsHelpers: {
    sort: arr => {
      arr.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
    returnpx: function(num) {
      return num + 'px';
    }
  }
};

const retina = {
  padding: 4,
  cssSpritesheetName: 'icon',
  cssTemplate: 'src/components/sprites/template.hbs',
  cssHandlebarsHelpers: {
    sort: arr => {
      arr.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
    returnpx: function(num) {
      return Math.round(num / 2) + 'px';
    }
  }
};

function sprite({
  gulp,
  plugins = {},
  displayName = 'sprite',
  spritesmithOptions = {},
  src,
  dest = 'demo/assets/images/sprite/'
} = {}) {
  const { newer, replace, rename } = plugins;
  const options = Object.assign({}, defaults, spritesmithOptions);

  options.cssVarMap = sprite => {
    sprite.name = `${options.cssSpritesheetName}-${sprite.name}`;
  };

  const task = () => {
    const data = gulp
      .src(src)
      .pipe(newer(dest))
      .pipe(spritesmith(options));
    const imgStream = data.img.pipe(buffer()).pipe(gulp.dest(dest));
    const cssStream = data.css
      .pipe(gulp.dest('./src/components/sprites'))
      .pipe(replace(' {', '() {'))
      .pipe(
        rename(function(path) {
          path.basename += '-variable';
        })
      )
      .pipe(gulp.dest('./src/components/sprites'));

    return merge(imgStream, cssStream);
  };

  task.displayName = displayName;
  return task;
}

module.exports = ({ gulp, plugins } = {}) => {
  const tasks = [];
  getSprites('src/components/sprites/').forEach(item => {
    tasks.push(
      sprite({
        gulp,
        plugins,
        displayName: `sprite:${item.name}`,
        spritesmithOptions: Object.assign({}, retina, {
          imgName: `${item.name}.png`,
          cssName: `_sprite-${item.name}.less`,
          imgPath: `/assets/images/sprite/${item.name}.png`,
          cssSpritesheetName: `sprite-${item.name}`
        }),
        src: `${item.src}/*.png`,
        dest: `demo/assets/image/sprite/`
      })
    );
  });
  return tasks;
};
