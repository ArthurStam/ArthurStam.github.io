import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';

import PageView from 'dev/views/page';
import ShareView from 'dev/views/share';

import page from 'dev/styles/page.css';
import typography from 'dev/styles/typography.css';
import how from 'dev/styles/how.css';
import share from 'dev/styles/share.css';

class HowShareView extends ShareView {

	get _template() { return require('dev/templates/how_share.handlebars'); }

	_prepareData() {
		return _.extend(super._prepareData(), { share: share });
	}
}

class ShareModel extends Backbone.Model {

	get defaults() {
		return {
			title: 'Как стать донором костного мозга',
			description: 'И зачем это нужно. Рассказываем о донорстве костного мозга, чтобы увеличить российский регистр и помочь людям находить подходящих доноров. Присоединяйтесь!',
			image: 'http://arthurstam.github.io/static/share_main.png'
		}
	}
}

export default class extends PageView {

	get _template() { return require('dev/templates/how.handlebars'); }

	get events() {
		return {

			'click [data-action="audio-play"]': (e) => {
			    this._audio.play();
			    this.$el.find('[data-action="audio-pause"]')
			    	.show()
			    	.end()
		    		.find('[data-action="audio-play"]')
		    		.hide();
			    return false;
			},

			'click [data-action="audio-pause"]': (e) => {
			    this._audio.pause();
			    this.$el.find('[data-action="audio-pause"]')
			    	.hide()
			    	.end()
		    		.find('[data-action="audio-play"]')
		    		.show();
			    return false;
			}
		}
	}

	init() {
		this.shareModel = new ShareModel();

		this.shareView = this.registerChild(new HowShareView({
			shareModel: this.shareModel
		}), 'how-share').render();

		this.render();
	}

	render(data = {}) {
		super.render(data);
		this._audio = this.$el.find('[data-role="audio"]')[0];
		return this;
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