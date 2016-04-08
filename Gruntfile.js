module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		webpack: {
			dev: require('./webpack.dev'),
			prod: require('./webpack.prod')
		}
	});

	grunt.registerTask('dev', ['webpack:dev']);
	grunt.registerTask('prod', ['webpack:prod']);
};