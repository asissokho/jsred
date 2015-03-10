module.exports = function (config){
	
    config.set({

	// base path that will be used to resolve files and exclude
	basePath : '../src/',
	
	//frameworks to use
	frameworks: ['jasmine'],

	// list of files and patterns to load in the browser
	files : [ '**/*.js','../spec/*.js'],

	//list of files to exclude
	exclude: [],

	// test results reporter use
	reporters : ['progress'],

	// web port server
	port : 1338,

	// enable colors in the output   and log)
	colors: true,
	
	logLevel : config.LOG_INFO,

	autoWath : true,

	browsers: ['PhantomJS'],

	captureTimeout : 60000,

	singleRun : false

	
    });
 
}
