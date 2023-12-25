const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function builkStyles() {
    return src('./public/scss/**/*.scss')
        .pipe(sass())
        .pipe(dest('./public/css')) // output
}

function watchTask() {
    watch(['./public/scss/**/*.scss'], builkStyles);
}

exports.default = series(builkStyles, watchTask);