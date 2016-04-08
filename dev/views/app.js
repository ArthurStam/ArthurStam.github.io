import Backbone from 'backbone';

import BaseView from 'crimson-backbone/src/views/base';

import NavView from 'dev/views/nav';
import Page1 from 'dev/views/page1';
import Page2 from 'dev/views/page2';
import Page3 from 'dev/views/page3';

require('dev/styles/app.scss');

export default class extends BaseView {

	get _template() { return require('dev/templates/app.handlebars') }

	get _pages() {
		return {
			page1: Page1,
			page2: Page2,
			page3: Page3
		}
	}

	init() {
		this.registerChild(new NavView(), 'app-nav');

		new Backbone.Router({
			routes: {
				'page1': this._routeHandler.bind(this, 'page1'),
				'page2': this._routeHandler.bind(this, 'page2'),
				'page3': this._routeHandler.bind(this, 'page3'),
			}
		});
		!Backbone.History.started && Backbone.history.start();
	}

	_routeHandler(page) {
		this.removeChildren('app-container');
		this.registerChild(new this._pages[page], 'app-container');
		this.appendChildren('app-container');
	}
}