import gulp from 'gulp';
import fileinclude from 'gulp-file-include';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import pump from 'pump';
import plumber from "gulp-plumber";
import cssnano from 'gulp-cssnano';
import rename from "gulp-rename";
import uglify from 'gulp-uglify';

const sass = gulpSass(dartSass);

var folder = "./";


let path = {
	build: {
		html: 'html/build/',
		js: 'html/build/js/',
		css: 'html/build/css/'
	},
	src: {
		html: 'html/src/*.html',
		js: 'html/src/js/*.js',
		css: 'html/src/css/*.scss'
	},
	watch: {
		html: 'html/src/**/*.html',
		js: 'html/src/**/*.js',
		css: 'html/src/**/*.scss'
	}
};
function uHTML(cb) {
	pump([
		gulp.src(folder + path.src.html),
		plumber(),
		fileinclude({prefix: '// @@', basepath: '@file'}),
		gulp.dest(folder + path.build.html)
	], cb);
}
function uJavaScript(cb) {
	pump([
		gulp.src(folder + path.src.js),
		plumber(),
		fileinclude({prefix: '// @@', basepath: '@file'}),
		gulp.dest(folder + path.build.js),
		uglify(),
		rename({ suffix: ".min" }),
		gulp.dest(folder + path.build.js)
	], cb);
}
function uCSS(cb) {
	pump([
		gulp.src(folder + path.src.css),
		plumber(),
		fileinclude({prefix: '// @@', basepath: '@file'}),
		sass(),
		gulp.dest(folder + path.build.css),
		cssnano(),
		rename({ suffix: ".min" }),
		gulp.dest(folder + path.build.css)
	], cb);
}
function uWatchFiles(cb){
	gulp.watch(folder + path.watch.html, uHTML);
	gulp.watch(folder + path.watch.js, uJavaScript);
	gulp.watch(folder + path.watch.css, uCSS);
	cb();
}

gulp.task("html",uHTML);
gulp.task("js",uJavaScript);
gulp.task("css",uCSS);
gulp.task("build", gulp.parallel("css","js","html"));
gulp.task("watch", uWatchFiles);
gulp.task("default", uWatchFiles);
