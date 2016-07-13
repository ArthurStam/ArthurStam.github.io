import Backbone from 'backbone';

import CityModel from 'dev/models/city';

export default class extends Backbone.Collection {

	comparator(model) {
	    return model.get('name');
	}

	get model() {
		return CityModel;
	}
}