import _ from 'underscore';
import $ from 'jquery';

import StepView from './step';

import { states, reasons } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import gameStyles from 'dev/styles/test/game.css';

const data = [{
	text: 'Нет диагнозов, чувствую себя хорошо',
	danger: false
}, {
	text: 'Мне удаляли орган',
	danger: true
}, {
	text: 'Малярия',
	danger: true
}, {
	text: 'Туберкулез',
	danger: true
}, {
	text: 'Психическое расстройство',
	danger: true
}, {
	text: 'Злокачественное заболевание',
	danger: true
}, {
	text: 'Органическое заболевание центральной нервной системы',
	danger: false
}, {
	text: 'Высокая миопия: 6Д и больше',
	danger: true
}, {
	text: 'Сердечно-сосудистое заболевание',
	danger: true
}, {
	text: 'Хроническое ЛОР-заболевание',
	danger: true
}];

export default class extends StepView {

	get _template() { return require('dev/templates/test/disease.handlebars') }

	get events() {
		return {
			'submit [data-action="test-form"]': '_answer',
			'change [data-action="test-input"]': '_changeDisease'
		};
	}

	init() {
		super.init();
		this.selected = {};
	}

	_changeDisease(e) {
		let id = $(e.currentTarget).data('id');
		if (e.currentTarget.checked) {
			this.selected[`item-${id}`] = data[id];
		} else {
			delete this.selected[`item-${id}`]
		}
		Object.keys(this.selected).length ? this._enable() : this._disable();
	}

	_prepareData() {
		return _.extend({ data: data }, super._prepareData());
	}

	_answer(e) {
		let result = true;
		for (let item in this.selected) {
			if (this.selected[item].danger) {
				result = false;
				break;
			}
		}
		if (!result) {
			this.testModel.set({
				state: states.FINISH,
				result: false,
				reason: reasons.DISEASE,
				data: {
					disease: this.selected
				}
			})
		} else {
			this._goNext();
		}
		e.preventDefault();
	}
}