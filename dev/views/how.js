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
		coords: [68.95147, 33.103143],
		name: 'Мурманская Областная Станция Переливания Крови',
		address: 'ул. Павлова, 6',
		time: 'предварительная запись с 15 до 18.00',
		phone: '8 (8152) 25-02-61 (62 доктора)',
		info: 'Принимают только доноров, на типирование можно сдать со второго раза, процедуру объясняют при записи'
	}, {
		coords: [68.925654, 33.107868],
		name: 'CMD – Центр молекулярной диагностики',
		address: 'Пр. Кольский, д. 61',
		time: 'до сентября 2016 прием приостановлен, только группы от 20 человек',
		phone: '8 (8152) 20-77-68',
		info: 'до сентября 2016 прием приостановлен, только группы от 20 человек'
	}, {
		coords: [69.015151, 33.103313],
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
		coords: [59.96566, 30.324968],
		name: 'Институт детской гематологии и трансплантологии им. Р.М. Горбачевой',
		address: 'Ст.м. Петроградская, ул. Рентгена, 12, 10 эт., каб. 1007',
		time: 'вторник 16:00 - 19:00, четверг 10:00 - 12:00',
		info: 'Записываться заранее не нужно, просто приходите' 
	}, {
		coords: [59.964273, 30.321348],
		name: 'ПСПбГМУ им. Павлова',
		address: 'Ст.м. Петроградская, ул. Льва Толстого д. 19, корп. 53',
		time: 'понедельник - четверг, с 8.30 до 11.30',
		phone: '+7 (812) 429-24-13',
		info: 'При себе иметь паспорт с пропиской в любом городе РФ' 
	}, {
		coords: [59.83839, 30.418231],
		name: 'Санкт-Петербургская детская инфекционная больница № 5 им. Н.Ф.Филатова',
		address: 'Ст. м. Купчино, ул. Бухарестская, д. 134',
		time: 'понедельник - пятница, с 9.00 до 12.00',
		phone: '+7 (812) 366-71-66',
		info: 'При себе иметь паспорт с пропиской в любом городе РФ' 
	}, {
		coords: [59.972298, 30.279091],
		name: 'Городская клиническая больница № 31',
		address: 'Ст.м. Крестовский остров, пр. Динамо, д. 3',
		time: 'понедельник, вторник и четверг с 8.30 до 12.00, вторник и четверг с 15.00 до 18.00. В среду ОПК принимают организованные группы доноров по предварительной записи',
		phone: '+7 (812) 235-73-81',
		info: 'При себе иметь паспорт с пропиской в любом городе РФ' 
	}]
}, {
	value: 'msk',
	coords: [55.75396, 37.620393],
	name: 'Москва',
	points: [{
		coords: [55.543766, 37.539922],
		name: 'Медицинская клиника LeVita',
		address: 'Ул. Южнобутовская, д. 10 (ст. метро «Бульвар Адмирала Ушакова»)',
		time: 'пн-чт 12:00 - 16:00, Пт 14:00 - 17:00',
		phone: '+7 (495) 505-5078, +7 (499) 793-2381, +7 (499) 793-2336, +7 (499) 793-2427',
		info: 'Записаться можно на сайте клиники www.levita-med.ru, www.levita-kids.ru'
	}, {
		coords: [55.801334, 37.552058],
		name: 'Гематологический научный центр Минздрава России',
		address: 'Новый Зыковский проезд, д.4А (ст. метро «Динамо»)',
		time: 'пн-пт 8:00 - 14:00',
		phone: '+7 (905) 568-5760, +7 (903) 128-84-18'
	}]
}, {
	value: 'kzn',
	coords: [55.798551, 49.106324],
	name: 'Казань',
	points: [{
		coords: [55.783251, 49.126734],
		name: 'Казанский филиал Кировского регистра',
		address: 'ул. Островского, 69/3',
		time: 'будние дни с 8 до 12',
		phone: '+7 (843) 292-12-02'
	}, {
		coords: [55.72857, 49.1788],
		name: 'Детская республиканская клиническая больница',
		address: 'Оренбургский тракт, 140, 1 корпус, Отделение переливания крови, 3-й этаж поликлиники',
		time: 'будние дни 8:30 – 12:00',
		phone: '+7 (843) 267-89-20'
	}, {
		coords: [55.73002, 49.188655],
		name: 'РКБ',
		address: 'Оренбургский тракт, 138',
		phone: '+7 (843) 237-35-36',
	}, {
		coords: [55.753169, 49.171075],
		name: 'Межрегиональный клинико-диагностический центр (МКДЦ)',
		address: 'Ул. Карбышева, 12 А, Отделение переливания крови, Блок Б, 1 этаж',
		time: '8:00 – 12:00',
		phone: '+7 (843) 291-10-97, +7 (843) 291-10-75'
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
			description: 'И зачем это нужно. Рассказываем о донорстве костного мозга, чтобы увеличить российский регистр и помочь людям находить подходящих доноров. Присоединяйтесь!',
			image: 'http://arthurstam.github.io/static/share_main.png'
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
					this._map && this._map.destroy();
					this._map = new ymaps.Map('map', {
						center: [this.city.coords[0], this.city.coords[1]],
						zoom: 4
					});
					this._addPlacemarks(city.points);
				} else {
					this.render({ error: 1 })
				}
			},

			'click [data-action="show-all-points"]': (e) => {
				this.$el.find('[data-action="show-all-points"]').hide();
				this.$el.find('[data-action="hide-all-points"]').show();
				this.$el.find('[data-role="all-points"]').show();
			},

			'click [data-action="hide-all-points"]': (e) => {
				this.$el.find('[data-action="show-all-points"]').show();
				this.$el.find('[data-action="hide-all-points"]').hide();
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

	_addPlacemarks(points) {
		let coords = _.pluck(points, 'coords');

		let collection = new ymaps.GeoObjectCollection({}, {
			preset: 'islands#redIcon'
		});

		for (let i = 0; i < coords.length; i++) {
			let placemark = new ymaps.Placemark(coords[i]) 
			placemark.properties.set('balloonContent', 
				`${points[i].address}<br>${points[i].name}`
			);
			collection.add(placemark);
		}

		this._map.geoObjects.add(collection);
		this._map.setBounds(this._map.geoObjects.getBounds());
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
			let points = _.clone(data.city.points)
			data.firstPoint = points.shift();
			data.oddPoints = _.filter(points, (point, index) => index % 2);
			data.evenPoints = _.filter(points, (point, index) => ! (index % 2) );
		}

		return data;
	}
}