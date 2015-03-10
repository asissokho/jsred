module.exports = function (grunt){

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},

	});

    function getCombinedSources(){
        var lines= grunt.file.read('./fragments/sources.list').split('\n');
        return lines.map(function(fileName){ 
           if((fileName.indexOf('#')>-1) ||  fileName==''){
               return ''; 
           }; 
           var content = grunt.file.read(fileName);
           return content;
      });
    };

    function buildDebug(){
        var sources = getCombinedSources();
        grunt.file.write('./output/jsred.js', sources.join('').replace(/\r\n/g,'\n'));
    };

    grunt.registerTask('build', 'Build the library in debug mode', buildDebug);
	grunt.loadNpmTasks('grunt-karma');
	grunt.registerTask('default', ['karma']);
};

