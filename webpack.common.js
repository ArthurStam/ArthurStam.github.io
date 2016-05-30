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

	postcss: [require('postcss-import'), require('postcss-extend'), require('postcss-nested'), require('postcss-simple-vars')],

	resolve: {
		root: [
			path.resolve(__dirname, './')
		]
	}
};