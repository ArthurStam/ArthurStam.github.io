var path = require('path');

module.exports = {
	entry: './dev/app.js',
	
	output: {
		path: './static',
		filename: 'app.js'
	},

	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}, {
				test: /\.handlebars/,
				loader: 'handlebars-loader',
			}, {
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules\/jquery/,
				query: {
					presets: ['es2015']
				}
			}
		]
	},

	sassLoader: {
		includePaths: [path.resolve(__dirname, './node_modules')]
	},

	resolve: {
		root: [
			path.resolve(__dirname, './')
		]
	}
};