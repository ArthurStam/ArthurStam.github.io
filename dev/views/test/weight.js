import _ from 'underscore';
import $ from 'jquery';

import BaseView from 'crimson-backbone/src/views/base';

import { states, reasons, isLastStep } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import gameStyles from 'dev/styles/test/game.css';

export default class extends BaseView {

	get className() { return testStyles.step; }

	get _template() { return require('dev/templates/test/weight.handlebars') }

	init() {
		this.render();
	}

	get events() {
		return {
			'click [data-action="test-answer"]': '_answer',
			'input [data-action="test-input"]': '_inputWeight'
		};
	}

	_inputWeight(e) {
		this.weight = $(e.currentTarget).val() || undefined;
	}

	_appended() {
		this.$el.find('[data-action="test-input"]').focus();
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			testStyles: testStyles,
			gameStyles: gameStyles
		});
	}

	_answer() {
		if (isFinite(this.weight)) {
			if (this.weight < 50) {
				this.testModel.set({
					state: states.FINISH,
					result: false,
					reason: reasons.WEIGHT,
					data: {
						weight: this.weight
					}
				})
			} else {
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
		} else {
			this.$el
				.find('[data-action="test-input"]')
				.focus()
				.val('')
				.trigger('input')
				.addClass(gameStyles.inputInvalid)
			setTimeout(() => {
				this.$el
					.find('[data-action="test-input"]')
					.removeClass(gameStyles.inputInvalid);
			}, 1000);
		}
	}
}