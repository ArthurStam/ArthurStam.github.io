import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import styles from 'dev/styles/map.css';

export default class extends BaseView {

	get _template() { return require('dev/templates/map.handlebars') }

	get className() { return styles.root }

	init() {
		
	}

	render() {
		super.render();
		this._renderMap();
		return this;
	}

	_renderMap() {
		this.$el.attr('id', 'map');
		this._map = new ymaps.Map('map', {
			center: [ this.city.get('coords')[0], this.city.get('coords')[1] ],
			zoom: 7
		});
		this._addPlacemarks(this.city.get('points'));
	}

	remove() {
		this._map.destroy();
		return super.remove();
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
		this._map.setBounds(this._map.geoObjects.getBounds(), {
			checkZoomRange: true
		});
	}

	_prepareData() {
		return {
			styles: styles
		}
	}
}