module.exports = function (grunt) {
    grunt.initConfig({
        bowercopy: {
            options: {
                runBower: true,
                destPrefix: 'www/libs'
            },
            libs: {
                files: {
                    'ionic': 'ionic/release',
                    'ionicons' : 'ionicons',
                    'font-awesome': 'font-awesome',
                    'ngstorage':'ngstorage'
                }
            }
        }
    });
    grunt.registerTask("default", ["bowercopy:libs"]);
    grunt.loadNpmTasks('grunt-bowercopy');
};