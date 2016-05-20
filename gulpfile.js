//使用方法:命令行,执行 gulp，就可以完成sass文件监听并编译
var gulp = require('gulp'),
    fs   = require('fs'),
    sass = require('gulp-sass');

//1.编译sass
gulp.task('sass',function(){
    console.log("sass work");
    //**可以匹配所有目录下的所有文件
    gulp.src('__/*.scss')
        .pipe(sass({
            includePaths:['Users/zi/DeskTop/app']
        }))//坑，gulp－sass必须在参数里指明，@import的路径 .已修复，includePaths参数可以添加impotr路径
        .pipe(gulp.dest('/'));

});


gulp.task('watch', function(event) {
    gulp.watch('*.scss', ['sass']); 
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('default',['watch'],function(){
    console.log("执行 default");//
});