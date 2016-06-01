import _ from 'underscore';

import StepView from './step';

import { states, reasons } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import gameStyles from 'dev/styles/test/game.css';

export default class extends StepView {

	get _template() { return require('dev/templates/test/auto.handlebars') }

	get events() {
		return {
			'submit [data-action="test-form"]': '_answer',
			'change [data-action="test-input"]': '_changeAuto',
			'mouseenter [data-action="show-full-list"]': (e) => {
				this.$el.find('[data-role="full-list"]').show();
			},
			'mouseleave [data-action="show-full-list"]': (e) => {
				this.$el.find('[data-role="full-list"]').hide();
			}
		};
	}

	_changeAuto(e) {
		this.auto = e.currentTarget.value === 'false' ? false : true;
		this._enable();
	}

	_answer(e) {
		if (_.isBoolean(this.auto)) {
			if (this.auto === true) {
				this.testModel.set({
					state: states.FINISH,
					result: false,
					reason: reasons.AUTO
				})
			} else {
			 	this._goNext();
			}
		}
		e.preventDefault();
	}
}