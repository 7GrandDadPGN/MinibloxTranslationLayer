const Handler = require('./../handler.js');
const { ClientSocket, SPacketPlayerPosLook, SPacketPlayerInput, SPacketEntityAction, SPacketPlayerAbilities, SPacketHeldItemChange, SPacketClick, SPacketRespawn$1, SPacketUseEntity, PBVector3 } = require('./../../main.js');
const ENTITIES = require('./../../types/entities.js');
const GAMEMODES = require('./../../types/gamemodes.js');
const { translateItem } = require('./../../utils.js');
const EntityPlayerMP = require('../../../base/translation/classes/entities/player/entityplayermp.js');
const EntityPlayer = require('../../../base/translation/classes/entities/player/entityplayer.js');
const EntityLivingBase = require('../../../base/translation/classes/entities/entitylivingbase.js');
const SKINS = require('../../types/skins.js');
const EntityXPOrb = require('../../../base/translation/classes/entities/objects/entityxporb.js');
const DEG2RAD = Math.PI / 180, RAD2DEG = 180 / Math.PI;
let client, tablist, world, MCHandler;

function convertAngle(ang, ignore, num) {
	if (!ignore) ang = ang / 256 * Math.PI * 2;
	ang = (((ang * -1) * RAD2DEG) - (num != undefined ? num : 0));
	return ang;
};

function clampToBox(pos, box) {
	return {
		x: Math.min(Math.max(pos.x, box.x - 0.4), box.x + 0.4),
		y: Math.min(Math.max(pos.y + 1.62, box.y - 0.1), box.y + 1.9),
		z: Math.min(Math.max(pos.z, box.z - 0.4), box.z + 0.4)
	};
};

function convertToByte(num) {
	num &= 0xFF;
	num = num > 127 ? num - 256 : num;
	return num;
};

const self = class EntityHandler extends Handler {
	updateGamemode(id, gamemode) {
		this.gamemodes[id.toString()] = GAMEMODES[gamemode ?? 'survival'];
		MCHandler.tablist.updateGamemode(id.toString(), GAMEMODES[gamemode ?? 'survival']);

		if (id == MCHandler.local.index) {
			client.write('game_state_change', {
				reason: 3,
				gameMode: GAMEMODES[gamemode ?? 'survival']
			});
		}
	}
	updatePunching() {
		const state = this.punchTick > Date.now();
		if (state != this.punching) {
			this.punching = state;
			ClientSocket.sendPacket(new SPacketEntityAction({
				id: MCHandler.local.index,
				punching: this.punching
			}));
		}
	}
	sendInput() {
		if (this.input == undefined) return;

		this.inputSequenceNumber++;
		ClientSocket.sendPacket(new SPacketPlayerInput({
			sequenceNumber: this.inputSequenceNumber,
			left: this.input.sideways > 0,
			right: this.input.sideways < 0,
			up: this.input.forward > 0,
			down: this.input.forward < 0,
			yaw: ((MCHandler.local.yaw * -1) - 180) * DEG2RAD,
			pitch: (MCHandler.local.pitch * -1) * DEG2RAD,
			jump: this.input.jump,
			sneak: this.input.sneak,
			sprint: this.input.isSprinting ?? false,
			pos: MCHandler.local.pos,
			ackId: this.lastServerAckId > 0 ? this.lastServerAckId : undefined,
			onGround: this.input.onGround,
			usingItem: false
		}));

		this.input = undefined;
	}
	miniblox() {
		// UNIVERSAL
		ClientSocket.on('CPacketSpawnEntity', packet => {
			if (ENTITIES[packet.type] == undefined) return;

			const entity = MCHandler.world.getEntity(packet.id);
			if (entity != undefined) {
				MCHandler.world.removeEntity(packet.id);
			}

			const newEntity = MCHandler.world.addEntity(packet.id, new ENTITIES[packet.type](packet.id));
			if (packet.shooterId != undefined) {
				const shooter = MCHandler.world.getEntity(packet.shooterId, false, true);

				if (shooter != undefined) {
					newEntity.shooterId = shooter.minecraftId;
				}
			}

			if (packet.motion != undefined) {
				newEntity.setVelocity(packet.motion);
			}

			newEntity.moveEntity({
				x: packet.pos.x / 32,
				y: packet.pos.y / 32,
				z: packet.pos.z / 32
			}, {
				yaw: convertAngle(packet.yaw, true, entity instanceof EntityLivingBase ? 0 : 180),
				pitch: convertAngle(packet.pitch, true)
			}, packet.onGround);
		});

		ClientSocket.on('CPacketSpawnPlayer', packet => {
			const yaw = convertAngle(packet.yaw, true, 180), pitch = convertAngle(packet.pitch, true);
			const entity = MCHandler.world.getEntity(packet.id);
			if (entity != undefined) {
				MCHandler.world.removeEntity(packet.id);
			}

			this.updateGamemode(packet.id, packet.gamemode);
			if (packet.socketId == ClientSocket.id) {
				MCHandler.local.pos = {x: packet.pos.x, y: packet.pos.y, z: packet.pos.z};
				MCHandler.local.index = packet.id;
				MCHandler.local.spawn();

				client.write('position', {
					x: packet.pos.x,
					y: packet.pos.y,
					z: packet.pos.z,
					yaw: yaw,
					pitch: pitch,
					flags: 0
				});

				MCHandler.world.update(MCHandler.local.pos);
			} else {
				const entity = MCHandler.world.addEntity(packet.id, new EntityPlayerMP(packet.id));
				if (packet.name && packet.name.includes(' ') || packet.socketId.includes('bot')) {
					entity.bot = {};
				}

				if (SKINS[packet.cosmetics.skin] != undefined) {
					this.skins[packet.id.toString()] = packet.cosmetics.skin;
					MCHandler.tablist.updateSkin(packet.id.toString(), SKINS[packet.cosmetics.skin]);
				}

				entity.moveEntity({
					x: packet.pos.x,
					y: packet.pos.y,
					z: packet.pos.z
				}, {
					yaw: yaw,
					pitch: pitch
				}, packet.onGround);
			}
		});

		ClientSocket.on('CPacketSpawnExperienceOrb', packet => {
			const entity = MCHandler.world.getEntity(packet.id);
			if (entity != undefined) {
				MCHandler.world.removeEntity(packet.id);
			}

			const newEntity = MCHandler.world.addEntity(packet.id, new EntityXPOrb(packet.id));
			newEntity.count = packet.xpValue;
			newEntity.moveEntity({
				x: packet.x / 32,
				y: packet.y / 32,
				z: packet.z / 32
			}, undefined, false);
		});

		ClientSocket.on('CPacketDestroyEntities', packet => MCHandler.world.removeEntities(packet.ids));

		ClientSocket.on('CPacketAnimation', packet => {
			const entity = MCHandler.world.getEntity(packet.id, false, true);
			if (entity) {
				entity.playAnimation(packet.type);
			}
		});

		ClientSocket.on('CPacketEntityAction', packet => {
			const entity = MCHandler.world.getEntity(packet.id, false, true);
			if (entity) {
				if (packet.id != MCHandler.local.index) {
					if (packet.punching != undefined) {
						entity.punching = packet.punching;
						if (packet.punching) entity.playAnimation(0);
					}

					if (packet.sneak != undefined) {
						entity.sneaking = packet.sneak;
						entity.dataWatcher.updateObject(0, entity.sneaking ? (entity.dataWatcher.getObject(0) | 1 << 1) : (entity.dataWatcher.getObject(0) & ~(1 << 1)));
					}
				}
			}
		});

		ClientSocket.on('CPacketEntityEquipment', packet => {
			const entity = MCHandler.world.getEntity(packet.id, false, true);
			if (entity) {
				for (const equipment of packet.equipment) {
					if (equipment.slot == 2) continue;

					entity.updateEquipment(equipment.slot == 1 ? 0 : 7 - equipment.slot, translateItem(equipment.item));
				}
			}
		});

		ClientSocket.on('CPacketEntityMetadata', packet => {
			const entity = MCHandler.world.getEntity(packet.id, false, true);
			if (entity) {
				for (const obj of packet.data) {
					let value;
					let wType = obj.objectType;

					switch (obj.objectType) {
						case 2:
							value = obj.intValue;

							if (obj.dataValueId != 7 && (obj.dataValueId != 18 || entity instanceof EntityPlayer)) {
								wType = 0;
								value = obj.dataValueId == 10 ? 127 : convertToByte(obj.intValue);
								if (obj.dataValueId == 0) {
									value = entity.sneaking ? (value | 1 << 1) : (value & ~(1 << 1));
									value = entity.fire ? (value | 1 << 0) : (value & ~(1 << 0));
								}
							}

							if (entity.type == 21) {
								if (obj.dataValueId == 17 || obj.dataValueId == 18) {
									wType = obj.objectType;
									value = obj.intValue;
								} else if (obj.dataValueId == 19) {
									wType = 3;
									value = obj.floatValue ?? obj.intValue;
								}
							}

							if (obj.dataValueId == 1) {
								wType = 1;
								value = obj.intValue;
							}

							break;
						case 3:
							value = obj.floatValue;
							break;
						case 4:
							value = obj.stringValue;
							break;
						case 5:
							value = translateItem(obj.itemStack);
							break;
						case 6:
							value = obj.blockPos;
							break;
						case 7:
							value = {x: obj.vector.x, y: obj.vector.y, z: obj.vector.z};
							break;
						default:
							value = obj.intValue;
							break;
					}

					entity.dataWatcher.updateObject(obj.dataValueId, value, true);
				}

				entity.dataWatcher.updateAll();
			}
		});

		ClientSocket.on('CPacketEntityProperties', packet => {
			const entity = MCHandler.world.getEntity(packet.id);
			if (entity && entity.attributeMap != undefined) {
				entity.updateAttributes(packet.data.map((prop) => {
					return {
						key: prop.id,
						value: prop.value,
						modifiers: prop.modifiers.map((modifier) => {
							return {
								UUID: crypto.randomUUID(),
								amount: modifier.amount,
								operation: modifier.operation
							};
						})
					};
				}));
			}
		});

		ClientSocket.on('CPacketEntityEffect', packet => {
			const entity = MCHandler.world.getEntity(packet.id, false, true);
			if (entity && entity.activePotionsMap != undefined) {
				entity.addPotionEffect({
					effectId: packet.effectId,
					amplifier: packet.amplifier,
					duration: Date.now() + (packet.duration * 50),
					hideParticles: packet.hideParticles
				});
			}
		});

		ClientSocket.on('CPacketRemoveEntityEffect', packet => {
			const entity = MCHandler.world.getEntity(packet.id, false, true);
			if (entity && entity.activePotionsMap != undefined) {
				entity.removePotionEffect(packet.effectId);
			}
		});

		ClientSocket.on('CPacketEntityPositionAndRotation', packet => {
			const entity = MCHandler.world.getEntity(packet.id);
			if (!entity) return;

			entity.moveEntity({
				x: packet.pos.x / 32,
				y: packet.pos.y / 32,
				z: packet.pos.z / 32
			}, {
				yaw: convertAngle(packet.yaw, false, (entity instanceof EntityLivingBase && !(entity instanceof EntityPlayer)) ? 0 : 180),
				pitch: convertAngle(packet.pitch)
			}, packet.onGround);
		});

		ClientSocket.on('CPacketEntityRelativePositionAndRotation', packet => {
			const entity = MCHandler.world.getEntity(packet.id);
			if (!entity) return;

			entity.moveEntity(packet.pos != undefined ? {
				x: packet.pos.x / 32,
				y: packet.pos.y / 32,
				z: packet.pos.z / 32,
				add: true
			} : undefined, (packet.yaw != undefined || packet.pitch != undefined) ? {
				yaw: packet.yaw != undefined ? convertAngle(packet.yaw, false, (entity instanceof EntityLivingBase && !(entity instanceof EntityPlayer)) ? 0 : 180) : entity.yaw,
				pitch: packet.pitch != undefined ? convertAngle(packet.pitch) : entity.pitch
			} : undefined, packet.onGround);
		});

		ClientSocket.on('CPacketEntityStatus', packet => {
			const entity = MCHandler.world.getEntity(packet.entityId, false, true);
			if (entity) {
				entity.setEntityState(packet.entityStatus);
			}
		});

		ClientSocket.on('CPacketEntityVelocity', packet => {
			const entity = MCHandler.world.getEntity(packet.id, false, true);
			if (entity) {
				entity.setVelocity(packet.motion);
			}
		});

		ClientSocket.on('CPacketExplosion', packet => client.write('explosion', {
			x: packet.pos.x,
			y: packet.pos.y,
			z: packet.pos.z,
			radius: packet.strength,
			affectedBlockOffsets: [],
			playerMotionX: packet.playerPos.x,
			playerMotionY: packet.playerPos.y,
			playerMotionZ: packet.playerPos.z
		}));

		this.punchLoop = setInterval(() => {
			if (MCHandler.world != undefined) {
				for (const entity of Object.values(MCHandler.world.entities)) {
					if (entity.punching) {
						entity.playAnimation(0);
					}
				}
			}
		}, 100);

		// LOCAL
		ClientSocket.on('CPacketPlayerPosition', packet => {
			MCHandler.local.pos = {x: packet.x, y: packet.y, z: packet.z};
			MCHandler.world.update(MCHandler.local.pos);

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
				return;
			}

			MCHandler.local.pos = {x: packet.x, y: packet.y, z: packet.z};
			MCHandler.world.update(MCHandler.local.pos);

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
			if (packet.ackId != null) {
				this.transactionNumber = (this.transactionNumber - 1) % 32767;
				this.transactions[this.transactionNumber] = packet.ackId;

				client.write('transaction', {
					windowId: 0,
					action: this.transactionNumber,
					accepted: false
				});
			}

			if (packet.reset) {
				this.inputSequenceNumber = 0;
				MCHandler.local.pos = {x: packet.x, y: packet.y, z: packet.z};

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
			} else {
				this.health = {
					health: 20,
					food: 20,
					foodSaturation: 20
				};

				client.write('respawn', {
					dimension: packet.dimension,
					difficulty: 2,
					gamemode: 2,
					levelType: 'FLAT'
				});
			}
		});

		ClientSocket.on('CPacketUpdateHealth', packet => {
			if (packet.id == MCHandler.local.index) {
				this.health = {
					health: packet.hp ?? this.health.health,
					food: packet.food ?? this.health.food,
					foodSaturation: packet.foodSaturation ?? this.health.foodSaturation
				};

				client.write('update_health', this.health);
			}
		});

		ClientSocket.on('CPacketUpdateStatus', packet => {
			if (packet.mode) {
				this.updateGamemode(packet.id, packet.mode);
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
			if (MCHandler.world == undefined) return;
			MCHandler.local.onGround = onGround;

			this.sendInput();
			this.updatePunching();
			ClientSocket.sendPacket(new SPacketPlayerPosLook({onGround: onGround}));
		});

		client.on('position', ({ x, y, z, onGround } = {}) => {
			if (MCHandler.world == undefined) return;
			this.sendInput();
			MCHandler.local.pos = {x: x, y: y, z: z};
			MCHandler.local.onGround = onGround;
			MCHandler.world.update(MCHandler.local.pos);

			this.updatePunching();
			ClientSocket.sendPacket(new SPacketPlayerPosLook({
				pos: MCHandler.local.pos,
				onGround: onGround
			}));
		});

		client.on('look', ({ yaw, pitch, onGround } = {}) => {
			if (MCHandler.world == undefined) return;
			MCHandler.local.yaw = yaw;
			MCHandler.local.pitch = pitch;
			MCHandler.local.onGround = onGround;

			this.sendInput();
			this.updatePunching();
			ClientSocket.sendPacket(new SPacketPlayerPosLook({
				yaw: ((MCHandler.local.yaw * -1) - 180) * DEG2RAD,
				pitch: (MCHandler.local.pitch * -1) * DEG2RAD,
				onGround: onGround
			}));
		});

		client.on('position_look', ({ x, y, z, onGround, yaw, pitch } = {}) => {
			if (MCHandler.world == undefined) return;
			MCHandler.local.yaw = yaw;
			MCHandler.local.pitch = pitch;
			this.sendInput();

			MCHandler.local.pos = {x: x, y: y, z: z};
			MCHandler.local.onGround = onGround;
			MCHandler.world.update(MCHandler.local.pos);

			this.updatePunching();
			ClientSocket.sendPacket(new SPacketPlayerPosLook({
				pos: MCHandler.local.pos,
				yaw: ((MCHandler.local.yaw * -1) - 180) * DEG2RAD,
				pitch: (MCHandler.local.pitch * -1) * DEG2RAD,
				onGround: onGround
			}));
		});

		client.on('custom_payload', ({ channel, data } = {}) => {
			if (channel == 'miniblox:movepacket') {
				if (MCHandler.world == undefined) return;

				MCHandler.local.pos = {x: data.readDoubleBE(0), y: data.readDoubleBE(8), z: data.readDoubleBE(16)};
				MCHandler.local.yaw = data.readFloatBE(24);
				MCHandler.local.pitch = data.readFloatBE(28);

				this.input = {
					forward: data.readFloatBE(32),
					sideways: data.readFloatBE(36),
					jump: data.readUInt8(40) > 0,
					sneak: data.readUInt8(41) > 0,
					onGround: data.readUInt8(42) > 0,
					isSprinting: this.isSprinting
				};

				this.sendInput();
			}
		});

		client.on('steer_vehicle', ({ sideways, forward, jump } = {}) => {
			if (MCHandler.world == undefined) return;

			this.input = {
				forward: forward,
				sideways: sideways,
				jump: (jump & 1) > 0,
				sneak: (jump & 2) > 0,
				onGround: MCHandler.local.onGround ?? false,
				isSprinting: this.isSprinting
			};
		});

		client.on('held_item_slot', packet => ClientSocket.sendPacket(new SPacketHeldItemChange({slot: packet.slotId ?? 0})));

		client.on('arm_animation', () => {
			if (!world.breaking) ClientSocket.sendPacket(new SPacketClick({}));
			this.punchTick = Date.now() + 150;
		});

		client.on('entity_action', packet => {
			if (MCHandler.world == undefined) return;
			switch (packet.actionId) {
				case 0:
				case 1:
					this.isSneaking = packet.actionId == 0;
					ClientSocket.sendPacket(new SPacketEntityAction({
						id: MCHandler.local.index,
						sneak: this.isSneaking
					}));
					break;
				case 2:
					ClientSocket.sendPacket(new SPacketEntityAction({
						id: MCHandler.local.index,
						stopSleeping: true
					}));
					break;
				case 3:
				case 4:
					this.isSprinting = packet.actionId == 3;
					ClientSocket.sendPacket(new SPacketEntityAction({
						id: MCHandler.local.index,
						sprinting: this.isSprinting
					}));
					break;
			}
		});

		client.on('use_entity', packet => {
			if (MCHandler.world == undefined) return;
			const entity = packet.target != undefined && MCHandler.world.getEntity(packet.target, true, true);

			if (entity != undefined) {
				ClientSocket.sendPacket(new SPacketUseEntity({
					id: entity.index,
					action: packet.mouse,
					hitVec: new PBVector3(clampToBox(MCHandler.local.pos, entity.pos)),
					yaw: packet.mouse == 1 ? ((MCHandler.local.yaw * -1) - 180) * DEG2RAD : undefined,
					pitch: packet.mouse == 1 ? (MCHandler.local.pitch * -1) * DEG2RAD : undefined,
					sequence: packet.mouse == 1 ? this.inputSequenceNumber : undefined
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
		if (this.punchLoop != undefined) {
			clearInterval(this.punchLoop);
			this.punchLoop = undefined;
		}

		this.input = undefined;
		this.skins = {};
		this.gamemodes = {};
		this.inputSequenceNumber = 0;
		this.lastServerAckId = 0;
		this.transactions = {};
		this.transactionNumber = 0;
		this.punchTick = 0;
		this.punching = false;
		this.health = {hp: 20, food: 20, foodSaturation: 20};
	}
	obtainHandlers(handlers, mchandler) {
		tablist = handlers.tablist;
		world = handlers.world;
		MCHandler = mchandler;
	}
};

module.exports = new self();
