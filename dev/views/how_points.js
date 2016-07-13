import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';

import PageView from 'dev/views/page';
import ShareView from 'dev/views/share';
import MapView from 'dev/views/map';

import GeoModel from 'dev/models/geo';
import CitiesCollection from 'dev/collections/cities';
import cities from '../cities';

import typography from 'dev/styles/typography.css';
import inputs from 'dev/styles/inputs.css';
import how from 'dev/styles/how.css';

import Typograf from 'typograf';

let tp = new Typograf({ lang: 'ru' });

let citiesCollection = new CitiesCollection();

cities.forEach((city) => {
	citiesCollection.add(city);
});

citiesCollection.sort();

export default class extends PageView {

	get _template() { return require('dev/templates/how_points.handlebars'); }

	get events() {
		return {
			'change [data-action="select-city"]': (e) => {
				let placeId = $(e.currentTarget).val();
				let city = this._findCity(placeId);
				this._setCity(city);
				this.render();
			},

			// 'click [data-action="show-all-points"]': (e) => {
			// 	this.$el.find('[data-action="show-all-points"]').hide();
			// 	this.$el.find('[data-action="hide-all-points"]').show();
			// 	this.$el.find('[data-role="all-points"]').show();
			// 	return false;
			// },

			// 'click [data-action="hide-all-points"]': (e) => {
			// 	this.$el.find('[data-action="show-all-points"]').show();
			// 	this.$el.find('[data-action="hide-all-points"]').hide();
			// 	this.$el.find('[data-role="all-points"]').hide();
			// 	return false;
			// }
		}
	}

	init() {
		this.render();
	}

	_findCity(placeId) {
		return citiesCollection.find((city) => { return city.get('placeId') == placeId; });
	}

	_setCity(city) {
		let placeId = city ? city.get('placeId') : null;
		citiesCollection.each((city) => { city.selected = city.get('placeId') == placeId; });
		this.currentCity = city;
		return city;
	}

	render(data = {}) {
		super.render(data);
		if (this.currentCity) {
			this.removeChildren('how-map');
			let mapView = this.registerChild(new MapView({
				city: this.currentCity,
			}), 'how-map');
			this.appendChildren('how-map');
			mapView.render();
		}
		return this;
	}

	_prepareData(data = {}) {
		_.extend(data, {
			typography: typography,
			inputs: inputs,
			how: how,
		});

		if (data.loading) {
			return data;
		}

		data.citiesCollection = citiesCollection;
		data.currentCity = this.currentCity;
		if (data.error) {
			return data;
		}

		if (this.currentCity) {
			let points = _.clone(this.currentCity.get('points'));
			points.forEach((point) => {
				if (point.name) { point.name = tp.execute(point.name); }
				if (point.info) { point.info = tp.execute(point.info); }
				if (point.time) { point.time = tp.execute(point.time); }
			});
			data.firstPoint = points.shift();
			if (!points.length) {
				data.singlePoint = true;
				return data;
			}
			data.oddPoints = _.filter(points, (point, index) => index % 2);
			data.evenPoints = _.filter(points, (point, index) => ! (index % 2) );
		}

		return data;
	}
}