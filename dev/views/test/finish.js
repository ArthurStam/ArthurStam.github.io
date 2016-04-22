import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import ShareView from 'dev/views/share';
import { states, isLastStep, reasons } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import finishStyles from 'dev/styles/test/finish.css';

class FinishShareView extends ShareView {
	get _template() { return require('dev/templates/test/share.handlebars'); }

	_prepareData() {
		return _.extend(super._prepareData(), { testStyles: testStyles });
	}
}

export default class extends BaseView {

	get _template() { return require('dev/templates/test/finish.handlebars'); }

	get className() { return finishStyles.root }

	init() {

		if (this.testModel.success) {
			this.registerChild(new FinishShareView({
				title: 'Я подхожу!',
				description: 'Могу ли я быть донором костного мозга? Тест для тех, кто еще не знает. И сайт о том, зачем вообще сдавать костный мозг и где.'
			}), 'test-share');
		} else {
			this.registerChild(new FinishShareView({
				title: 'Хочу, но не могу.',
				description: 'Могу ли я быть донором костного мозга? Тест для тех, кто еще не знает. И сайт о том, зачем вообще сдавать костный мозг и где.'
			}), 'test-share');
		}
		this.render();
	}

	_prepareData(data = {}) {

		return _.extend(data, {
			testStyles: testStyles,
			finishStyles: finishStyles,
			testModel: this.testModel
		});
	}
}