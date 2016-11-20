const gulp = require('gulp');
const babel = require('gulp-babel');
const polyfiller = require('gulp-polyfiller');

gulp.task('default', function () {
    gulp.src('js/app.js')
        .pipe(polyfiller(['Promise', 'Fetch']))
        .pipe(babel({
            presets: ['es2015-ie']
        }))
        .pipe(gulp.dest('dist'))
});
