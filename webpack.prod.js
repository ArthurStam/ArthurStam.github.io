var _ = require('underscore');
var webpack = require('webpack');

var commonConfig = require('./webpack.common');

module.exports = _.extend({
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			output: {
				comments: false 
			},
			compress: {
				warnings: false
			}
		})
	]
}, commonConfig);