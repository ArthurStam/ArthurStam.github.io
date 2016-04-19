import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import TestView from 'dev/views/test';

import styles from 'dev/styles/how.css';

export default class extends BaseView {

	get _template() { return require('dev/templates/how.handlebars'); }

	init() {
		this.registerChild(new TestView(), 'how-test');
		this.render();
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			styles: styles
		});
	}
}