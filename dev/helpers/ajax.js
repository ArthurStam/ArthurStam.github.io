import $ from 'jquery';

export default (params={}) => {
	return new Promise((resolve, reject) => {
		$.ajax(params).done((response) => {
			resolve(response);
		}).error((response) => {
			reject(response);			
		});
	});
}