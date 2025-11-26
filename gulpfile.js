const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

// Compilar SASS, minificar CSS e mover para dist
function styles() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
}

// Minificar JS e mover para dist
function scripts() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
}

// Otimizar imagens e mover para dist
function images() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('dist/images'));
}

// Copiar HTML para dist
function html() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
}

// Watch para desenvolvimento
function watchFiles() {
  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/js/**/*.js', scripts);
  gulp.watch('src/images/**/*', images);
  gulp.watch('src/**/*.html', html);
}

// Tarefa padrão (desenvolvimento)
exports.default = gulp.series(
  gulp.parallel(styles, scripts, images, html),
  watchFiles
);

// Tarefa de build (produção)
exports.build = gulp.parallel(styles, scripts, images, html);
