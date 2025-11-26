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
    return gulp.src('src/images/**/*') // Isso inclui todas as subpastas
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

// Watch para desenvolvimento
function watch() {
  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/js/**/*.js', scripts);
  gulp.watch('src/images/**/*', images);
}

// Tarefa padrão
exports.default = gulp.series(
  gulp.parallel(styles, scripts, images),
  watch
);

// Tarefa de build para produção
exports.build = gulp.parallel(styles, scripts, images);