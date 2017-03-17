var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

var paths = {
  scripts: 'components/**/*.js',
  images: 'server/static/images/**/*'
};

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
	//.pipe(uglify())
  	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('server/static/js/'));
})

// // Copy all static images
// gulp.task('images', function() {
//   return gulp.src(paths.images)
//     // Pass in options to the task
//     .pipe(imagemin({optimizationLevel: 5}))
//     .pipe(gulp.dest('build/img'));
// });

gulp.task('default', ['scripts']);
