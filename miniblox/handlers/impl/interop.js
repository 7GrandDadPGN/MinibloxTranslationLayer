/**
 * Does Scruffy stuff.
 * @module
 */
const { ClientSocket, SPACKET_MAP } = require('../../main.js');
const Handler = require('../handler.js');
const { writeString } = require('../../../base/packets/buf_utils.js');
const readSendPacket = require('../../packets/c2s/sendPacket.js');
const writeReceivePacket = require('../../packets/s2c/receivePacket.js');

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

/**
 * @type {EntityHandler}
 */
let entity;
const warnings = {
	name: false,
	sendPacket: false
};

class Interop extends Handler {
	/**
	 * 
	 * @param {string} pkt name of the packet
	 * @param {import('../../types/proto').Message} msg packet data
	 */
	static handleSocketPacket(pkt, msg) {
		if (C_BLACKLIST.includes(pkt))
			return;

		const data = writeReceivePacket(pkt, msg);
		// the packet was so long that it exceeded the limit (32767). I remember this limit occurring when it tried to send me some terrain
		// terrain is blacklisted now though so it won't happen and even hopefully without this limit
		if (data === undefined) {
			return;
		}

		mcClient.write('custom_payload', {
			channel: 'miniblox:receive_packet',
			data
		});
		// not re-sending ts for baby boomer clients that got ts before it was even upstream'd
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
				// biome-ignore lint/suspicious/noFallthroughSwitchClause: intentional
				case 'layer:send_packet':
					if (!warnings.sendPacket) {
						console.warn(`\x1b[33m[!]\x1b[0m layer:send_packet is deprecated, use miniblox:send_packet instead!
Note that layer:receive_packet is gone without backwards compatibility.`);
						warnings.sendPacket = true;
					}
				case 'miniblox:send_packet': {
					const _ = readSendPacket(packet.data);
					if (_ == undefined) return;
					const { id, data } = _;
					const pkt = S_PACKET_N2C.get(id);
					ClientSocket.sendPacket(pkt.fromJson(data));
					break;
				}
				case 'layer:name_c2s': {
					if (!warnings.name) {
						console.warn('\x1b[33m[!]\x1b[0m layer:name_c2s is deprecated, use the info from layer:player instead.');
						warnings.name = true;
					}
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
