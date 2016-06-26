var _ = require('underscore');

var commonConfig = require('./webpack.common');

let config = _.extend({
	progress: true,
	watch: true,
	keepalive: true,
	failOnError: false,
	devtool: 'source-map',
	debug: true,
	alias: {

	}
}, commonConfig);

config.resolve = _.extend({
	alias: {
		config: 'dev/config_dev.js'
	}
}, commonConfig.resolve);

module.exports = config;