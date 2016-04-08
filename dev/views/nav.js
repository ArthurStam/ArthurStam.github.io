import BaseView from 'crimson-backbone/src/views/base';

require('dev/styles/nav.scss');

export default class extends BaseView {

	get _template() { return require('dev/templates/nav.handlebars') }

	init() {
		this.render();
	}
}