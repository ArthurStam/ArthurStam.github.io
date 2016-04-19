import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import testStyles from 'dev/styles/test.css';

export default class extends BaseView {

	get className() { return gameStyles.root; }

	get _template() { return require('dev/templates/test/weight.handlebars') }

	init() {
		this.render();
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			testStyles: testStyles
		});
	}
}