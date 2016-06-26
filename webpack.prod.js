var _ = require('underscore');
var webpack = require('webpack');

var commonConfig = require('./webpack.common');

let config = _.extend({
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
}, _.clone(commonConfig));

config.resolve = _.extend({
	alias: {
		config: 'dev/config_prod.js'
	}
}, commonConfig.resolve);

module.exports = config;