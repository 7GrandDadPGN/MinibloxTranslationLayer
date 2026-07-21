/**
 * Sent on join. This only sends a single string: The layer identifier.
 * This is useful for detecting this being a translation layer.
 * @module
 */

/**
 * Sends a hello packet.
 * @returns {Buffer} the data to send in the `layer:hello` channel
 */
module.exports = function writeHello() {
	const data = Buffer.alloc(0);
	/*
		> its made to be extensible so you can SKIDDING! the stuff into other layers
		< unless a future comes where I decide to combine it all, NO
		< and that's for me to deal with later
		well ig ok then
	*/
	return data;
};
