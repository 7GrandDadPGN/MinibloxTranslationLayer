import Handler from './../handler.js';
import { ClientSocket, SPacketRequestChunk, SPacketUseItem, SPacketPlaceBlock, SPacketBreakBlock, SPacketPlayerAction, SPacketClick, SPacketUpdateSign, BitArray, PBBlockPos } from './../../main.js';
import { BLOCKS, BLOCK_ID } from './../../types/blocks.js';
const Chunk = (await import('prismarine-chunk')).default('1.8.9');
import Vec3 from 'vec3';
const viewDistance = 7, CELL_VOLUME = 16 * 16 * 16;
let client, entity, gui;

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
	isLoaded(x, z) {
		return this.chunks.includes([Math.floor(x / 16), Math.floor(z / 16)].join());
	}
	isEntityLoaded(entity) {
		return this.isLoaded((entity.pos.x / 32), (entity.pos.z / 32));
	}
	update(pos) {
		const x = Math.floor(pos.x / 16), z = Math.floor(pos.z / 16);
		const positions = [];
		const currentlyLoaded = [];

		for (let checkX = -viewDistance; checkX < viewDistance; checkX++) {
			for (let checkZ = -viewDistance; checkZ < viewDistance; checkZ++) {
				const pos = [x + checkX, z + checkZ];
				currentlyLoaded.push(pos.join());
				if (this.chunks.includes(pos.join()) || this.queued.includes(pos.join())) continue;
				positions.push(pos);
			}
		}

		positions.sort((a, b) => {
			const aDist = Math.sqrt((a[0] - x) * (a[0] - x) + (a[1] - z) * (a[1] - z));
			const bDist = Math.sqrt((b[0] - x) * (b[0] - x) + (b[1] - z) * (b[1] - z));
			return bDist - aDist
		});

		for (; positions.length > 0 && this.queued.length < 8; ) {
			const chunk = positions.pop();
			this.queued.push(chunk.join());
			ClientSocket.sendPacket(new SPacketRequestChunk({
				x: chunk[0],
				z: chunk[1]
			}));
		}

		for (const chunk of this.chunks) {
			if (!currentlyLoaded.includes(chunk)) {
				const split = chunk.split(',');
				const cX = Number.parseInt(split[0]), cZ = Number.parseInt(split[1]);
				client.write('map_chunk', {
					x: cX,
					z: cZ,
					groundUp: true,
					bitMap: 0,
					chunkData: []
				});
				this.chunks.splice(this.chunks.indexOf(chunk), 1);
			}
		}
	}
	miniblox() {
		ClientSocket.on('CPacketChunkData', packet => {
			const chunk = this.createChunk(packet), chunkInd = [packet.x, packet.z].join();
			const ind = this.queued.indexOf(chunkInd);
			if (ind != -1) this.queued.splice(ind, 1);
			this.chunks.push(chunkInd);
			client.write('map_chunk', {
				x: packet.x,
				z: packet.z,
				groundUp: true,
				bitMap: chunk.getMask(),
				chunkData: chunk.dump()
			});
			entity.checkAll(client);
		});
		ClientSocket.on('CPacketBlockAction', packet => {
			if (!this.isLoaded(packet.blockPos.x, packet.blockPos.z) || !BLOCK_ID[packet.blockId]) return;
			client.write('block_action', {
				location: packet.blockPos,
				byte1: Math.min(Math.max(packet.instrument, 0), 255),
				byte2: Math.min(Math.max(packet.pitch, 0), 255),
				blockId: BLOCK_ID[packet.blockId]
			});
		});
		ClientSocket.on('CPacketBlockUpdate', packet => {
			if (!this.isLoaded(packet.x, packet.z)) return;
			const blockdata = BLOCKS[packet.id] ?? BLOCKS[9];
			client.write('block_change', {
				location: packet,
				type: (typeof blockdata == 'number' ? blockdata : blockdata[0]) << 4 | (typeof blockdata == 'number' ? 0 : blockdata[1])
			});
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
		ClientSocket.on('CPacketSignEditorOpen', packet => client.write('open_sign_entity', {location: packet.signPosition}));
		ClientSocket.on('CPacketSoundEffect', packet => {
			if (!packet.location) packet.location = {x: entity.local.pos.x * 8, y: entity.local.pos.y * 8, z: entity.local.pos.z * 8};

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
		ClientSocket.on('CPacketUpdateSign', packet => client.write('update_sign', {
			location: packet.pos,
			text1: JSON.stringify({text: packet.lines[0] ?? ''}),
			text2: JSON.stringify({text: packet.lines[1] ?? ''}),
			text3: JSON.stringify({text: packet.lines[2] ?? ''}),
			text4: JSON.stringify({text: packet.lines[3] ?? ''})
		}));
		ClientSocket.on('CPacketUseBed', packet => client.write('bed', {
			entityId: packet.id == entity.local.id ? mcClientId : packet.id,
			location: packet.bedPos
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
			gui.ignorePacket = true;
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
		client.on('update_sign', packet => ClientSocket.sendPacket(new SPacketUpdateSign({
			pos: new PBBlockPos(packet.location),
			lines: [packet.text1, packet.text2, packet.text3, packet.text4]
		})));
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
		this.chunks = [];
		this.queued = [];
		this.breaking = false;
	}
	obtainHandlers(handlers) {
		entity = handlers.entity;
		gui = handlers.gui;
	}
};

export default new self();