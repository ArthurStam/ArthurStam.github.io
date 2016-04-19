import Backbone from 'backbone';
import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import StartView from 'dev/views/test/start';
import GameView from 'dev/views/test/game';
import AgeView from 'dev/views/test/age.js';
import WeightView from 'dev/views/test/weight.js';
import AutoView from 'dev/views/test/auto.js';

import styles from 'dev/styles/test.css';

const states = { START: 'START', GAME: 'GAME', FINISH: 'FINISH' };

const steps = [{
	View: AgeView
}, {
	View: WeightView
}, {
	View: AutoView
}];

class TestModel extends Backbone.Model {

	get defaults() {
		return {
			state: states.START,
			step: 0
		}
	}
}

export default class extends BaseView {

	get className() { return styles.root; }

	get _template() { return require('dev/templates/test.handlebars') }

	get events() {
		return {
			'click [data-action="test-start"]': '_start'
		}
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			styles: styles
		});
	}

	init() {
		this.testModel = new TestModel();
		this.listenTo(this.testModel, 'change:state', this._changeState);
		this._changeState();
	}

	_changeState() {
		this.removeChildren('test-container');
		switch (this.testModel.get('state')) {
			case states.START:
				this.registerChild(new StartView(), 'test-container');
				break;
			case states.GAME:
				this.registerChild(new GameView({
					stepsAmount: steps.length,
					currentStepIndex: this.testModel.get('step') + 1,
					StepView: steps[this.testModel.get('step')].View
				}), 'test-container');
				break;
		}
		this.appendChildren('test-container');
		this.render();
	}

	_start() {
		this.testModel.set({
			state: states.GAME
		})
	}
}