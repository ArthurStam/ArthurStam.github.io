import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import { states, isLastStep } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import finishStyles from 'dev/styles/test/finish.css';

export default class extends BaseView {

	get _template() { return require('dev/templates/test/finish.handlebars'); }

	get className() { return finishStyles.root }

	init() {
		this.render();
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			testStyles: testStyles,
			finishStyles: finishStyles,
			testModel: this.testModel.attributes
		});
	}
}