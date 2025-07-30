const { src, dest, watch, series, parallel } = require('gulp');
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const cssNano = require('gulp-cssnano');
const fileInclude = require('gulp-file-include');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = gulpSass(dartSass);
const cached = require('gulp-cached'); // Added for caching
const remember = require('gulp-remember'); // Added for caching
const sourcemaps = require('gulp-sourcemaps'); // Added for sourcemaps in dev

// Constants
const FOLDER = "/project"; // Uppercase for constants
const IS_PROD = process.env.NODE_ENV === 'production'; // Environment detection

const PATHS = {
  build: {
    html: '/html/build',
    js: '/html/build/js',
    css: '/html/build/css'
  },
  src: {
    html: '/html/src/*.html',
    js: '/html/src/js/*.js',
    css: '/html/src/css/*.scss'
  },
  watch: {
    html: '/html/src/**/*.html',
    js: '/html/src/**/*.js',
    css: '/html/src/**/*.scss'
  }
};

// Helper function to build full path
const getPath = (type) => FOLDER + PATHS[type];

// Error handler for plumber
const plumberErrorHandler = {
  errorHandler: function(err) {
    console.error(err.message);
    this.emit('end');
  }
};

function htmlTask() {
  return src(FOLDER + PATHS.src.html)
    .pipe(plumber(plumberErrorHandler))
    .pipe(cached('html')) // Cache files to only process changed ones
    .pipe(fileInclude({ prefix: '// @@', basepath: '@file' }))
    .pipe(dest(FOLDER + PATHS.build.html))
}

function jsTask() {
  return src(FOLDER + PATHS.src.js)
    .pipe(plumber(plumberErrorHandler))
    .pipe(cached('js')) // Cache files
    .pipe(fileInclude({ prefix: '// @@', basepath: '@file' }))
    .pipe(!IS_PROD ? sourcemaps.init() : noop()) // Only in dev
    .pipe(dest(FOLDER + PATHS.build.js))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(!IS_PROD ? sourcemaps.write('.') : noop()) // Only in dev
    .pipe(dest(FOLDER + PATHS.build.js));
}

function cssTask() {
  return src(FOLDER + PATHS.src.css)
    .pipe(plumber(plumberErrorHandler))
    .pipe(cached('css')) // Cache files
    .pipe(fileInclude({ prefix: '// @@', basepath: '@file' }))
    .pipe(!IS_PROD ? sourcemaps.init() : noop()) // Only in dev
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(FOLDER + PATHS.build.css))
    .pipe(cssNano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(!IS_PROD ? sourcemaps.write('.') : noop()) // Only in dev
    .pipe(dest(FOLDER + PATHS.build.css));
}

function watchTask() {
  // Use polling for WSL filesystem issues
  const watchOptions = {
    interval: 1000,
    usePolling: true
  };

  watch(FOLDER + PATHS.watch.html, watchOptions, series(htmlTask))
    .on('change', (path) => console.log(`HTML changed: ${path}`));

  watch(FOLDER + PATHS.watch.js, watchOptions, series(jsTask))
    .on('change', (path) => console.log(`JS changed: ${path}`));

  watch(FOLDER + PATHS.watch.css, watchOptions, series(cssTask))
    .on('change', (path) => console.log(`CSS changed: ${path}`));
}

// Build task without watching (for Docker)
function buildTask() {
  return series(
    parallel(htmlTask, jsTask, cssTask)
  );
}

// No-operation function for conditional pipes
function noop() {
  return through2.obj();
}

exports.build = buildTask();
exports.default = series(
  parallel(htmlTask, jsTask, cssTask),
  watchTask
);