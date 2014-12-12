module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    banner:
      """
        /*
        <%= pkg.title %>, v<%= pkg.version %>
        by <%= pkg.author %>
        <%= pkg.homepage %>
        */

      """

    coffeelint:
      src: 'src/coffee/*.coffee'
      test: 'test/src/*.coffee'

    jasmine:
      default:
        src: ['build/event-bridge.js']
        options:
          keepRunner: false
          specs: 'test/spec/*.spec.js'
          helpers: 'bower_components/jasmine-helpers/helpers/*.js'

    coffee:
      src:
        options:
          bare: true
        files:
          'build/event-bridge.js' : 'src/coffee/*.coffee'
      test:
        files:
          'test/spec/event-bridge.spec.js' : 'test/src/*.coffee'

    uglify:
      default:
        options:
          banner: "<%= banner %>"
        files:
          'build/event-bridge.min.js' : 'build/event-bridge.js'

    watch:
      options:
        atBegin: true
      src:
        files: ['src/coffee/*.coffee']
        tasks: ['coffeelint:src', 'coffee:src', 'jasmine']
      test:
        files: ['test/src/*.coffee']
        tasks: ['coffeelint:test', 'coffee:test', 'jasmine']

    bump:
      options:
        files: [
          'package.json'
          'bower.json'
        ]
        updateConfigs: ['pkg']
        commitFiles: ['-a']
        pushTo: 'origin'


  # Constructs the code, runs tests and if everyting is OK, creates a minified
  # version ready for production. This task is intended to be run manually.
  grunt.registerTask 'build', 'Bumps version and builds JS.', (version_type) ->
    version_type = 'patch' unless version_type in ['patch', 'minor', 'major']
    grunt.task.run [
      "bump-only:#{version_type}"
      'coffeelint'
      'coffee'
      'jasmine'
      'uglify'
      'bump-commit'
    ]

  grunt.registerTask 'default', [
    'watch'
  ]
