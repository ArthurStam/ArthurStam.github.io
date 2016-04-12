import BaseView from 'crimson-backbone/src/views/base';
import $ from 'jquery';

export default class extends BaseView {

	init() {
		this.render();
	}

	get events() {
		return {
			'click [data-action="fb"]': '_prepareOG'
		}
	}

	_prepareData() {
		return {
			vkUrl: this._generateVkUrl(),
			fbUrl: this._generateFbUrl()
		}
	}

	_generateVkUrl() {
		return `https://vk.com/share.php?url=${encodeURIComponent(this.url)}&title=${encodeURIComponent(this.title)}&image=${encodeURIComponent(this.image)}&description=${encodeURIComponent(this.description)}`;
	}

	_generateFbUrl() {
		return `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
	}

	_prepareOG() {
		$('head')
			.find('[property="og:url"]').attr('content', this.url).end()
			.find('[property="og:title"]').attr('content', this.title).end()
			.find('[property="og:description"]').attr('content', this.description).end()
			.find('[property="og:image"]').attr('content', this.image);
	}
}