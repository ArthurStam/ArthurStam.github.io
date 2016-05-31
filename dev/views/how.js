import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import page from 'dev/styles/page.css';
import typography from 'dev/styles/typography.css';
import how from 'dev/styles/how.css';
import share from 'dev/styles/share.css';

export default class extends BaseView {

	get _template() { return require('dev/templates/how.handlebars'); }

	init() {
		this.render();

	}

	_appended() {
		ymaps.ready(() => {
			this.myMap && this.myMap.destroy();

			this.myMap = new ymaps.Map('map', {
				center: [59.939095, 30.315868],
				zoom: 10
			});
		});
	}

	_prepareData(data = {}) {
		return _.extend(data, {
			page: page,
			typography: typography,
			how: how,
			share: share
		});
	}
}