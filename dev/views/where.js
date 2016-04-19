import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import styles from 'dev/styles/placeholders.css';

export default class extends BaseView {

	get _template() { return require('dev/templates/where.handlebars'); }

	init() {
		this.render();
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			styles: styles
		});
	}
}