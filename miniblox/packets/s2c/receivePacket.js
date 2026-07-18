const { writeString } = require('../../../base/packets/buf_utils');

/**
 * 
 * @param {string} packetName the name of the packet.
 * @param {import('../../types/proto').Message} msg packet data
 * @returns {Buffer} a buffer with data for receive packet
 */
module.exports = function writeReceivePacket(packetName, msg) {
	const j = JSON.stringify(msg.toJSON());
	const len = pkt.length + j.length;

	if (len > 32767) {
		console.info(`Not including packet ${pkt} since it is too long`);
		return;
	}

	const data = Buffer.alloc(len);
	const off = writeString(data, 0, pkt);
	writeString(data, off, j);
	return data;
}
