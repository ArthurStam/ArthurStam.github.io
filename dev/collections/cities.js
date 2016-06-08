import Backbone from 'backbone';

import CityModel from 'dev/models/city';

export default class extends Backbone.Collection {

	get model() {
		return CityModel;
	}
}