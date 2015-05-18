module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            portal_splash: {
                port: 9000,
                base: 'app'
            }
        }
    });

    grunt.loadNpmTasks('grunt-connect');
    grunt.registerTask('default', 'connect:portal_splash');

};