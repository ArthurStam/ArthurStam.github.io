import Backbone from 'backbone';
import _ from 'underscore';

import ajax from 'dev/helpers/ajax';

export default class extends Backbone.Model {
	
	fetch(lat, lon) {
		return new Promise((resolve, reject) => {
			ajax({
				url: `${location.protocol}//maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true`,
				type: 'get'
			}).then((response) => {
				let locality = _.find(response.results, (item) => {
					return _.contains(item.types, 'locality')
				});
				this.set('formattedAddress', locality.formatted_address)
					.set('placeId', locality.place_id);
				resolve();
			}, () => {
				reject();
			});
		})
	}

	get defaults() {
		return {
			formattedAddress: '',
			placeId: ''
		}
	}
}