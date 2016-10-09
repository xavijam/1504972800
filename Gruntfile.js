'use strict';

// Directory reference:
//   css: css
//   sass: _scss
//   javascript: js
//   images: img
//   fonts: fonts

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configurable paths
    app: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      sass: {
        files: ['<%= app.app %>/_assets/scss/**/*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      autoprefixer: {
        files: ['<%= app.app %>/css/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:server']
      },
      jekyll: {
        files: [
          '<%= app.app %>/**/*.{html,yml,md,mkd,markdown}',
          '!<%= app.app %>/_bower_components/**/*'
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '.tmp/css/**/*.css',
          '{.tmp,<%= app.app %>/_assets}/<%= js %>/**/*.js',
          '<%= app.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '.jekyll',
            '<%= app.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%= app.dist %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            '.jekyll',
            'test',
            '<%= app.app %>'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= app.dist %>/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%= app.dist %>/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },
    sass: {
      server: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.app %>/_assets/scss',
          src: '**/*.{scss,sass}',
          dest: '.tmp/<%= app.baseurl %>/css',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          cwd: '<%= app.app %>/_assets/scss',
          src: '**/*.{scss,sass}',
          dest: '<%= app.dist %>/<%= app.baseurl %>/css',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: [ '> 5%', 'ie > 6' ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/css',
          src: '**/*.css',
          dest: '<%= app.dist %>/css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '.tmp/css',
          src: '**/*.css',
          dest: '.tmp/css'
        }]
      }
    },
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%= app.app %>'
      },
      dist: {
        options: {
          dest: '<%= app.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= app.dist %>'
      },
      html: [
        '<%= app.dist %>/**/*.html',
      ]
    },
    usemin: {
      options: {
        assetsDirs: '<%= app.dist %>',
        patterns: {
          js: [
            [/(img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      },
      html: ['<%= app.dist %>/**/*.html'],
      css: ['<%= app.dist %>/css/**/*.css'],
      js: '<%= app.dist %>/js/*.js'
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist %>',
          src: '**/*.html',
          dest: '<%= app.dist %>'
        }]
      }
    },
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist %>',
          src: ['*.{png,jpg,gif}'],
          dest: '<%= app.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.dist %>',
          src: '**/*.svg',
          dest: '<%= app.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= app.app %>',
          src: [
            // Jekyll processes and moves HTML and text files.
            // Usemin moves CSS and javascript inside of Usemin blocks.
            // Copy moves asset files and directories.
            '_assets/img/**/*',
            '_assets/fonts/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore.
            '!**/_*{,/**}',
            // Explicitly add any files your site needs for distribution here.
            //'_bower_components/jquery/jquery.js',
            'favicon.ico'
            //'apple-touch*.png'
          ],
          dest: '<%= app.dist %>'
        }]
      },
      // Copy CSS, fonts and images into .tmp directory for Autoprefixer processing
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= app.app %>/css',
          src: '**/*.css',
          dest: '.tmp/css'
        }, {
          expand: true,
          dot: true,
          cwd: '<%= app.app %>/_assets/fonts',
          src: '**/*',
          dest: '.tmp/fonts'
        }, {
          expand: true,
          dot: true,
          cwd: '<%= app.app %>/_assets/img',
          src: '**/*',
          dest: '.tmp/img'
        }]
      }
    },
    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            '<%= app.dist %>/js/**/*.js',
            '<%= app.dist %>/css/**/*.css',
            '<%= app.dist %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%= app.dist %>/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }]
      }
    },
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:xavijam/1504972800.git',
          branch: 'gh-pages'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= app.app %>/js/**/*.js',
        'test/spec/**/*.js'
      ]
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%= app.app %>/css/**/*.css',
          '<%= app.app %>/_scss/**/*.scss'
        ]
      }
    },
    concurrent: {
      server: [
        'sass:server',
        'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        'sass:dist',
        'copy:dist'
      ]
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  // No real tests yet. Add your own.
  grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'connect:test'
  ]);

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'sass:server',
    'jshint:all',
    'csslint:check'
  ]);

  grunt.registerTask('build', [
    'clean',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'autoprefixer:dist',
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'filerev',
    'usemin',
    'htmlmin'
    ]);

  grunt.registerTask('deploy', [
    'check',
    'test',
    'build',
    'buildcontrol:pages'
    ]);

  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};
