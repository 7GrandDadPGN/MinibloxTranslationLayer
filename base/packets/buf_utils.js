/**
 * @param {Buffer} buffer
 * @throws if the VarInt manages to exceed 5 length
 */
function readVarInt(buffer, offset = 0) {
	let value = 0;
	let length = 0;
	/**
	 * @type {number | undefined}
	 */
	let currentByte;

	while (true) {
		currentByte = buffer.at(offset + length);
		value |= (currentByte & 0x7F) << (length * 7);
		length += 1;
		if (length > 5) {
			throw new Error('VarInt exceeds allowed bounds.');
		}
		if ((currentByte & 0x80) !== 0x80) break;
	}
	return { value, end: offset + length + 1 };
}

/**
 * @param {Buffer} buffer 
 * @param {number} value
 * @param {number} offset
 * @returns {number} The new offset after writing the VarInt
 */
function writeVarInt(buffer, offset, value) {
	while ((value & 0xFFFFFF80) !== 0) {
		buffer.writeUInt8((value & 0x7F) | 0x80, offset++);
		value >>>= 7;
	}
	buffer.writeUInt8(value, offset++);
	return offset;
}

/** @param {Buffer} buffer */
function readString(buffer, offset = 0) {
	const { value: len, end: e } = readVarInt(buffer, offset);
	const l = len - 1;
	return { value: buffer.toString('utf8', e - 1, e + l), end: e + l };
}

/**
 * @param {Buffer} buffer 
 * @param {number} offset 
 * @param {string} string 
 * @returns {number} new offset to write other stuff at
 * @example ```js
 * const str = "Pet my cat, now!";
 * // IMPORTANT: `+ 1` is required because we write a VarInt for the length.
 * const buf = Buffer.alloc(str.length + 1);
 * writeString(buf, 0, str);
 * ```
 */
function writeString(buffer, offset = 0, string) {
	// Convert string to UTF-8 encoded bytes
	const b = Buffer.from(string, 'utf8');

	if (b.length > 32767) {
		throw new Error(`String too big (was ${b.length} bytes encoded, max 32767)`);
	}

	offset = writeVarInt(buffer, offset, b.length);
	b.copy(buffer, offset);
	return offset + b.length;
}

module.exports = {
    readVarInt, writeVarInt,
    readString, writeString
};