import BaseView from 'crimson-backbone/src/views/base';

export default class extends BaseView {

	get _template() { return require('dev/templates/page1.handlebars') }

	init() {
		this.render();
	}
}