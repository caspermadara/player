var gulp = require("gulp"),
	coffee = require("gulp-coffee"),
	connect = require("gulp-connect"),
	concat = require("gulp-concat");

gulp.task("serve", function() {
	connect.server({
		livereload: true
	});
});

gulp.task("reload-page", function() {
	return gulp.src(['./*.html', './js/*.js'])
				.pipe(connect.reload());
});

gulp.task("coffee", function() {
	return gulp.src(['./coffee/**/!(app).coffee','./coffee/init/app.coffee'], { sourcemaps: true })
	  .pipe(coffee({ bare: true }))
	  .pipe(concat("bundle.js"))
	  .pipe(gulp.dest('./js/'));
});

gulp.task("watch", function() {
	gulp.watch("./coffee/**/*.coffee", gulp.series("coffee","reload-page"));
	gulp.watch("./*.html", gulp.series("reload-page")); 
});

gulp.task("default", function() {
	gulp.series("coffee", gulp.parallel("serve", "watch"))();
});
