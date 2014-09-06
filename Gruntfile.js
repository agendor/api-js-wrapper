module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: { //docs: http://www.jshint.com/docs/options/
            src: ['src/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            }
        },
        mocha: {
            test: {
                src: ['test/test.html'],
                options: {
                    run: false
                }
            }
        },
        copy: {
            main: {
                cwd: 'dist/',
                src: '*.js',
                dest: 'examples/js/lib/',
                expand: true
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'mocha', 'uglify', 'copy']);

};