import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import testStyles from 'dev/styles/test.css';
import gameStyles from 'dev/styles/test/game.css';

export default class extends BaseView {

	get className() { return gameStyles.root; }

	get _template() { return require('dev/templates/test/game.handlebars') }

	init() {
		this.registerChild(new this.StepView({
			testModel: this.testModel,
			currentStepIndex: this.currentStepIndex,
			stepsAmount: this.stepsAmount
		}), 'test-step');
		this.render();
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			testStyles: testStyles,
			gameStyles: gameStyles,
			currentStepIndex: this.currentStepIndex + 1,
			stepsAmount: this.stepsAmount
		});
	}
}