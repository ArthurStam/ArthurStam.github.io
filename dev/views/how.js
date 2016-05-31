import _ from 'underscore';

import PageView from 'dev/views/page';

import page from 'dev/styles/page.css';
import typography from 'dev/styles/typography.css';
import how from 'dev/styles/how.css';
import share from 'dev/styles/share.css';

export default class extends PageView {

	get _template() { return require('dev/templates/how.handlebars'); }

	init() {
		this.render();
	}

	_appended() {
		super._appended();
		try {
			ymaps.ready(() => {
				this.myMap && this.myMap.destroy();

				this.myMap = new ymaps.Map('map', {
					center: [59.939095, 30.315868],
					zoom: 10
				});
			});
		} catch(e) {
			
		}
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