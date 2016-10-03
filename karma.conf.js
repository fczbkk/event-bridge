module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['test/**/*.spec.js'],
    preprocessors: {'test/**/*.spec.js': ['webpack']},
    webpack: webpack_config,
    webpackMiddleware: {noInfo: true},
    reporters: ['coverage', 'jasmine-diff', 'mocha'],
    mochaReporter: {
      output: 'minimal'
    },
    jasmineDiffReporter: {
      pretty: true
    },
    coverageReporter: {
      type: 'html',
      dir: 'temp/coverage'
    },
    browsers: ['PhantomJS'],
    singleRun: true
  });
};

var webpack_config = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  }
};