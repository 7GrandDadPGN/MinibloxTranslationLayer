const { readString } = require('../../../base/packets/buf_utils');

/**
 * @param {Buffer} buffer
 * @throws if parsing fails
 */
module.exports = function readSendPacket(buffer) {
	const { value: id, end: e } = readString(buffer);
	const { value: json } = readString(buffer, e);
	const data = JSON.parse(json);
	return { id, data };
}
