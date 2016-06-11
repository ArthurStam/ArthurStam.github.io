import Backbone from 'backbone';
import _ from 'underscore';

import ajax from 'dev/helpers/ajax';
import config from 'dev/config';

let MONTHES = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'
]

export default class extends Backbone.Model {
	
	fetchPotentialDonors(lat, lon) {
		return new Promise((resolve, reject) => {
			ajax({
				url: `${config.api.url}/potential_donors`,
				type: 'get'
			}).then((response) => {
				this.set(response.value);
				console.log(this.get('currentMonth').value)
				resolve(response);
			}, () => {
				reject();
			});
		})
	}

	get defaults() {
		return {
			total: {
				value: '...'
			},
			currentMonth: {}
		}
	}

	get potentialDonors() {
		let date = new Date(this.get('total').timestamp)
		return {
			value: this.get('total').value,
			date: this.get('total').timestamp ? `${date.getDate()} ${MONTHES[date.getMonth()]} ${date.getFullYear()} года` : '...'
		};
	}

	get diff() {
		let diff = this.get('total').value - this.get('currentMonth').value;
		return _.isNumber(diff) ? diff : '...'
	}
}