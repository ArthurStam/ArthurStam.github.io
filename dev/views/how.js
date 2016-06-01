import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';

import PageView from 'dev/views/page';
import ShareView from 'dev/views/share';

import page from 'dev/styles/page.css';
import typography from 'dev/styles/typography.css';
import inputs from 'dev/styles/inputs.css';
import how from 'dev/styles/how.css';
import share from 'dev/styles/share.css';

let cities = [{
	value: null,
	name: 'Выберите город'
}, {
	value: 'murmansk',
	coords: [68.969563, 33.07454],
	name: 'Мурманск',
	points: [{
		name: 'Мурманская Областная Станция Переливания Крови',
		address: 'ул. Павлова, 6',
		time: 'предварительная запись с 15 до 18.00',
		phone: '8 (8152) 25-02-61 (62 доктора)',
		info: 'Принимают только доноров, на типирование можно сдать со второго раза, процедуру объясняют при записи'
	}, {
		name: 'CMD – Центр молекулярной диагностики',
		address: 'Пр. Кольский, д. 61',
		time: 'до сентября 2016 прием приостановлен, только группы от 20 человек',
		phone: '8 (8152) 20-77-68',
		info: 'до сентября 2016 прием приостановлен, только группы от 20 человек'
	}, {
		name: 'CMD – Центр молекулярной диагностики',
		address: 'Ул. Лобова, д. 4',
		time: 'до сентября 2016 прием приостановлен, только группы от 20 человек',
		phone: '8 (8152) 20-77-68',
		info: 'до сентября 2016 прием приостановлен, только группы от 20 человек'
	}]
}, {
	value: 'spb',
	coords: [59.939095, 30.315868],
	name: 'Санкт-Петербург',
	points: [{
		name: 'Институт детской гематологии и трансплантологии им. Р.М. Горбачевой',
		address: 'Ст.м. Петроградская, ул. Рентгена, 12, 10 эт., каб. 1007',
		time: 'вторник 16:00 - 19:00, четверг 10:00 - 12:00',
		info: 'Записываться заранее не нужно, просто приходите' 
	}, {
		name: 'ПСПбГМУ им. Павлова',
		address: 'Ст.м. Петроградская, ул. Льва Толстого д. 19, корп. 53',
		time: 'понедельник - четверг, с 8.30 до 11.30',
		phone: '+7 (812) 429-24-13',
		info: 'При себе иметь паспорт с пропиской в любом городе РФ' 
	}, {
		name: 'Санкт-Петербургская детская инфекционная больница № 5 им. Н.Ф.Филатова',
		address: 'Ст. м. Купчино, ул. Бухарестская, д. 134',
		time: 'понедельник - пятница, с 9.00 до 12.00',
		phone: '+7 (812) 366-71-66',
		info: 'При себе иметь паспорт с пропиской в любом городе РФ' 
	}, {
		name: 'Городская клиническая больница № 31',
		address: 'Ст.м. Крестовский остров, пр. Динамо, д. 3',
		time: 'понедельник, вторник и четверг с 8.30 до 12.00, вторник и четверг с 15.00 до 18.00. В среду ОПК принимают организованные группы доноров по предварительной записи',
		phone: '+7 (812) 235-73-81',
		info: 'При себе иметь паспорт с пропиской в любом городе РФ' 
	}]
}];

class HowShareView extends ShareView {

	get _template() { return require('dev/templates/how_share.handlebars'); }

	_prepareData() {
		return _.extend(super._prepareData(), { share: share });
	}
}

class ShareModel extends Backbone.Model {

	get defaults() {
		return {
			title: 'Как стать донором костного мозга',
			description: 'И зачем это нужно. Рассказываем о донорстве костного мозга, чтобы увеличить российский регистр и помочь людям находить подходящих доноров. Присоединяйтесь!'
		}
	}
}

export default class extends PageView {

	get _template() { return require('dev/templates/how.handlebars'); }

	get events() {
		return {
			'change [data-action="city"]': (e) => {
				let cityValue = $(e.currentTarget).val();
				if (cityValue) {
					let city = _.find(cities, (city) => city.value == cityValue);
					this.city = city;
					this.render({ city: city });

					this.$el.find('[data-action="city"]').val(cityValue);
					this.myMap && this.myMap.destroy();
					this.myMap = new ymaps.Map('map', {
						center: [this.city.coords[0], this.city.coords[1]],
						zoom: 10
					});
				} else {
					this.render({ error: 1 })
				}
			},

			'click [data-action="show-all-points"]': (e) => {
				this.$el.find('[data-action="show-all-points"]').hide();
				this.$el.find('[data-role="all-points"]').show();
			},

			'click [data-action="hide-all-points"]': (e) => {
				this.$el.find('[data-action="show-all-points"]').show();
				this.$el.find('[data-role="all-points"]').hide();
			}
		}
	}

	init() {
		try {
			ymaps.ready(() => {
				this.shareView = this.registerChild(new HowShareView({
					shareModel: new ShareModel()
				}), 'how-share');
				this.shareView.render();
				this.render();
			});
		} catch(e) {
			this.render({ error: 1 })
		}
	}

	_appended() {
		super._appended();
	}

	_prepareData(data = {}) {
		_.extend(data, {
			page: page,
			typography: typography,
			inputs: inputs,
			how: how,
			share: share
		});

		data.cities = _.clone(cities);

		if (data.error) {
			return data
		} else if (data.city) {
			data.oddPoints = _.filter(data.city.points, (point, index) => index % 2);
			data.evenPoints = _.filter(data.city.points, (point, index) => ! (index % 2) );
			data.firstPoint = data.city.points.shift();
		}

		return data;
	}
}