
var gulp = require('gulp');
var zip = require('gulp-zip');
var del = require('del');
var exec = require('child_process').exec;

/**
 * Build for production
 */
gulp.task('ng:build:prod', function(done) {
  var build = exec('ng build --prod', { maxBuffer: 1024 * 1024 }, function (error) {
    if (error) {
      console.error(error);
      done(error)
    } else {
      done();
    }
  });
  build.stdout.on('data', function (data) {
    process.stdout.write(data.toString());
  });
  build.stderr.on('data', function (data) {
    process.stderr.write(data.toString());
  });
  build.on('exit', function (code) {
    process.stdout.write('ng build exited\n');
  });
});

/**
 * Delete development assets like sass and mock-data.
 * Should be used after the production build and before the zip
 */
gulp.task('deleteDevAssets', ['ng:build:prod'], function (done) {
  del(['dist/assets/mock-data', 'dist/assets/sass', '!dist/assets']).then(function(paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    done();
  }).catch(function (error) {
    console.log(error);
    done(error);
  });
});

/**
 * Delete dist files. We only want them for the zip. Once the zip is complete,
 * the dist files should be deleted so they don't go in source control.
 */
gulp.task('deleteDistFiles', ['zipBuild'], function (done) {
  del(['dist/**/*', '!dist', '!dist/restdocsext-ui.zip']).then(function(paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    done();
  }).catch(function(error) {
    console.log(error);
    done(error);
  });
});

/**
 * Zips distribution (dependent on build)
 */
gulp.task('zipBuild', ['ng:build:prod', 'deleteDevAssets'], function(done) {
  gulp.src(['dist/**/*', '!dist/assets/mock-data/**/*'])
    .pipe(zip('restdocsext-ui.zip'))
    .pipe(gulp.dest('dist')) 
    .on('end', done)
});

/**
 * Zips distribution (standalone)
 */
gulp.task('zipOnly', function () {
  gulp.src(['dist/**/*', '!dist/assets/mock-data/**/*'])
    .pipe(zip('restdocsext-iu.zip'))
    .pipe(gulp.dest('dist')) 
})

/**
 * Build in production then zips
 */
gulp.task('build:dist', ['ng:build:prod', 'deleteDevAssets', 'zipBuild', 'deleteDistFiles']);

/**
 * Copy mock JSON config and mock pages to distribution assets. This should only be use
 * for the demo production (for GitHub pages)
 */
gulp.task('copyMockContent', function () {
  gulp.src('src/assets/mock-data/config/restdocsext.conf.json')
    .pipe(gulp.dest('dist/assets/config'));
  gulp.src('src/assets/mock-data/docs/**/*')
    .pipe(gulp.dest('dist/assets/docs'));
});
