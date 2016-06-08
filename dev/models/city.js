import Backbone from 'backbone';

export default class extends Backbone.Model {

	get defaults() {
		return {
			value: '',
			coords: [],
			name: '',
			formatted_address: '',
			points: []
		}
	}
}