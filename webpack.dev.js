var _ = require('underscore');

var commonConfig = require('./webpack.common');

module.exports = _.extend({
	progress: true,
	watch: true,
	keepalive: true,
	failOnError: false,
	devtool: 'source-map',
	debug: true
}, commonConfig);