const DataWatcher = require('../datawatcher.js');

function convertToByte(num) {
	num &= 0xFF;
	num = num > 127 ? num - 256 : num;
	return num;
};

module.exports = class Entity {
	minecraftId = 2
	pos = {x: 0, y: 0, z: 0}
	motion = {x: 0, y: 0, z: 0}
	yaw = 0
	pitch = 0
	isLoaded = false
	dataWatcher = new DataWatcher(this)
	constructor(index) {
		this.index = index;
		Object.assign(this.dataWatcher.data, {
			0: {key: 0, value: 0, type: 0},
			1: {key: 1, value: 300, type: 1},
			2: {key: 2, value: '', type: 4},
			3: {key: 3, value: 0, type: 0},
			4: {key: 4, value: 0, type: 0}
		});
	}
	createSpawnPacket() {
		this.world.client.write('spawn_entity', {
			entityId: this.minecraftId,
			type: this.typeId,
			x: this.pos.x * 32,
			y: this.pos.y * 32,
			z: this.pos.z * 32,
			yaw: convertToByte(this.yaw),
			pitch: convertToByte(this.pitch),
			objectData: {
				intField: this.shooterId ?? 0,
				velocityX: Math.max(Math.min(this.motion.x * 8000, 32767), -32768),
				velocityY: Math.max(Math.min(this.motion.y * 8000, 32767), -32768),
				velocityZ: Math.max(Math.min(this.motion.z * 8000, 32767), -32768)
			}
		});
	}
	spawn() {
		this.createSpawnPacket();

		this.world.client.write('entity_metadata', {
			entityId: this.minecraftId,
			metadata: Object.values(this.dataWatcher.data)
		});

		if (this.attributeMap != undefined) {
			this.world.client.write('update_attributes', {
				entityId: this.minecraftId,
				properties: this.attributeMap
			});
		}

		if (this.sendVelocityUpdates) {
			this.world.client.write('entity_velocity', {
				entityId: this.minecraftId,
				velocityX: Math.max(Math.min(this.motion.x * 8000, 32767), -32768),
				velocityY: Math.max(Math.min(this.motion.y * 8000, 32767), -32768),
				velocityZ: Math.max(Math.min(this.motion.z * 8000, 32767), -32768)
			});
		}

		if (this.equipment != undefined) {
			for (let i = 0; i < 5; i++) {
				this.world.client.write('entity_equipment', {
					entityId: this.minecraftId,
					slot: i,
					item: this.equipment[i] ?? {blockId: -1}
				});
			}
		}

		if (this.activePotionsMap != undefined) {
			for (const effect of Object.values(this.activePotionsMap)) {
				this.world.client.write('entity_effect', {
					entityId: this.minecraftId,
					effectId: effect.effectId,
					amplifier: effect.amplifier,
					duration: Math.max((effect.duration - Date.now()) / 50, 0),
					hideParticles: effect.hideParticles
				});
			}
		}
	}
	canSpawn() {
		const chunk = this.world.getChunk(this.pos.x >> 4, this.pos.z >> 4);
		return chunk && chunk.isLoaded ? true : false;
	}
	tick() {
		const state = this.canSpawn();
		if (state != this.isLoaded) {
			if (state) {
				this.spawn();
			} else {
				this.world.client.write('entity_destroy', {
					entityIds: [this.minecraftId]
				});
			}

			this.isLoaded = state;
		}
	}
	moveEntity(pos, angles, onGround) {
		const lastPos = {x: this.pos.x, y: this.pos.y, z: this.pos.z};

		if (pos != undefined) {
			if (pos.add) {
				this.pos.x += pos.x;
				this.pos.y += pos.y;
				this.pos.z += pos.z;
			} else {
				this.pos.x = pos.x;
				this.pos.y = pos.y;
				this.pos.z = pos.z;
			}

			this.tick();
		}

		if (angles != undefined) {
			this.yaw = angles.yaw;
			this.pitch = angles.pitch;
		}

		if (this.isLoaded) {
			const diffX = Math.floor(this.pos.x * 32) - Math.floor(lastPos.x * 32);
			const diffY = Math.floor(this.pos.y * 32) - Math.floor(lastPos.y * 32);
			const diffZ = Math.floor(this.pos.z * 32) - Math.floor(lastPos.z * 32);
			const encYaw = convertToByte(this.yaw * 256 / 360);
			const encPitch = convertToByte(this.pitch * 256 / 360);

			if (diffX >= -128 && diffX < 128 && diffY >= -128 && diffY < 128 && diffZ >= -128 && diffZ < 128) {
				this.world.client.write(pos != undefined && angles != undefined ? 'entity_move_look' : (pos != undefined ? 'rel_entity_move' : 'entity_look'), {
					entityId: this.minecraftId,
					dX: diffX,
					dY: diffY,
					dZ: diffZ,
					yaw: encYaw,
					pitch: encPitch,
					onGround: onGround ?? false
				});
			} else {
				this.world.client.write('entity_teleport', {
					entityId: this.minecraftId,
					x: Math.floor(this.pos.x * 32),
					y: Math.floor(this.pos.y * 32),
					z: Math.floor(this.pos.z * 32),
					yaw: encYaw,
					pitch: encPitch,
					onGround: onGround ?? false
				});
			}

			if (angles != undefined && angles.yaw != undefined) {
				this.world.client.write('entity_head_rotation', {
					entityId: this.minecraftId,
					headYaw: encYaw
				});
			}
		}
	}
	playAnimation(type) {
		if (this.isLoaded) {
			this.world.client.write('animation', {
				entityId: this.minecraftId,
				animation: type
			});
		}
	}
	setEntityState(state) {
		if (this.isLoaded) {
			this.world.client.write('entity_status', {
				entityId: this.minecraftId,
				entityStatus: state
			});
		}
	}
	setVelocity(velocity) {
		Object.assign(this.motion, velocity);
		if (this.isLoaded) {
			this.world.client.write('entity_velocity', {
				entityId: this.minecraftId,
				velocityX: Math.max(Math.min(this.motion.x * 8000, 32767), -32768),
				velocityY: Math.max(Math.min(this.motion.y * 8000, 32767), -32768),
				velocityZ: Math.max(Math.min(this.motion.z * 8000, 32767), -32768)
			});
		}
	}
};