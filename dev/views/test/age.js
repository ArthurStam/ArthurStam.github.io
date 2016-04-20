import _ from 'underscore';
import $ from 'jquery';

import StepView from './step';

import { states, reasons } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import gameStyles from 'dev/styles/test/game.css';

export default class extends StepView {

	get _template() { return require('dev/templates/test/age.handlebars') }

	get events() {
		return {
			'click [data-action="test-answer"]': '_answer',
			'input [data-action="test-input"]': '_inputAge'
		};
	}

	_inputAge(e) {
		this.age = $(e.currentTarget).val() || undefined;
	}

	_appended() {
		this.$el.find('[data-action="test-input"]').focus();
	}

	_answer() {
		if (isFinite(this.age)) {
			if (this.age > 45 || this.age < 18) {
				this.testModel.set({
					state: states.FINISH,
					result: false,
					reason: reasons.AGE,
					data: {
						age: this.age
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