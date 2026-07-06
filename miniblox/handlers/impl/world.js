const Handler = require('./../handler.js');
const { ClientSocket, SPacketRequestChunk, SPacketUseItem, SPacketPlaceBlock, SPacketBreakBlock, SPacketPlayerAction, SPacketClick, SPacketUpdateSign, BitArray, PBBlockPos } = require('./../../main.js');
const { BLOCKS, BLOCK_ID } = require('./../../types/blocks.js');
const Chunk = require('prismarine-chunk')('1.8.9');
const ProxyChunk = require('../../../base/translation/classes/chunk.js');
const Vec3 = require('vec3');
const viewDistance = 7, CELL_VOLUME = 16 * 16 * 16;
let client, entity, gui;
let MCHandler;

let lightData = new Chunk();
for (let x = 0; x < 16; x++) {
	for (let z = 0; z < 16; z++) {
		for (let skyY = 0; skyY < 256; skyY++) {
			lightData.setSkyLight(new Vec3(x, skyY, z), 15);
		}
	}
}
lightData = lightData.dump();

function getBlockIndex(x, y, z) {
	return (y & 15) << 8 | (z & 15) << 4 | x & 15
}

const self = class WorldHandler extends Handler {
	createChunk(packet) {
		const chunk = new Chunk();
		chunk.load(lightData);
		for (const cell of packet.cells) {
			const array = new BitArray(CELL_VOLUME, cell.bitsPerEntry, cell.bitArray);
			if (!array) continue;
			for (let x = 0; x < 16; x++) {
				for (let z = 0; z < 16; z++) {
					for (let y = 0; y < 16; y++) {
						const offset = array.get(getBlockIndex(x, y, z));
						if (offset == 0) continue;
						const blockdata = BLOCKS[cell.palette[offset]] ?? BLOCKS[9], vec = new Vec3(x, cell.y + y, z);
						if (typeof blockdata == 'number') {
							chunk.setBlockType(vec, blockdata);
						} else {
							chunk.setBlockType(vec, blockdata[0]);
							chunk.setBlockData(vec, blockdata[1]);
						}
					}
				}
			}
		}

		return chunk;
	}
	miniblox() {
		MCHandler.world.requestCallback = function(chunk) {
			ClientSocket.sendPacket(new SPacketRequestChunk({
				x: chunk[0],
				z: chunk[1]
			}));
		};

		ClientSocket.on('CPacketChunkData', packet => {
			const chunk = MCHandler.world.addChunk(new ProxyChunk(packet.x, packet.z, this.createChunk(packet)));
			chunk.load();
		});

		ClientSocket.on('CPacketBlockAction', packet => {
			const chunk = MCHandler.world.getChunk(packet.blockPos.x >> 4, packet.blockPos.z >> 4);
			if (!(chunk && chunk.isLoaded) || !BLOCK_ID[packet.blockId]) return;

			client.write('block_action', {
				location: packet.blockPos,
				byte1: Math.min(Math.max(packet.instrument, 0), 255),
				byte2: Math.min(Math.max(packet.pitch, 0), 255),
				blockId: BLOCK_ID[packet.blockId]
			});
		});

		ClientSocket.on('CPacketBlockUpdate', packet => {
			MCHandler.world.setBlock(packet, BLOCKS[packet.id] ?? BLOCKS[9]);
		});

		ClientSocket.on('CPacketParticles', packet => client.write('world_particles', {
			particleId: packet.particleId,
			longDistance: false,
			x: packet.x,
			y: packet.y,
			z: packet.z,
			offsetX: packet.xOffset,
			offsetY: packet.yOffset,
			offsetZ: packet.zOffset,
			particleData: packet.speed,
			particles: packet.count
		}));

		ClientSocket.on('CPacketSoundEffect', packet => {
			if (!packet.location) packet.location = {x: MCHandler.local.pos.x * 8, y: MCHandler.local.pos.y * 8, z: MCHandler.local.pos.z * 8};

			client.write('named_sound_effect', {
				soundName: packet.sound,
				x: packet.location.x,
				y: packet.location.y,
				z: packet.location.z,
				volume: packet.volume,
				pitch: packet.pitch * 63
			});
		});

		ClientSocket.on('CPacketTimeUpdate', packet => client.write('update_time', {
			age: [0, packet.totalTime],
			time: [0, packet.worldTime]
		}));
	}
	minecraft(mcClient) {
		client = mcClient;

		client.on('block_place', packet => {
			if (packet.direction == -1) {
				ClientSocket.sendPacket(new SPacketUseItem);
			} else {
				ClientSocket.sendPacket(new SPacketPlaceBlock({
					positionIn: new PBBlockPos(packet.location),
					side: packet.direction,
					hitX: packet.cursorX,
					hitY: packet.cursorY,
					hitZ: packet.cursorZ
				}));
			}

			gui.ignorePacket = Date.now() + 1000;
		});

		client.on('block_dig', packet => {
			const location = new PBBlockPos(packet.location);
			switch (packet.status) {
				case 0:
					this.breaking = true;
					ClientSocket.sendPacket(new SPacketClick({location: location}));
					ClientSocket.sendPacket(new SPacketBreakBlock({location: location, start: true}));
					return;
				case 1:
					this.breaking = false;
					return;
				case 2:
					this.breaking = false;
					ClientSocket.sendPacket(new SPacketBreakBlock({location: location, start: false}));
					return;
			}

			ClientSocket.sendPacket(new SPacketPlayerAction({
				position: location,
				facing: packet.face,
				action: packet.status
			}));
		});
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
		this.breaking = false;
	}
	obtainHandlers(handlers, mchandler) {
		entity = handlers.entity;
		gui = handlers.gui;
		MCHandler = mchandler;
	}
};

module.exports = new self();