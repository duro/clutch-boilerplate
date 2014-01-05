/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    /* --------------------------------------- */
    /* --( Variables )-- */
    /* --------------------------------------- */

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    /* --------------------------------------- */
    /* --( JSHint )-- */
    /* --------------------------------------- */

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

    /* --------------------------------------- */
    /* --( Grunt HUB Config )-- */
    /* --------------------------------------- */

    hub: {
      build: {
        src: ['client/*/Gruntfile.js'],
        tasks: ['build'],
      },
      watch: {
        src: ['client/*/Gruntfile.js'],
        tasks: ['watch'],
      }
    },

    /* --------------------------------------- */
    /* --( Node Monitor Server )-- */
    /* --------------------------------------- */

    nodemon: {
      dev: {
        options: {
          file: 'server/index.js',
          nodeArgs: ['--debug'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['server'],
          delayTime: 1,
          cwd: __dirname
        }
      }
    },

    /* --------------------------------------- */
    /* --( Concurrent Task config )-- */
    /* --------------------------------------- */

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'node-inspector', 'hub:watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    /* --------------------------------------- */
    /* --( Node-Inspector config )-- */
    /* --------------------------------------- */

    'node-inspector': {
      dev: {
        options: {
          'web-port': 8888
        }
      }
    }

  });

  /* --------------------------------------- */
  /* --( Grunt Config )-- */
  /* --------------------------------------- */

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-hub');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-node-inspector');

  // Default task.
  grunt.registerTask('default', ['jshint']);

  // Static build task
  grunt.registerTask('build', ['hub:build']);

  // Dev Server
  grunt.registerTask('server', ['server:dev']);
  grunt.registerTask('server:dev', ['concurrent:dev']);

};
