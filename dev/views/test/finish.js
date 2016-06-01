import _ from 'underscore';
import Backbone from 'backbone';

import BaseView from 'crimson-backbone/src/views/base';

import ShareView from 'dev/views/share';
import { states, isLastStep, reasons } from 'dev/views/test';

import testStyles from 'dev/styles/test.css';
import finishStyles from 'dev/styles/test/finish.css';
import shareStyles from 'dev/styles/share.css';
import inputStyles from 'dev/styles/inputs.css';
import typography from 'dev/styles/typography.css';

class FinishShareView extends ShareView {

	get _template() { return require('dev/templates/test/share.handlebars'); }

	_prepareData() {
		return _.extend(super._prepareData(), { testStyles: testStyles, share: shareStyles });
	}
}

class ShareModel extends Backbone.Model {

	get defaults() {
		return {
			title: '',
			description: ''
		}
	}
}

export default class extends BaseView {

	get _template() { return require('dev/templates/test/finish.handlebars'); }

	get className() { return finishStyles.root }

	get events() {
		return {
			'change [data-action="test-finish-agreement"]': '_agreementChange'
		};
	}

	init() {
		this.shareModel = new ShareModel();
		this.shareView = this.registerChild(new FinishShareView({
			shareModel: this.shareModel
		}), 'test-share');

		if (this.testModel.success) {
			this.shareModel.set('title', 'Я подхожу!')
			this.shareModel.set('description', 'Могу ли я быть донором костного мозга? Тест для тех, кто еще не знает. И сайт о том, зачем вообще сдавать костный мозг и где.');
			this.shareModel.set('image', 'arthurstam.github.io/static/share_test_positive.png')
		} else {
			this.shareModel.set('title', 'Могу ли я стать донором костного мозга?');
			this.shareModel.set('description', 'Пройдите тест и узнайте, можете ли вы стать донором костного мозга. Или просто почитайте, зачем это нужно.');
			this.shareModel.set('image', 'arthurstam.github.io/static/share_test_negative.png')
		}

		this.shareView.render();
		this.render();
	}

	_agreementChange(e) {
		switch (e.currentTarget.checked) {
			case false:
					this.shareModel.set('description', 'Пройдите тест и узнайте, можете ли вы стать донором костного мозга. Или просто почитайте, зачем это нужно.');
				break;
			case true:
					if (this.testModel.age17) { this.shareModel.set('description', 'Мой результат: Пока вы не можете стать донором костного мозга, потому что слишком молоды — в доноры берут с 18 лет. Ждем вас через год!'); }
					if (this.testModel.age16) { this.shareModel.set('description', 'Мой результат: Пока вы не можете стать донором костного мозга, потому что слишком молоды — в доноры берут с 18 лет. Ждем вас через 2 года!'); }
					if (this.testModel.age15_10) { this.shareModel.set('description', 'Мой результат: Пока вы не можете стать донором костного мозга, потому что слишком молоды — в доноры берут только совершеннолетних. Ждем вас после 18!'); }
					if (this.testModel.age45more) { this.shareModel.set('description', 'Мой результат: Вы не можете стать донором костного мозга, потому что вступить в регистр можно до 45 лет. Донором можно стать до 60 лет, но типирование — дорогая процедура, поэтому важно, чтобы потенциальные доноры числились в регистре как можно дольше.'); }
					if (this.testModel.age10less) { this.shareModel.set('description', 'Мой результат: Пока вы не можете стать донором костного мозга, потому что слишком молоды — в доноры берут только совершеннолетних. Ждем вас после 18!'); }
					if (this.testModel.weight47less) { this.shareModel.set('description', 'Мой результат: Вы не можете стать донором костного мозга, потому что в доноры берут людей весом от 50 килограмм. '); }
					if (this.testModel.weight48_49) { this.shareModel.set('description', 'Мой результат: Сейчас вы не можете стать донором костного мозга, потому что в доноры берут людей весом от 50 килограммов. Но вы очень близки! Пройдите тест ещё раз, указав, что весите 50 килограмм, и посмотрите, нет ли у вас других противопоказаний. Если нет — ждём вас через пару килограммов!'); }
					if (this.testModel.autoFail) { this.shareModel.set('description', 'Мой результат: Вы не можете стать донором костного мозга, потому что аутоиммунные заболевания — абсолютное противопоказание.'); }
					if (this.testModel.diseaseFail) { this.shareModel.set('description', 'Мой результат: Вы не можете стать донором костного мозга, потому что у вас есть противопоказания. У человека, которому нужна пересадка, очень слабый иммунитет. Поэтому даже если вы болели очень давно, врачи решают не рисковать.'); }
				break;
		}
	}

	_prepareData(data = {}) {

		return _.extend(data, {
			testStyles: testStyles,
			finishStyles: finishStyles,
			inputStyles: inputStyles,
			testModel: this.testModel,
			typography: typography
		});
	}
}