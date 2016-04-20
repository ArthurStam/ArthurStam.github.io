import _ from 'underscore';
import $ from 'jquery';

import StepView from './step';

import { states, reasons } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import gameStyles from 'dev/styles/test/game.css';

export default class extends StepView {

	get _template() { return require('dev/templates/test/weight.handlebars') }

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
				this._goNext();
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