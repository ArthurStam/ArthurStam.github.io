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
];

function prettifyValue(value) {
	if (!_.isNumber(value)) return value;
	let str = String(value);
	let result = [];
	for (let i = str.length - 1, j = 1; i >= 0; i--, j++) {
		result.unshift(str[i]);
		if (!(j % 3) && i != 0) {
			result.unshift('\u2009');
		}
	}
	return result.join('');
}

export default class extends Backbone.Model {
	
	fetchPotentialDonors(lat, lon) {
		return new Promise((resolve, reject) => {
			ajax({
				url: `${config.api.url}/potential_donors`,
				type: 'get'
			}).then((response) => {
				this.set('total', response.value[0]);
				this.set('diff', response.value[0].value - response.value[response.value.length - 1].value);
				resolve(response);
			}, () => {
				reject();
			});
		})
	}

	get defaults() {
		return {
			total: {
				value: '...',
				date: '...'
			},
			diff: '...'
		}
	}

	get potentialDonors() {
		return {
			value: prettifyValue(this.get('total').value),
			date: this.get('total').date
		};
	}

	get diff() {
		return prettifyValue(this.get('diff'))
	}
}