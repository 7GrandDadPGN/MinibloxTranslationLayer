const { writeString } = require('../buf_utils');

/**
 * @param {string} remoteName
 * @param {string} remoteUUID
 * @returns {Buffer} packet to send over `layer:player`
 */
module.exports = function writePlayer(remoteName, remoteUUID) {
		const len = remoteName.length + 1 + remoteUUID.length + 1;

		const data = Buffer.alloc(len);
		let off = writeString(data, 0, remoteName);
		writeString(data, off, remoteUUID);
		return data;
}