var gulp = require('gulp');
var tslint =  require('gulp-tslint');

gulp.task("tslint", () =>
    gulp.src('src/**/*.ts?(x)')
        .pipe(tslint({
            configuration: "tslint.json",
            formatter: "prose"
        }))
        .pipe(tslint.report({
            emitError: false
        }))
);
