"use strict";

// load plugins
const {parallel}   = require('gulp');
const gulp         = require("gulp");
const less         = require("gulp-less");
const minifyCSS    = require('gulp-minify-css');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');
const terser       = require('gulp-terser');
const order        = require('gulp-order');
const autoprefixer = require('gulp-autoprefixer');


// static tasks
function staticStyles(){
	return gulp.src('style/*.css')
			   .pipe(minifyCSS())
			   .pipe(concat('main.css'))
			   .pipe(gulp.dest('dist/css'));
}

function staticScripts(){
	return gulp.src(['js/*.js', '!js/scripts.js'])
			   .pipe(terser())
			   .pipe(order([
			   		"jquery*",
			   		"popper*",
			   		"bootstrap*"
			   	]))
			   .pipe(concat('main.js'))
			   .pipe(gulp.dest('dist/js'));
}

// dynamic tasks
function dynamicStyles(){
	return gulp.src('style/styles.less')
			    .pipe(less())
				.pipe(autoprefixer({
					browsers: ['last 2 versions']
				}))
			   .pipe(minifyCSS())
			   .pipe(gulp.dest('dist/css'));
}

function dynamicScripts(){
	return gulp.src('js/scripts.js')
			   .pipe(uglify())
			   .pipe(gulp.dest('dist/js'));
}

// watch files
function dynamicFiles(){
	gulp.watch("style/styles.less", dynamicStyles);
	gulp.watch("js/scripts.js", dynamicScripts);
}

// export 
exports.static  = parallel(staticStyles, staticScripts);
exports.dynamic = dynamicFiles;

