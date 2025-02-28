const Handler = require('./../handler.js');
const { ClientSocket, SPacketPlayerPosLook, SPacketPlayerInput, SPacketEntityAction, SPacketPlayerAbilities, SPacketHeldItemChange, SPacketClick, SPacketRespawn$1, SPacketUseEntity, PBVector3 } = require('./../../main.js');
const ENTITIES = require('./../../types/entities.js');
const GAMEMODES = require('./../../types/gamemodes.js');
const { translateItem } = require('./../../utils.js');
const DEG2RAD = Math.PI / 180, RAD2DEG = 180 / Math.PI;
let client, tablist, world;

function convertAngle(ang, ignore, num) {
	if (!ignore) ang = ang / 256 * Math.PI * 2;
	ang = (((ang * -1) * RAD2DEG) - (num != undefined ? num : 0)) * 256 / 360;
	return convertToByte(ang);
}

function clampByte(byte) {
	return Math.min(Math.max(byte, -128), 127);
}

function clampToBox(pos, box) {
	box = convertServerPos(box);
	return {
		x: Math.min(Math.max(pos.x, box.x - 0.4), box.x + 0.4),
		y: Math.min(Math.max(pos.y + 1.62, box.y - 0.1), box.y + 1.9),
		z: Math.min(Math.max(pos.z, box.z - 0.4), box.z + 0.4)
	};
}

function convertToByte(num) {
	num &= 0xFF;
	num = num > 127 ? num - 256 : num;
	return num;
}

function convertServerPos(pos) {
	return {x: pos.x / 32, y: pos.y / 32, z: pos.z / 32};
}

const self = class EntityHandler extends Handler {
	canSpawn(entity) {
		if (entity.type == -1 && ((!tablist.entries[entity.id] && !entity.special) || this.gamemodes[entity.id] == GAMEMODES.spectator)) return false;
		if (!world.isEntityLoaded(entity)) return false;
		return true;
	}
	spawn(entity) {
		if (!entity || entity.spawned) return;
		if (entity.special) {
			tablist.entries[entity.id] = crypto.randomUUID();
			client.write('player_info', {
				action: 0,
				data: [{
					UUID: tablist.entries[entity.id],
					name: 'BOT',
					properties: [],
					gamemode: 1,
					ping: 0
				}]
			});
		}

		entity.spawned = true;
		if (entity.type == -1) {
			client.write('named_entity_spawn', {
				entityId: entity.id,
				playerUUID: tablist.entries[entity.id] ?? crypto.randomUUID(),
				x: entity.pos.x,
				y: entity.pos.y,
				z: entity.pos.z,
				yaw: entity.yaw,
				pitch: entity.pitch,
				currentItem: 0,
				metadata: entity.metadata
			});
			client.write('entity_head_rotation', {
				entityId: entity.id,
				headYaw: entity.yaw
			});

			for (const [slot, item] of Object.entries(entity.equipment)) {
				client.write('entity_equipment', {
					entityId: entity.id,
					slot: slot,
					item: item
				});
			}
		} else {
			const entityType = ENTITIES[entity.type];
			client.write(entityType[1] ? 'spawn_entity_living' : 'spawn_entity', {
				entityId: entity.id,
				type: entityType[0],
				x: entity.pos.x,
				y: entity.pos.y,
				z: entity.pos.z,
				yaw: entity.yaw,
				pitch: entity.pitch,
				objectData: entity.objectData,
				metadata: entity.metadata
			});

			if (!entityType[1]) {
				client.write('entity_metadata', {
					entityId: entity.id,
					metadata: entity.metadata
				});
			}
		}

		if (entity.special) {
			client.write('player_info', {
				action: 4,
				data: [{'UUID': tablist.entries[entity.id]}]
			});
		}

		return true;
	}
	remove(entity) {
		if (!entity || !entity.spawned) return;

		entity.spawned = false;
		client.write('entity_destroy', {
			entityIds: [entity.id]
		});
	}
	check(entity) {
		if (!entity) return;
		if (this.canSpawn(entity) != entity.spawned) {
			if (entity.spawned) this.remove(entity);
			else this.spawn(entity);
		}
	}
	actions() {
		world.update(this.local.pos);
		const newState = [this.local.state[0] > Date.now(), this.local.state[1] ?? false, this.local.state[2] ?? false];
		const oldState = this.local.lastState;
		if (newState[0] == oldState[0] && newState[1] == oldState[1] && newState[2] == oldState[2]) return;
		ClientSocket.sendPacket(new SPacketEntityAction({
			id: this.local.id,
			punching: newState[0] != oldState[0] ? newState[0] : undefined,
			sprinting: newState[1] != oldState[1] ? newState[1] : undefined,
			sneak: newState[2] != oldState[2] ? newState[2] : undefined
		}));
		this.local.lastState = newState;
	}
	abilities(movement) {
		if (this.local.flying == false) return;
		ClientSocket.sendPacket(new SPacketPlayerAbilities({isFlying: false}));
		this.local.flying = false;
	}
	checkAll() {
		Object.values(this.entities).forEach((entity) => this.check(entity));
	}
	convertId(id) {
		return id == this.local.id ? this.local.mcId : id;
	}
	miniblox() {
		// UNIVERSAL
		ClientSocket.on('CPacketSpawnEntity', packet => {
			if (ENTITIES[packet.type] == undefined) return;
			if (!packet.motion) packet.motion = {x: 0, y: 0, z: 0};
			this.entities[packet.id] = {
				id: packet.id,
				type: packet.type,
				pos: packet.pos,
				yaw: convertAngle(packet.yaw, true),
				pitch: convertAngle(packet.pitch, true),
				metadata: {},
				equipment: {},
				objectData: {
					intField: packet.shooterId != null ? this.convertId(packet.shooterId) : 1,
					velocityX: Math.max(Math.min(packet.motion.x * 8000, 32767), -32768),
					velocityY: Math.max(Math.min(packet.motion.y * 8000, 32767), -32768),
					velocityZ: Math.max(Math.min(packet.motion.z * 8000, 32767), -32768)
				},
				spawned: false
			};
			this.check(this.entities[packet.id]);
		});
		ClientSocket.on('CPacketSpawnPlayer', packet => {
			const yaw = convertAngle(packet.yaw, true, 180), pitch = convertAngle(packet.pitch, true);
			if (packet.socketId == ClientSocket.id) {
				delete this.gamemodes[packet.id];
				this.local.id = packet.id;
				this.local.pos = {x: packet.pos.x, y: packet.pos.y, z: packet.pos.z};
				this.teleport = this.local.pos;
				client.write('position', {
					x: packet.pos.x,
					y: packet.pos.y,
					z: packet.pos.z,
					yaw: yaw,
					pitch: pitch,
					flags: 0
				});
			} else {
				const entity = this.entities[packet.id];
				this.gamemodes[packet.id] = GAMEMODES[packet.gamemode ?? 'survival'];
				this.skins[packet.id] = packet.cosmetics.skin;

				if (entity && entity.spawned) {
					client.write('entity_teleport', {
						entityId: packet.id,
						x: packet.pos.x * 32,
						y: packet.pos.y * 32,
						z: packet.pos.z * 32,
						yaw: yaw,
						pitch: pitch,
						onGround: packet.onGround
					});
					client.write('entity_head_rotation', {
						entityId: packet.id,
						headYaw: yaw
					});
				}

				this.entities[packet.id] = {
					id: packet.id,
					type: -1,
					special: packet.name && packet.name.includes(' '),
					pos: {x: packet.pos.x * 32, y: packet.pos.y * 32, z: packet.pos.z * 32},
					yaw: yaw,
					pitch: pitch,
					metadata: entity ? entity.metadata : {},
					equipment: entity ? entity.equipment : {},
					spawned: entity ? entity.spawned : false,
					name: packet.name
				};

				this.check(this.entities[packet.id]);
			}
		});
		ClientSocket.on('CPacketSpawnExperienceOrb', packet => client.write('spawn_entity_experience_orb', {
			entityId: packet.id,
			x: packet.x,
			y: packet.y,
			z: packet.z,
			count: packet.xpValue
		}));
		ClientSocket.on('CPacketDestroyEntities', packet => {
			for (const id of packet.ids) delete this.entities[id];
			client.write('entity_destroy', {
				entityIds: packet.ids
			});
		});
		ClientSocket.on('CPacketAnimation', packet => client.write('animation', {
			entityId: this.convertId(packet.id),
			animation: packet.type
		}));
		ClientSocket.on('CPacketEntityAction', packet => {
			const entity = this.entities[packet.id];
			if (packet.punching) {
				client.write('animation', {
					entityId: packet.id,
					animation: 0
				});
			}

			if (entity && packet.sneak != undefined) {
				entity.sneaking = packet.sneak;
				entity.metadata[0].value = entity.sneaking ? (entity.metadata[0].value | 1 << 1) : (entity.metadata[0].value & ~(1 << 1));
				client.write('entity_metadata', {
					entityId: packet.id,
					metadata: [{key: 0, value: entity.metadata[0].value, type: 0}]
				});
			}
		});
		ClientSocket.on('CPacketEntityEquipment', packet => {
			const entity = this.entities[packet.id];

			for (const equip of packet.equipment) {
				if (equip.slot == 2) continue;
				const slot = equip.slot == 1 ? 0 : 7 - equip.slot, item = translateItem(equip.item);
				if (entity) entity.equipment[slot] = item;
				client.write('entity_equipment', {
					entityId: packet.id,
					slot: slot,
					item: item
				});
			}
		});
		ClientSocket.on('CPacketEntityMetadata', packet => {
			const entity = this.entities[packet.id];
			let props = [];

			for (const watched of packet.data) {
				let value;
				let wType = watched.objectType;
				switch (watched.objectType) {
					case 2:
						value = watched.intValue;
						if (watched.dataValueId != 7 && (watched.dataValueId != 18 || entity && entity.type != -1)) {
							wType = 0;
							value = watched.dataValueId == 10 ? 127 : convertToByte(watched.intValue);
							if (watched.dataValueId == 0 && entity) value = entity.sneaking ? (value | 1 << 1) : (value & ~(1 << 1));
						}
						if (entity && entity.type == 21) {
							if (watched.dataValueId == 17 || watched.dataValueId == 18) {
								wType = watched.objectType;
								value = watched.intValue;
							} else if (watched.dataValueId == 19) {
								wType = 3;
								value = watched.floatValue ?? watched.intValue;
							}
						}
						if (watched.dataValueId == 1) {
							wType = 1;
							value = watched.intValue;
						}
						break;
					case 3:
						value = watched.floatValue;
						break;
					case 4:
						value = watched.stringValue;
						break;
					case 5:
						value = translateItem(watched.itemStack);
						break;
					case 6:
						value = watched.blockPos;
						break;
					case 7:
						value = new Vector3(watched.vector.x, watched.vector.y, watched.vector.z);
						break;
					default:
						value = watched.intValue;
						break;
				}
				props.push({key: watched.dataValueId, value: value, type: wType});
			}

			if (entity) {
				for (const prop of props) {
					entity.metadata[prop.key] = prop;
				}
			}
			client.write('entity_metadata', {
				entityId: this.convertId(packet.id),
				metadata: props
			});
		});
		ClientSocket.on('CPacketEntityPositionAndRotation', packet => {
			const entity = this.entities[packet.id];
			if (!entity) return;
			entity.pos = {x: packet.pos.x, y: packet.pos.y, z: packet.pos.z};
			entity.yaw = convertAngle(packet.yaw, false, entity.type == -1 ? 180 : 0);
			entity.pitch = convertAngle(packet.pitch);

			client.write('entity_teleport', {
				entityId: entity.id,
				x: entity.pos.x,
				y: entity.pos.y,
				z: entity.pos.z,
				yaw: entity.yaw,
				pitch: entity.pitch,
				onGround: packet.onGround
			});
			client.write('entity_head_rotation', {
				entityId: entity.id,
				headYaw: entity.yaw
			});
		});
		ClientSocket.on('CPacketEntityRelativePositionAndRotation', packet => {
			const entity = this.entities[packet.id];
			const yaw = packet.yaw != undefined ? convertAngle(packet.yaw, false, (!entity || entity.type == -1) ? 180 : 0) : 0;
			const pitch = packet.pitch != undefined ? convertAngle(packet.pitch) : 0;
			if (entity) {
				if (packet.yaw != undefined || packet.pitch != undefined) {
					entity.yaw = yaw;
					entity.pitch = pitch;
				}

				if (packet.pos) {
					const pos = entity.pos;
					entity.pos = {x: pos.x + packet.pos.x, y: pos.y + packet.pos.y, z: pos.z + packet.pos.z};

					if (clampByte(packet.pos.x) != packet.pos.x || clampByte(packet.pos.y) != packet.pos.y || clampByte(packet.pos.z) != packet.pos.z) {
						client.write('entity_teleport', {
							entityId: entity.id,
							x: entity.pos.x,
							y: entity.pos.y,
							z: entity.pos.z,
							yaw: entity.yaw,
							pitch: entity.pitch,
							onGround: packet.onGround
						});

						client.write('entity_head_rotation', {
							entityId: entity.id,
							headYaw: entity.yaw
						});

						return;
					}
				}
			}

			if (packet.pos && (packet.yaw != undefined || packet.pitch != undefined)) {
				client.write('entity_move_look', {
					entityId: packet.id,
					dX: clampByte(packet.pos.x),
					dY: clampByte(packet.pos.y),
					dZ: clampByte(packet.pos.z),
					yaw: yaw,
					pitch: pitch,
					onGround: packet.onGround
				});
			} else if (packet.pos) {
				client.write('rel_entity_move', {
					entityId: packet.id,
					dX: clampByte(packet.pos.x),
					dY: clampByte(packet.pos.y),
					dZ: clampByte(packet.pos.z),
					onGround: packet.onGround
				});
			} else {
				client.write('entity_look', {
					entityId: packet.id,
					yaw: yaw,
					pitch: pitch,
					onGround: packet.onGround
				});
			}

			if (packet.yaw) {
				client.write('entity_head_rotation', {
					entityId: packet.id,
					headYaw: yaw
				});
			}
		});
		ClientSocket.on('CPacketEntityStatus', packet => client.write('entity_status', {
			entityId: this.convertId(packet.entityId),
			entityStatus: packet.entityStatus
		}));
		ClientSocket.on('CPacketEntityVelocity', packet => client.write('entity_velocity', {
			entityId: this.convertId(packet.id),
			velocityX: Math.max(Math.min(packet.motion.x * 8000, 32767), -32768),
			velocityY: Math.max(Math.min(packet.motion.y * 8000, 32767), -32768),
			velocityZ: Math.max(Math.min(packet.motion.z * 8000, 32767), -32768)
		}));
		ClientSocket.on('CPacketEntityEffect', packet => client.write('entity_effect', {
			entityId: this.convertId(packet.id),
			effectId: packet.effectId,
			amplifier: packet.amplifier,
			duration: packet.duration,
			hideParticles: !packet.hideParticles
		}));
		ClientSocket.on('CPacketRemoveEntityEffect', packet => client.write('remove_entity_effect', {
			entityId: this.convertId(packet.id),
			effectId: packet.effectId
		}));
		ClientSocket.on('CPacketEntityAttach', packet => client.write('attach_entity', {
			entityId: this.convertId(packet.entity),
			vehicleId: this.convertId(packet.vehicle),
			leash: packet.leash != 0
		}));

		// LOCAL
		ClientSocket.on('CPacketPlayerPosition', packet => {
			this.local.pos = {x: packet.x, y: packet.y, z: packet.z};
			this.teleport = this.local.pos;
			client.write('position', {
				x: packet.x,
				y: packet.y,
				z: packet.z,
				yaw: 0,
				pitch: 0,
				flags: 24
			});
		});
		ClientSocket.on('CPacketPlayerPosLook', packet => {
			if (isNaN(packet.x) || isNaN(packet.y) || isNaN(packet.z) || isNaN(packet.yaw) || isNaN(packet.pitch)) {
				client.end('Received invalid player position and look packet');
				return
			}

			this.local.pos = {x: packet.x, y: packet.y, z: packet.z};
			this.teleport = this.local.pos;
			client.write('position', {
				x: packet.x,
				y: packet.y,
				z: packet.z,
				yaw: (((packet.yaw * -1) * RAD2DEG) - 180),
				pitch: (packet.pitch * -1) * RAD2DEG,
				flags: 0
			});
		});
		ClientSocket.on('CPacketPlayerReconciliation', packet => {
			if (packet.reset) {
				this.local.inputSequenceNumber = 0;
				this.local.pos = {x: packet.x, y: packet.y, z: packet.z};
				this.teleport = this.local.pos;
				client.write('position', {
					x: packet.x,
					y: packet.y,
					z: packet.z,
					yaw: 0,
					pitch: 0,
					flags: 24
				});
			}
		});
		ClientSocket.on('CPacketRespawn', packet => {
			if (packet.client) {
				ClientSocket.sendPacket(new SPacketRespawn$1);
				client.write('respawn', {
					dimension: packet.dimension,
					difficulty: 2,
					gamemode: 2,
					levelType: 'FLAT'
				});
			}
		});
		ClientSocket.on('CPacketUpdateHealth', packet => {
			if (packet.id == this.local.id) {
				this.local.health = {
					health: packet.hp ?? this.local.health.health,
					food: packet.food ?? this.local.health.food,
					foodSaturation: packet.foodSaturation ?? this.local.health.foodSaturation
				};
				client.write('update_health', this.local.health);
			}
		});
		ClientSocket.on('CPacketUpdateStatus', packet => {
			if (packet.mode) {
				if (packet.id == this.local.id) {
					client.write('game_state_change', {reason: 3, gameMode: GAMEMODES[packet.mode ?? 'survival']});
				} else {
					this.gamemodes[packet.id] = GAMEMODES[packet.mode ?? 'survival'];
					if (tablist.entries[packet.id]) {
						tablist.tabs[packet.id].gamemode = this.gamemodes[packet.id];
						client.write('player_info', {
							action: 1,
							data: [{UUID: tablist.entries[packet.id], gamemode: this.gamemodes[packet.id]}]
						});
					}

					this.check(this.entities[packet.id]);
				}
			}
		});
		ClientSocket.on('CPacketSetExperience', packet => client.write('experience', {
			experienceBar: packet.experience,
			level: packet.level,
			totalExperience: packet.experienceTotal
		}));
	}
	minecraft(mcClient) {
		client = mcClient;
		client.on('flying', ({ onGround } = {}) => {
			if (this.local.id < 0) return;
			this.actions();
			ClientSocket.sendPacket(new SPacketPlayerPosLook({onGround: onGround}));
			this.abilities();
		});
		client.on('position', ({ x, y, z, onGround } = {}) => {
			if (this.local.id < 0) return;
			this.local.pos = {x: x, y: y, z: z};
			this.actions();
			ClientSocket.sendPacket(new SPacketPlayerPosLook({
				pos: this.local.pos,
				onGround: onGround
			}));
			this.abilities(true);
		});
		client.on('look', ({ yaw, pitch, onGround } = {}) => {
			if (this.local.id < 0) return;
			this.local.yaw = ((yaw * -1) - 180) * DEG2RAD;
			this.local.pitch = (pitch * -1) * DEG2RAD;
			this.actions();
			ClientSocket.sendPacket(new SPacketPlayerPosLook({
				yaw: this.local.yaw,
				pitch: this.local.pitch,
				onGround: onGround
			}));
			this.abilities();
		});
		client.on('position_look', ({ x, y, z, onGround, yaw, pitch } = {}) => {
			if (this.local.id < 0) return;
			this.local.pos = {x: x, y: y, z: z};
			this.local.yaw = ((yaw * -1) - 180) * DEG2RAD;
			this.local.pitch = (pitch * -1) * DEG2RAD;
			this.actions();
			ClientSocket.sendPacket(new SPacketPlayerPosLook({
				pos: this.local.pos,
				yaw: this.local.yaw,
				pitch: this.local.pitch,
				onGround: onGround
			}));
			this.abilities(true);
		});
		client.on('steer_vehicle', ({ sideways, forward, jump } = {}) => {
			this.local.inputSequenceNumber++;
			ClientSocket.sendPacket(new SPacketPlayerInput({
				sequenceNumber: this.local.inputSequenceNumber,
				left: sideways > 0,
				right: sideways < 0,
				up: forward > 0,
				down: forward < 0,
				yaw: this.local.yaw,
				pitch: this.local.pitch,
				jump: (jump & 1) > 0,
				sneak: (jump & 2) > 0,
				sprint: this.local.state[1] ?? false,
				pos: this.local.pos
			}));
		});
		client.on('held_item_slot', packet => ClientSocket.sendPacket(new SPacketHeldItemChange({slot: packet.slotId ?? 0})));
		client.on('arm_animation', () => {
			if (!world.breaking) ClientSocket.sendPacket(new SPacketClick({}));
			this.local.state[0] = Date.now() + 300;
		});
		client.on('entity_action', packet => {
			switch (packet.actionId) {
				case 0:
					this.local.state[2] = true;
					break;
				case 1:
					this.local.state[2] = false;
					break;
				case 2:
					ClientSocket.sendPacket(new SPacketEntityAction({
						id: this.local.id,
						stopSleeping: true
					}));
					break;
				case 3:
					this.local.state[1] = true;
					break;
				case 4:
					this.local.state[1] = false;
					break;
			}
		});
		client.on('use_entity', packet => {
			if (packet.target != undefined && this.entities[packet.target]) {
				ClientSocket.sendPacket(new SPacketUseEntity({
					id: packet.target,
					action: packet.mouse,
					hitVec: new PBVector3(clampToBox(this.local.pos, this.entities[packet.target].pos))
				}));
			}
		});
		client.on('client_command', packet => {
			if (packet.payload == 0) {
				ClientSocket.sendPacket(new SPacketRespawn$1);
			}
		});
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
		this.entities = {};
		this.skins = {};
		this.gamemodes = {};
		this.local = {
			id: -1,
			mcId: 99999,
			inputSequenceNumber: 0,
			yaw: 0,
			pitch: 0,
			pos: {x: 0, y: 0, z: 0},
			state: [],
			lastState: [],
			health: {hp: 20, food: 20, foodSaturation: 20},
		};
	}
	obtainHandlers(handlers) {
		tablist = handlers.tablist;
		world = handlers.world;
	}
};

module.exports = new self();
