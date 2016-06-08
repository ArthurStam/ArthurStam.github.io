import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import BaseView from 'crimson-backbone/src/views/base';

import How from 'dev/views/how';
import Why from 'dev/views/why';

import CountersModel from 'dev/models/counters';

import styles from 'dev/styles/app.css';

export default class extends BaseView {

	get _template() { return require('dev/templates/app.handlebars') }

	get _pages() {
		return {
			how: How,
			why: Why
		}
	}

	get className() { return styles.root }

	get events() {
		return {
			'click [data-action="scroll-to"]': (e) => {
				let $element = $(`${ $(e.currentTarget).data('element') }`);
				$element.length && this._scrollTo($element.offset().top);
				return false;
			},

			'click [data-action="redirect-and-scroll-to"]': (e) => {
				let pageName = $(e.currentTarget).data('page');
				this._redirect(pageName);
				let $element = $(`${ $(e.currentTarget).data('element') }`);
				$element.length && this._scrollTo($element.offset().top);
				return false;
			}
		}
	}

	init() {

		this._router = new Backbone.Router({
			routes: {
				'': this._routeHandler.bind(this, 'why'),
				'how': this._routeHandler.bind(this, 'how'),
				'why': this._routeHandler.bind(this, 'why'),
				':whatever': this._redirect.bind(this, 'why')
			}
		});
		!Backbone.History.started && Backbone.history.start();
	}

	_redirect(pageName = 'why') {
		this._scrollTo(0);
		this._router.navigate(pageName, true);
	}

	_routeHandler(pageName) {
		this._scrollTo(0);
		this._renderPage(pageName);
	}

	_scrollTo(position) {
		$('body, html').scrollTop(position);
	}

	_prepareData(data={}) {
		_.extend(data, {
			// city: this.geoModel.get('city'),
			styles: styles
		});
		return data;
	}

	_renderPage(pageName) {
		this.removeChildren('app-container');
		let pageView = this.registerChild(new this._pages[pageName], 'app-container');
		this.appendChildren('app-container');
		return pageView;
	}
}