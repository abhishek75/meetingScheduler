var gulp = require('gulp');
var replace = require('gulp-string-replace');
var del = require('del');
var rename = require("gulp-rename");
var exec = require('child_process').exec;

function changeImportPaths(){
  // Replace index.html paths
  return gulp.src(["./dist/demo/index.html"])
  .pipe(replace(/styles\./, '/static/assets/styles.'))
  .pipe(replace(/runtime\./, '/static/assets/runtime.'))
  .pipe(replace(/polyfills\./, '/static/assets/polyfills.'))
  .pipe(replace(/scripts\./, '/static/assets/scripts.'))
  .pipe(replace(/main\./, '/static/assets/main.'))
  .pipe(gulp.dest('./dist/demo/'))
}

function deleteBuildFolder() {
  return del(['./dist/']);
}

function moveFilesToStatic(done) {
  gulp.src(['./dist/demo/*.js'])
  .pipe(gulp.dest('./dist/demo/static/assets/'));
  return gulp.src(['./dist/demo/*.css'])
  .pipe(gulp.dest('./dist/demo/static/assets/'))

}

function runNgBuild(done) {
  exec('ng build --prod', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
}

function cleanDeploy(done) {
 return del(['../core/static/', '../core/templates/app.html'], {force: true});
}

function moveFilesToDeploy(done) {
  gulp.src(['./dist/demo/index.html'])
  .pipe(rename('app.html'))
  .pipe(gulp.dest('../core/templates/'));
  return gulp.src(['./dist/demo/static/**/**'])
   .pipe(gulp.dest('../core/static/'))
}

gulp.task('build:clean', deleteBuildFolder);
gulp.task('build:run', runNgBuild);
gulp.task('fix:imports', changeImportPaths);
gulp.task('fix:movetostatic', moveFilesToStatic);
gulp.task('deploy:clean', cleanDeploy);
gulp.task('deploy:copy', moveFilesToDeploy);
gulp.task('build', gulp.series('build:clean', 'build:run'));
gulp.task('deploy:prepare', gulp.series('fix:movetostatic'));
gulp.task('deploy', gulp.series('deploy:prepare','deploy:clean', 'deploy:copy'));
gulp.task('make', gulp.series('build', 'deploy', 'deploy:copy'));
