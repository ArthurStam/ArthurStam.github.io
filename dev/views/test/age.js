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
			'submit [data-action="test-form"]': '_answer',
			'input [data-action="test-input"]': '_inputAge'
		};
	}

	_inputAge(e) {
		let value = $(e.currentTarget).val(); 
		this.age = value || undefined;
		value ? this._enable() : this._disable();
	}

	_appended() {
		super._appended();
		this.$el.find('[data-action="test-input"]').focus();
	}

	_answer(e) {
		if (isFinite(this.age) && this.age >= 0) {
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
		e.preventDefault();
	}
}