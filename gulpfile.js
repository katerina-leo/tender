import gulp from 'gulp';
import plumber from 'gulp-plumber';
import del from 'del';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import terser from 'gulp-terser';
import IMask from 'imask';

// Styles

export const styles = () => { // Название задачи для дальнейшего обращения к ней.
  return gulp.src('source/sass/style.scss') // Нахождение необходимых файлов, над которыми будет производится работа.
    .pipe(plumber()) //  Здесь происходит непосредственно сама работа. В данном случае мы обрабатываем ошибки, затем превращаем Sass-файлы в CSS-файлы и в конце добавляем префиксы.
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(gulp.dest('build/css')) //  Перенос итогового результата, CSS-файл с префиксами, в необходимую папку `source/css`.
    .pipe(browser.stream());
}

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}
//Scripts

const scripts = () => {
  return gulp.src('source/js/*.js',
  'source/dist/js/*.js',
  )
  // .pipe(terser())
  .pipe(gulp.dest('build/js'))
  .pipe(browser.stream());
}



//Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,jpeg,gif,webp}',

  )
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,gif,webp}',
  )

  .pipe(gulp.dest('build/img'));
}

const createWebp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(squoosh({
      webp: {}
    }))
  .pipe(gulp.dest('build/img'))
}

//SVG

const svg = () =>
  gulp.src(['source/img/*.svg', '!source/img/icons/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));


const sprite = () => {
return gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
  }))
      .pipe(rename('sprite.svg'))
      .pipe(gulp.dest('build/img'));
}

//Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/img/favicons/*.{png,svg}',
    'source/manifest.webmanifest',
    // 'source/robots.txt',
    // 'source/sitemap.xml',
    'source/dist/css/*.css',
    'source/dist/js/*.js',
    'source/dist/images/**/*.{jpg,png,gif,webp}',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

//Clean

const clean = () => {
  return del('build');
};

// Server - для обновления, отображения кода в браузере

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload - браузер перезагружает

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher - следить за файлами и перезагружает при изменении

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  // gulp.watch('source/dist/js/lightbox-plus-jquery.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
