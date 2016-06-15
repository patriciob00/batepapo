var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var LessAutoprefixer = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefixer({browsers: ['last 50 versions']});
var concat = require('gulp-concat');
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var htmlhint = require("gulp-htmlhint");

// create a TASK to compile LESS into CSS using gulp-less
gulp.task('less', function() {
   gulp.src(['css/less/app.less'])
   .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes') ],
      plugins: [autoprefix]
    }))
   .pipe(gulp.dest('css'))
   .pipe(cleanCSS({compatibility: 'ie8'}))
   .pipe(concat('app.css'))
   .pipe(gulp.dest('css'))
   .pipe(reload({ stream: true }));
});

gulp.task('htmlhint', function() {
  gulp.src("index.html")
  .pipe(htmlhint())
  .pipe(reload({ stream: true }));
});

gulp.task('serve', ['less', 'htmlhint'], function() {
  browserSync({
    server: {
      baseDir: ''
    }
  });

  gulp.watch(['templates/**/*.js', 'js/**/*.js']);
  gulp.watch(['**/**/*.html', '**/**/*.js'], ['htmlhint']);
  gulp.watch(['css/less/*.less'], ['less']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['serve']);