var path = require('path');
var nestedRules = require('postcss-nested');

module.exports = {
	entry: './dev/app.js',
	
	output: {
		path: './static',
		filename: 'app.js'
	},

	module: {
		loaders: [
			{
                test:   /\.css$/,
                loader: 'style-loader!css-loader?modules!postcss-loader'
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

	postcss: [nestedRules, require('postcss-import')],

	resolve: {
		root: [
			path.resolve(__dirname, './')
		]
	}
};