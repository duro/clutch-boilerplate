/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // JSHint Config
    jshint: {
      options: {
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      server: {
        options: {
          laxcomma: true,
          laxbreak: true,
          node: true
        },
        src: ['server/**/*.js']
      }
    },

    // Setting up mocha tests
    mochaTest: {
      server: {
        options: {
          timeout: 10000,
          reporter: 'spec'
        },
        src: ['server/test/**/*.js']
      }
    },

    clean: ["public/statics"],

    hub: {
      buildStaticApps: {
        src: ['client/apps/*/Gruntfile.js'],
        tasks: ['build'],
      },
      watchStaticApps: {
        src: ['client/apps/*/Gruntfile.js'],
        tasks: ['watch'],
      },
      buildGlobalStatics: {
        src: ['client/statics/Gruntfile.js']
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'server/index.js',
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['server'],
          delayTime: 1,
          cwd: __dirname
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'hub:watchStaticApps'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-hub');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint']);

  // Static build task
  grunt.registerTask('build_statics', [
    'clean', 'hub:buildGlobalStatics', 'hub:buildStaticApps'
  ]);

  // Dev task
  grunt.registerTask('dev', ['concurrent:dev']);

};
