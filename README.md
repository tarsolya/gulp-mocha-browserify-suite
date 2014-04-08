# gulp-mocha-suite

Generates a suite file from `gulp.src` glob on the fly for Browserify and - subsequently - Mocha.

## Install

```shell
npm i --save-dev gulp-mocha-browserify-suite
```

## Usage

```javascript
var generateSuite = require("gulp-mocha-browserify-suite");

gulp.task('test', function() {
  return gulp.src('./test/**/*_spec.js', {read: false})
    .pipe(generateSuite())
    .pipe(browserify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./tmp'))
    .pipe(mocha());
});
```

## API

### mocha-browserify-suite(options)

#### opts.suiteFile
Type: `String`
Default: `suite.js`

Name of your suite file, if you want to save it for some reason.

#### opts.testDir
Type: `String`
Default: `./test`

Relative path of your test dir, where browserify will start to `require` your modules from.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

