import BaseView from 'crimson-backbone/src/views/base';

export default class extends BaseView {

	get _template() { return require('dev/templates/page2.handlebars') }

	init() {
		this.render();
	}
}