import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import { states, isLastStep } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import gameStyles from 'dev/styles/test/game.css';

export default class extends BaseView {

	get className() { return testStyles.step; }

	init() {
		this.render();
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			testStyles: testStyles,
			gameStyles: gameStyles
		});
	}

	_goNext() {
		if (isLastStep(this.currentStepIndex, this.stepsAmount)) {				
			this.testModel.set({ 
				state: states.FINISH,
				result: true
			});
		} else {
			this.testModel.set({ 
				step: this.currentStepIndex + 1
			});
		}
	}
}