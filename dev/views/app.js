import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import NavView from 'dev/views/nav';
import Page1 from 'dev/views/page1';
import Page2 from 'dev/views/page2';
import Page3 from 'dev/views/page3';
import ShareView from 'dev/views/share';

import GeoModel from 'dev/models/geo';

require('dev/styles/app.scss');

export default class extends BaseView {

	get _template() { return require('dev/templates/app.handlebars') }

	get _pages() {
		return {
			page1: Page1,
			page2: Page2,
			page3: Page3
		}
	}

	init() {
		this.geoModel = new GeoModel();

		this.registerChild(new NavView(), 'app-nav');
		this.registerChild(new ShareView({
			url: 'http://arthurstam.github.io/',
			image: 'https://pp.vk.me/c628321/v628321681/3aacc/q0FIJWZ5zZc.jpg',
			title: 'Сдаем костный мозг',
			description: 'Дипломный проект Алисы Яннау для Школы редакторов',
			_template: require('dev/templates/share.handlebars')
		}), 'app-share')

		this._router = new Backbone.Router({
			routes: {
				'': this._routeHandler.bind(this, 'page1'),
				'page1': this._routeHandler.bind(this, 'page1'),
				'page2': this._routeHandler.bind(this, 'page2'),
				'page3': this._routeHandler.bind(this, 'page3'),
				':whatever': this._redirect.bind(this, 'page1')
			}
		});
		!Backbone.History.started && Backbone.history.start();

		this.listenTo(this.geoModel, 'change', () => {
			this.render();
		});

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.geoModel.fetch(position.coords.latitude, position.coords.longitude);
			}, (error) => {
				switch(error.code) {
					case 1:
						this.render({ geo: { error: 'You have denied geolocation' } });
						break;
					default:
						this.render({ geo: { error: 'Something goes wrong with geolocation' } });
						break;
				}
			});
		} else {
			this.render({ geo: { error: 'Your browser doen\'t support geolocation' } });
		}
	}

	_redirect(pageName) {
		this._router.navigate('page1', true);
	}

	_routeHandler(pageName) {
		this._renderPage(pageName);
	}

	_prepareData(data={}) {
		_.extend(data, {
			city: this.geoModel.get('city')
		});
		return data;
	}

	_renderPage(pageName) {
		this.removeChildren('app-container');
		this.registerChild(new this._pages[pageName], 'app-container');
		this.appendChildren('app-container');
	}
}