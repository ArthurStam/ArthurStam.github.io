import BaseView from 'crimson-backbone/src/views/base';

export default class extends BaseView {

	init() {
		this.render();
	}

	_prepareData() {
		return {
			vkUrl: this._generateVkUrl(),
			fbUrl: this._generateFbUrl()
		}
	}

	_generateVkUrl() {
		return `https://vk.com/share.php?url=${encodeURIComponent(this.url)}&title=${encodeURIComponent(this.title)}&image=${encodeURIComponent(this.image)}`
	}

	_generateFbUrl() {
		return `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}&t=${encodeURIComponent(this.title)}`
	}
}