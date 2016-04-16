import BaseView from 'crimson-backbone/src/views/base';

import config from 'dev/config';

export default class extends BaseView {

	init() {
		this.shareUrl = `${config.api.url}/share?title=${encodeURIComponent(this.title)}&description=${encodeURIComponent(this.description)}&image=${encodeURIComponent(this.image)}&redirect_url=${encodeURIComponent(location.href)}`;
		this.render();
	}

	_prepareData() {
		return {
			vkUrl: this._generateVkUrl(),
			fbUrl: this._generateFbUrl()
		}
	}

	_generateVkUrl() {
		return `https://vk.com/share.php?url=${encodeURIComponent(this.shareUrl)}`
	}

	_generateFbUrl() {
		return `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl)}`;
	}
}