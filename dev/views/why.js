import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';
import TestView from 'dev/views/test';

import CountersModel from 'dev/models/counters';

import page from 'dev/styles/page.css';
import typography from 'dev/styles/typography.css';
import why from 'dev/styles/why.css';

export default class extends BaseView {

	get _template() { return require('dev/templates/why.handlebars'); }

	init() {
		this.countersModel = new CountersModel();

		this.registerChild(new TestView(), 'how-test');

		this.countersModel.fetchPotentialDonors().then(() => {
			this.render();
		}, () => {

		});

		this.render();
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			page: page,
			typography: typography,
			why: why,
			data: {
				potentialDonors: this.countersModel.potentialDonors
			}
		});
	}
}