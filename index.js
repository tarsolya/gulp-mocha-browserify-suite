require('buffer');
var through = require('through');
var util = require('gulp-util');
var path = require('path');
var File = util.File;
var PluginError = util.PluginError;

var mochaSuite = function(suiteFile, opts) {
  var pre = new Buffer('require(\'./');
  var post = new Buffer('\');');
  var newLine = new Buffer(util.linefeed);
  var buffer = [];

  if(!opts) {
    opts = {};
  }

  if(!opts.testDir) {
    opts.testDir = './test';
  }

  if(!suiteFile) {
    suiteFile = 'suite.js';
  }

  function contents(file) {
    buffer.push(
      pre,
      new Buffer(path.relative(opts.testDir, file.path)),
      post,
      newLine
    );
  }

  function end() {
    var self = this;
    var suite;
    if(buffer.length === 0) {
      throw new PluginError('gulp-mocha-suite', 'No specs in suite.');
    }
    suite = new File({
      cwd: '.',
      base: opts.testDir,
      path: path.join('.', opts.testDir, suiteFile),
      contents: Buffer.concat(buffer)
    });
    self.emit('data', suite);
    self.emit('end');
  }

  return through(contents, end);
};

module.exports = mochaSuite;

