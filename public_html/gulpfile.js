var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	filesJS = [
			'public/js/Helper.js',
			'public/js/App.js',
			// 'public/js/components/Iframe.js',
			// 'public/js/components/Slider.js',
			// 'public/js/components/Weather.js',
			// 'public/js/components/Currency.js'
			// 'public/js/components/Category.js'
			// 'public/js/components/CategorySingle.js'
			// 'public/js/components/Sticky.js'
			// 'public/js/components/Modal.js'
			// 'public/js/components/Menu.js'
			// 'public/js/*js',
			'public/js/components/*js'
		],
	prefix = require('gulp-autoprefixer'),
	cssMin = require('gulp-cssmin'),
	csscomb = require('gulp-csscomb'),
	stylus = require('gulp-stylus');

// Javascript
gulp.task('js', function () {
	return gulp.src(filesJS)
		.pipe(concat('bundle.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/prodaction'));
});

// STYLUS
gulp.task('styl', function() {
  gulp.src('public/styl/*.styl')
    .pipe(stylus())
    .on('error', console.log)
    .pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
    .pipe(concat('bundle.min.css'))
    .pipe(csscomb())
    .pipe(cssMin())
		.pipe(gulp.dest('public/prodaction'));
});

gulp.task('watch', function () {
	gulp.watch(filesJS, ['js']);
	gulp.watch('public/styl/*.styl', ['styl']);
});

gulp.task('default', ['watch','js','styl']);
