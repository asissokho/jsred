module.exports = function (grunt){

	grunt.initConfig({
		pkg : grunt.file.readJSON(),

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-karma')
	grunt.registerTask('defaut', ['karma']);
}