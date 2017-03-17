const _config = require('../server/_config');
const crypto = require('crypto');

function dataToHex(data) {
	console.log('crypto data: ', data);
	const hmac = crypto.createHmac('sha512', _config.SERVER_SECRET);
	hmac.update(data, 'utf8');
	return hmac.digest('hex');
}

module.exports = {
	dataToHex
}
