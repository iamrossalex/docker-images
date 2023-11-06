const { src, dest, watch, series, parallel } = require('gulp');
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const cssNano = require('gulp-cssnano');
const fileInclude = require('gulp-file-include');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = gulpSass(dartSass);

var folder = "/project";


var path = {
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

function htmlTask() {
	console.log("Folder: " + folder + path.src.html);
	return src(folder + path.src.html)
		.pipe(plumber())
		.pipe(fileInclude({prefix: '// @@', basepath: '@file'}))
		.pipe(dest(folder + path.build.html));
}
function jsTask() {
	return src(folder + path.src.js)
		.pipe(plumber())
		.pipe(fileInclude({prefix: '// @@', basepath: '@file'}))
		.pipe(dest(folder + path.build.js))
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest(folder + path.build.js));
}
function cssTask() {
	return src(folder + path.src.css)
		.pipe(plumber())
		.pipe(fileInclude({prefix: '// @@', basepath: '@file'}))
		.pipe(sass())
		.pipe(dest(folder + path.build.css))
		.pipe(cssNano())
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest(folder + path.build.css));
}
function watchTask(){
	watch(folder + path.watch.html, series(htmlTask));
	watch(folder + path.watch.js, series(jsTask));
	watch(folder + path.watch.css, series(cssTask));
}
exports.default = series(
	htmlTask,
	jsTask,
	cssTask,
	watchTask
);