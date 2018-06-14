var gulp = require('gulp'),
	changed = require('gulp-changed'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	htmlmin = require('gulp-htmlmin'),
	runSequence = require('run-sequence'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	sourcemaps = require('gulp-sourcemaps'),
	log = require('gulplog');

gulp.task('optimize-css-js', function () {
	var cssPlugins = [
		autoprefixer({
			browsers: ['last 10 version'],
		}),
		cssnano(),
	];
	return gulp
		.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.css', postcss(cssPlugins)))
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('dist'));
});

gulp.task('optimize-dist-html', function () {
	return gulp
		.src('dist/*.html')
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(gulp.dest('dist'));
});

gulp.task('copy-other-files', function () {
	const destination = 'dist/vendor';
	return gulp
		.src(['app/vendor/**'])
		.pipe(changed(destination))
		.pipe(gulp.dest(destination));
});

gulp.task('browserify-it', function () {
	// set up the browserify instance on a task basis
	var b = browserify({
		entries: './entry.js',
		debug: true
	});

	return b.bundle()
		.pipe(source('mfa_funraise_widget.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		// Add transformation tasks to the pipeline here.
		.pipe(uglify())
		.on('error', log.error)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('build', function (callback) {
	runSequence(
		'browserify-it',
		'optimize-css-js',
		'optimize-dist-html',
		'copy-other-files',
		callback
	);
});