import Backbone from 'backbone';
import _ from 'underscore';

import ajax from 'dev/helpers/ajax';
import config from 'dev/config';

export default class extends Backbone.Model {
	
	fetchPotentialDonors(lat, lon) {
		return new Promise((resolve, reject) => {
			ajax({
				url: `${config.api.url}/potential_donors`,
				type: 'get'
			}).then((response) => {
				this.set('potentialDonors', response.value);
				resolve(response);
			}, () => {
				reject();
			});
		})
	}

	get defaults() {
		return {
			potentialDonors: null
		}
	}

	get potentialDonors() {
		let value = this.get('potentialDonors');
		return value ? value.toLocaleString('ru-RU') : 0;
	}
}