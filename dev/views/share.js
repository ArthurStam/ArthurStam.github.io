import BaseView from 'crimson-backbone/src/views/base';

import config from 'dev/config';

export default class extends BaseView {

	init() {
		this.listenTo(this.shareModel, 'change', this.render);
	}

	_prepareData() {
		let shareUrl = `${config.api.url}/share?title=${encodeURIComponent(this.shareModel.get('title'))}&description=${encodeURIComponent(this.shareModel.get('description'))}&image=${encodeURIComponent(this.shareModel.get('image'))}&redirect_url=${encodeURIComponent(location.href)}`;
		return {
			vkUrl: this._generateVkUrl(shareUrl),
			fbUrl: this._generateFbUrl(shareUrl)
		}
	}

	_generateVkUrl(shareUrl) {
		return `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}`
	}

	_generateFbUrl(shareUrl) {
		return `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
	}
}