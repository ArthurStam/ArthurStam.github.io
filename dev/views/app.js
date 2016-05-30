import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import How from 'dev/views/how';
import Why from 'dev/views/why';
// import ShareView from 'dev/views/share';

// import GeoModel from 'dev/models/geo';
import CountersModel from 'dev/models/counters';

import styles from 'dev/styles/app.css';

export default class extends BaseView {

	get _template() { return require('dev/templates/app.handlebars') }

	get _pages() {
		return {
			how: How,
			why: Why
		}
	}

	get className() { return styles.root }

	init() {

		this._router = new Backbone.Router({
			routes: {
				'': this._routeHandler.bind(this, 'why'),
				'how': this._routeHandler.bind(this, 'how'),
				'why': this._routeHandler.bind(this, 'why'),
				':whatever': this._redirect.bind(this, 'why')
			}
		});
		!Backbone.History.started && Backbone.history.start();

		this.listenTo(this.geoModel, 'change', () => {
			this.render();
		});

		// if (navigator.geolocation) {
		// 	navigator.geolocation.getCurrentPosition((position) => {
		// 		this.geoModel.fetch(position.coords.latitude, position.coords.longitude);
		// 	}, (error) => {
		// 		switch(error.code) {
		// 			case 1:
		// 				this.render({ geo: { error: 'You have denied geolocation' } });
		// 				break;
		// 			default:
		// 				this.render({ geo: { error: 'Something goes wrong with geolocation' } });
		// 				break;
		// 		}
		// 	});
		// } else {
		// 	this.render({ geo: { error: 'Your browser doen\'t support geolocation' } });
		// }
	}

	_redirect(pageName = 'why') {
		this._router.navigate(pageName, true);
	}

	_routeHandler(pageName) {
		this._renderPage(pageName);
	}

	_prepareData(data={}) {
		_.extend(data, {
			// city: this.geoModel.get('city'),
			styles: styles
		});
		return data;
	}

	_renderPage(pageName) {
		this.removeChildren('app-container');
		this.registerChild(new this._pages[pageName], 'app-container');
		this.appendChildren('app-container');
	}
}