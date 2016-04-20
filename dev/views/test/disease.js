import _ from 'underscore';
import $ from 'jquery';

import StepView from './step';

import { states, reasons } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import gameStyles from 'dev/styles/test/game.css';

const data = [{
	text: 'ОРВИ',
	danger: false
}, {
	text: 'ВИЧ',
	danger: true
}, {
	text: 'Гепатит B и C',
	danger: true
}, {
	text: 'Психическое расстройство',
	danger: true
}, {
	text: 'Мне удаляли орган',
	danger: false
}, {
	text: 'Туберкулез',
	danger: true
}, {
	text: 'К врачу не хожу, чувствую себя хорошо',
	danger: false
}, {
	text: 'Малярия',
	danger: true
}, {
	text: 'Хроническое заболевания сердечно-сосудистой системы',
	danger: false
}, {
	text: 'Злокачественное заболевание',
	danger: true
}, {
	text: 'Хроническое заболевания дыхателных путей',
	danger: true
}];

export default class extends StepView {

	get _template() { return require('dev/templates/test/disease.handlebars') }

	get events() {
		return {
			'click [data-action="test-answer"]': '_answer',
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
	}

	_prepareData() {
		return _.extend({ data: data }, super._prepareData());
	}

	_answer() {
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
	}
}