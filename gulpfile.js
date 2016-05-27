var gulp = require('gulp'),
    sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch("*.html").on('change', reload);
});

gulp.task('sass', function() {
    return gulp.src("sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);