/**
 * Does Scruffy stuff.
 * @module
 */
const { ClientSocket, SPACKET_MAP } = require('../../main.js');
const Handler = require('../handler.js');

/** @param {Buffer} buffer */
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
 * @returns 
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

/** @type {import('minecraft-protocol').ServerClient} */
let mcClient;

const S_PACKET_N2C = new Map(Object.entries(SPACKET_MAP));

// idk why you'd want to disable it but you can
const SEND_RECV_PACKET_PAYLOAD = true;

// these (c2s packets) are blacklisted for one of the following reasons:
// - they are sent uselessly
// - you probably don't need them
// - they send too much data
// - or are handled well enough by the translation layer
const C_BLACKLIST = [
	'CPacketChunkData',
	'CPacketJoinGame',
	'CPacketTabComplete',
	'CPacketSoundEffect',
	'CPacketBlockUpdate',
	'CPacketDisconnect',
	'CPacketPlayerPosLook',
	'CPacketSpawnPlayer',
	'CPacketEntityProperties',
	'CPacketWindowItems',
	'CPacketMessage',
	'CPacketUpdateStatus',
	'CPacketScoreboard',
	'CPacketPlayerList',
	'CPacketUpdateHealth',
	'CPacketEntityPositionAndRotation',
	'CPacketEntityRelativePositionAndRotation',
	'CPacketPong',
	'CPacketTimeUpdate',
	'CPacketSetExperience',
	'CPacketOpenShop',
	'CPacketEntityAction',
	'CPacketEntityMetadata',
	'CPacketSetSlot',
	'CPacketPlayerListDelta',
	'CPacketEntityEquipment',
	'CPacketUpdateScoreboard',
	'CPacketPlayerListPing',
	'CPacketSpawnEntity',
	'CPacketDamageIndicator',
	'CPacketAnimation',
	'CPacketRemoveEntityEffect',
	'CPacketEntityEffect',
	'CPacketEntityStatus',
	'CPacketDestroyEntities',
	'CPacketEntityVelocity',
	'CPacketRespawn'
];

/** @param {Buffer} buffer */
function parseSendPacketBuf(buffer) {
	try {
		const { value: id, end: e } = readString(buffer);
		const { value: json } = readString(buffer, e);
		const data = JSON.parse(json);
		return { id, data };
	} catch (err) {
		console.error('Error parsing packet buffer:', err);
	}
}

/**
 * @type {EntityHandler}
 */
let entity;

class Interop extends Handler {
	/**
	 * 
	 * @param {string} pkt name of the packet
	 * @param {import('../../types/proto').Message} msg packet data
	 */
	static handleSocketPacket(pkt, msg) {
		if (C_BLACKLIST.includes(pkt))
			return;

		const j = JSON.stringify(msg.toJSON());
		const len = pkt.length + j.length;

		if (len > 32767) {
			console.info(`Not including packet ${pkt} since it is too long`);
			return;
		}

		const data = Buffer.alloc(len);
		const off = writeString(data, 0, pkt);
		writeString(data, off, j);
		mcClient.write('custom_payload', {
			channel: 'layer:receive_packet',
			data
		});
	}
	miniblox() {
		if (!SEND_RECV_PACKET_PAYLOAD) return;
		ClientSocket.socket.onAny(Interop.handleSocketPacket)
	}
	/** @param {import('minecraft-protocol').ServerClient} client */
	minecraft(client) {
		mcClient = client;
		client.on('custom_payload', packet => {
			/** @type {string} */
			const channel = packet.channel;

			switch (channel) {
				case 'layer:send_packet': {
					const _ = parseSendPacketBuf(packet.data);
					if (_ === undefined) return;
					const { id, data } = _;
					const pkt = S_PACKET_N2C.get(id);
					ClientSocket.sendPacket(pkt.fromJson(data));
					break;
				}
				case 'layer:name_c2s': {
					const n = entity.name;
					const data = Buffer.alloc(n.length * 2 + 1);
					writeString(data, 0, n);
					mcClient.write('custom_payload', {
						channel: 'layer:name_s2c',
						data
					});
					break;
				}
			}
		});
	}
	obtainHandlers(handler) {
		entity = handler.entity;
	}
}

module.exports = new Interop();
