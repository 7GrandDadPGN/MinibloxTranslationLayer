const { writeString } = require('../../../base/packets/buf_utils');

/**
 * 
 * @param {string} name the name of the packet.
 * @param {import('../../types/proto').Message} msg packet data
 * @returns {Buffer | undefined} a buffer with data for receive packet, or undefined if it was too long.
 */
module.exports = function writeReceivePacket(name, msg) {
	const j = JSON.stringify(msg.toJSON());
	const len = name.length + j.length;

	if (len > 32767) {
		console.info(`Not including packet ${name} since it is too long`);
		return;
	}

	const data = Buffer.alloc(len);
	const off = writeString(data, 0, name);
	writeString(data, off, j);
	return data;
}
