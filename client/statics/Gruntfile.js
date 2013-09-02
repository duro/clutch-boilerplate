// Grunt configuration updated to latest Grunt.  That means your minimum
// version necessary to run these tasks is Grunt 0.4.
module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Empty and remove build directory.
    // NOTE: This is a forced clean.
    clean: {
      options: { force: true },
      build: {
        src: ['<%%= pkg.buildDir %>/assets']
      }
    },

    // Move vendor and app logic during a build.
    copy: {
      release: {
        files: [
          { expand: true, src: ['assets/**'], dest: '<%= pkg.buildDir %>' }
        ]
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: '<%%= pkg.buildDir %>/assets/stylesheets',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'scss',
          cssDir: '<%%= pkg.buildDir %>/assets/stylesheets',
        }
      }
    }
  });

  // Grunt contribution tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // The default command
  grunt.registerTask('default', ['clean', 'build']);

  // The build command.
  grunt.registerTask('build', ['copy', 'compass:dist']);

};
