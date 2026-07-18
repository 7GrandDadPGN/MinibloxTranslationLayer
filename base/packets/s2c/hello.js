/**
 * Sent on join. This only sends a single string: The layer identifier.
 * This is useful for detecting this being a translation layer.
 * @module
 */

const { writeString } = require("../buf_utils");

/**
 * Sends a hello packet.
 * @param {string} layerID the layer ID, this should be the "service" (game) being translated (i.e. Miniblox).
 * @returns {Buffer} the data to send in the `layer:hello` channel
 */
module.exports = function writeHello(layerID) {
	const data = Buffer.alloc(layerID.length + 1);
	writeString(data, 0, layerID);
	return data;
}