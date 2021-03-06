import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import testStyles from 'dev/styles/test.css';
import startStyles from 'dev/styles/test/start.css';
import inputsStyles from 'dev/styles/inputs.css';
import typography from 'dev/styles/typography.css';

export default class extends BaseView {

	get _template() { return require('dev/templates/test/start.handlebars') }

	get className() { return startStyles.root; }

	init() {
		this.render();
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			testStyles: testStyles,
			startStyles: startStyles,
			inputsStyles: inputsStyles,
			typography: typography
		});
	}
}