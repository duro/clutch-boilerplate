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

    hub: {
      staticApps: {
        src: ['client/apps/*/Gruntfile.js'],
        tasks: ['default'],
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-hub');

  // Default task.
  grunt.registerTask('default', ['jshint']);

};
