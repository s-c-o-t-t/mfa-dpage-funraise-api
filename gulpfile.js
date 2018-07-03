var gulp = require("gulp");
var changed = require("gulp-changed");
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var htmlmin = require("gulp-htmlmin");
var runSequence = require("run-sequence");
var babel = require("gulp-babel");

var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");

gulp.task("optimize-css", function() {
	var cssPlugins = [
		autoprefixer({
			browsers: ["last 10 version"],
		}),
		cssnano(),
	];
	return gulp
		.src("app/**/*.css")
		.pipe(postcss(cssPlugins))
		.pipe(gulp.dest("dist"));
});

gulp.task("optimize-js", function() {
	return gulp
		.src("app/**/*.js")
		.pipe(
			babel({
				presets: ["minify"],
			})
		)
		.pipe(gulp.dest("dist"));
});

gulp.task("optimize-html", function() {
	return gulp
		.src("app/mwd-donate-widget.html")
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(gulp.dest("dist"));
});

gulp.task("copy-other-files", function() {
	const destination = "dist/vendor";
	return gulp
		.src(["app/vendor/**"])
		.pipe(changed(destination))
		.pipe(gulp.dest(destination));
});

// gulp.task("babel-for-es5", function () {
// 	return gulp.src("app/mwd-donate-widget.js")
// 		.pipe(rename('es5-mwd-donate-widget.js'))
// 		.pipe(babel({
// 			presets: ["es2015"],
// 			plugins: ["transform-regenerator"]
// 		}))
// 		.pipe(gulp.dest("app"));
// });

gulp.task("browserify-for-es5", function() {
	// app.js is your main JS file with all your module inclusions
	return browserify({
		entries: "app/js/mwd-donate-widget.js",
		debug: true,
	})
		.transform("babelify", {
			presets: ["env"],
			plugins: ["transform-regenerator"],
		})
		.bundle()
		.pipe(source("mwd-donate-widget.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write("./"))
		.pipe(rename("es5-mwd-donate-widget.js"))
		.pipe(gulp.dest("app/js"));
});

gulp.task("add-babel-regenerator", function() {
	return gulp
		.src([
			"node_modules/babel-polyfill/dist/polyfill.js",
			"app/js/es5-mwd-donate-widget.js",
		])
		.pipe(concat("es5-mwd-donate-widget.js"))
		.pipe(gulp.dest("app/js"));
});

gulp.task("build", function(callback) {
	runSequence(
		"browserify-for-es5",
		"add-babel-regenerator",
		"optimize-js",
		"optimize-css",
		"optimize-html",
		callback
	);
});
