const { ClientSocket, SPacketMessage, SPacketLoginStart, SPacketPlayerPosLook, SPacketHeldItemChange, SPacketCloseWindow, SPacketRequestChunk, SPacketAnalytics, SPacketRespawn$1, SPacketPing, PBVector3, SPacketUseEntity, SPacketClick, SPacketEntityAction, PBBlockPos, SPacketPlaceBlock, SPacketPlayerAction, SPacketUseItem, SPacketBreakBlock, SPacketClickWindow, SPacketConfirmTransaction, Vector3, SPacketTabComplete$1, SPacketPlayerAbilities } = require('./miniblox/main.js');
const { convertToByte, convertAngle, clampToBox, convertServerPos, createChunk, getBlockIndex, translateItem, translateItemBack, translateText } = require('./miniblox/utils.js');
const BLOCKS = require('./miniblox/blocks.js');
const ENTITIES = require('./miniblox/entities.js');
const SKINS = require('./miniblox/skins.js');
const GUIS = require('./miniblox/guis.js');
const mc = require('minecraft-protocol');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});
const fs = require('node:fs');
const server = mc.createServer({
	'online-mode': false,
	motd: '\u00a76' + ' '.repeat(14) + 'Miniblox Translation Layer \u00a7c[1.8]\n\u00a7a' + ' '.repeat(21) + 'Made by 7GrandDad',
	favicon: 'data:image/png;base64,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',
	maxPlayers: 1,
	keepAlive: false,
	version: '1.8.9'
});

let openShop = "";
let recaptcha = "";
let connected = false;
let clientId = -1;
let mcClientId = 99999;
let scoreData = [];

let chunks = [];
let queuedChunks = [];

let entities = {};
let playerUUIDs = {};
let playerSkins = {};

let pingInterval, analyticsInterval;
let filteredPing = 0;
let ignoreInventory = false;
let skipKick = Date.now();
let lPosition = {x: 0, y: 0, z: 0};
let lStates = [];
let lastLState = {};
let lastLHP = [];
let lastLFlying;

const GAMEMODES = {"survival": 0, "creative": 1, "adventure": 2, "spectator": 3};
const SLOTS = {
	0: 36,
	1: 37,
	2: 38,
	3: 39,
	4: 40,
	5: 41,
	6: 42,
	7: 43,
	8: 44,
	36: 5,
	37: 6,
	38: 7,
	39: 8
};

const VERSION = "3.35.48", DEG2RAD = Math.PI / 180, RAD2DEG = 180 / Math.PI;
const viewDistance = 7;

function canSpawn(entity) {
	if (entity.type == -1 && ((playerUUIDs[entity.id] == undefined && !entity.special) || playerGamemodes[entity.id] == GAMEMODES.spectator)) return false;
	if (!isEntityLoaded(entity)) return false;
	return true;
}

function checkEntity(entity, client) {
	if (!entity) return;
	if (canSpawn(entity) != entity.spawned) {
		if (entity.spawned) removeEntity(entity, client);
		else spawnEntity(entity, client);
	}
}

function checkEntities(client) {
	for (const [_, entity] of Object.entries(entities)) {
		if (canSpawn(entity) != entity.spawned) {
			if (entity.spawned) removeEntity(entity, client);
			else spawnEntity(entity, client);
		}
	}
}

function disconnect() {
	if (pingInterval) clearInterval(pingInterval);
	if (analyticsInterval) clearInterval(analyticsInterval);
	connected = false;
	clientId = -1;
	scoreData = [];

	chunks = [];
	queuedChunks = [];

	entities = {};
	playerUUIDs = {};
	playerGamemodes = {};
	playerSkins = {};

	ignoreInventory = false;
	lStates = [];
	lastLState = {};
	lastLHP = [];
	lastLFlying = undefined;
}

function isEntityLoaded(entity) {
	return chunks.includes([Math.floor((entity.pos.x / 32) / 16), Math.floor((entity.pos.z / 32) / 16)].join());
}

function purgePlayers(client) {
	let newData = [];
	for (const [_, uuid] of Object.entries(playerUUIDs)) {
		newData.push({"UUID": uuid});
		client.write('scoreboard_team', {
			team: uuid.slice(0, 16),
			mode: 1
		});
	}
	client.write('player_info', {
		action: 4,
		data: newData
	});
}

function spawnEntity(entity, client) {
	if (!entity || entity.spawned) return;

	if (entity.special) {
		playerUUIDs[entity.id] = crypto.randomUUID();
		client.write('player_info', {
			action: 0,
			data: [{
				UUID: playerUUIDs[entity.id],
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
			playerUUID: playerUUIDs[entity.id] ?? crypto.randomUUID(),
			x: entity.pos.x,
			y: entity.pos.y,
			z: entity.pos.z,
			yaw: entity.yaw,
			pitch: entity.pitch,
			currentItem: 0,
			metadata: entity.metadata
		});
		for (const [slot, item] of Object.entries(entity.equipment)) {
			client.write('entity_equipment', {
				entityId: entity.id,
				slot: slot,
				item: item
			});
		}
	} else {
		client.write('spawn_entity', {
			entityId: entity.id,
			type: entity.type,
			x: entity.pos.x,
			y: entity.pos.y,
			z: entity.pos.z,
			yaw: entity.yaw,
			pitch: entity.pitch,
			objectData: entity.objectData
		});
		client.write('entity_metadata', {
			entityId: entity.id,
			metadata: entity.metadata
		});
	}

	if (entity.special) {
		client.write('player_info', {
			action: 4,
			data: [{"UUID": playerUUIDs[entity.id]}]
		});
	}

	return true;
}

async function queue(gamemode, server) {
	if (server) return {ok: true, json: function() { return {serverId: server}; }};
	let fetched
	try {
		fetched = await fetch('https://session.coolmathblox.ca/launch/queue_minigame', {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				clientVersion: VERSION,
				minigameId: gamemode ?? "kitpvp",
				recaptcha: recaptcha
			})
		});
	} catch (exception) {
		fetched = {statusText: "Unable to connect to server"};
	}
	return fetched;
}

function removeEntity(entity, client) {
	if (!entity || !entity.spawned) return;

	entity.spawned = false;
	client.write('entity_destroy', {
		entityIds: [entity.id]
	});
}

function sendActions(client) {
	if (lPosition) updateChunks(lPosition.x, lPosition.z, client);
	if (clientId < 0) return;
	const newStates = {punching: lStates[0] > Date.now(), sprinting: lStates[1] ?? false, sneak: lStates[2] ?? false};
	if (newStates.punching == lastLState.punching && newStates.sprinting == lastLState.sprinting && newStates.sneak == lastLState.sneak) return;
	ClientSocket.sendPacket(new SPacketEntityAction({
		id: clientId,
		punching: newStates.punching != lastLState.punching ? newStates.punching : undefined,
		sprinting: newStates.sprinting != lastLState.sprinting ? newStates.sprinting : undefined,
		sneak: newStates.sneak != lastLState.sneak ? newStates.sneak : undefined
	}));
	lastLState = newStates;
}

function sendAbilities() {
	const newState = false;
	if (newState == lastLFlying) return;
	ClientSocket.sendPacket(new SPacketPlayerAbilities({isFlying: newState}));
	lastLFlying = newState;
}

function updateChunks(x, z, client) {
	const positions = [];
	const currentlyLoaded = [];

	for (let checkX = -viewDistance; checkX < viewDistance; checkX++) {
		for (let checkZ = -viewDistance; checkZ < viewDistance; checkZ++) {
			const pos = [Math.floor(x / 16) + checkX, Math.floor(z / 16) + checkZ];
			currentlyLoaded.push(pos.join());
			if (chunks.includes(pos.join()) || queuedChunks.includes(pos.join())) continue;
			positions.push(pos);
		}
	}

	positions.sort((a, b) => {
		const aDist = Math.sqrt((a[0] - Math.floor(x / 16)) * (a[0] - Math.floor(x / 16)) + (a[1] - Math.floor(z / 16)) * (a[1] - Math.floor(z / 16)));
		const bDist = Math.sqrt((b[0] - Math.floor(x / 16)) * (b[0] - Math.floor(x / 16)) + (b[1] - Math.floor(z / 16)) * (b[1] - Math.floor(z / 16)));
		return bDist - aDist
	});

	for (; positions.length > 0 && queuedChunks.length < 8; ) {
		const chunk = positions.pop();
		queuedChunks.push(chunk.join());
		ClientSocket.sendPacket(new SPacketRequestChunk({
			x: chunk[0],
			z: chunk[1]
		}));
	}

	for (const chunk of chunks) {
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
			chunks.splice(chunks.indexOf(chunk), 1);
		}
	}
}

function uuid$1() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, j => (j ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> j / 4).toString(16))
}

async function connect(client, requeue, gamemode, code) {
	if (requeue) {
		skipKick = Date.now() + 20;
		if (ClientSocket.socket) ClientSocket.disconnect();

		scoreData = [];
		client.write('scoreboard_objective', {
			name: "scoreboard",
			action: 1
		});
		purgePlayers(client);
		client.write('respawn', {
			dimension: 1,
			difficulty: 2,
			gamemode: 2,
			levelType: "FLAT"
		});
		client.write('respawn', {
			dimension: 0,
			difficulty: 2,
			gamemode: 2,
			levelType: "FLAT"
		});
	}

	let fetched = await queue(gamemode, code);
	if (!fetched.ok) {
		const text = await fetched.text();
		client.end(text ?? (fetched.statusText ?? "Disconnected"));
		return;
	}

	fetched = await fetched.json();
	console.log(fetched);
	ClientSocket.setUrl(`https://${fetched.serverId}.servers.coolmathblox.ca`, void 0);
	const gameType = gamemode ?? "kitpvp";
	let session = await fs.readFileSync('login.token', {encoding: 'utf8'});

	// MINIBLOX CONNECTION
	ClientSocket.once("connect", () => {
		ClientSocket.sendPacket(new SPacketLoginStart({
			requestedUuid: void 0,
			session: session,
			hydration: "0",
			metricsId: uuid$1(),
			clientVersion: VERSION
		}));
	});
	ClientSocket.once("CPacketJoinGame", packet => {
		disconnect();
		if (!packet.canConnect) {
			client.end(packet.errorMessage ?? "Disconnected");
			return;
		}

		if (!requeue) {
			client.write('login', {
				entityId: mcClientId,
				gameMode: GAMEMODES[packet.gamemode ?? "survival"],
				dimension: 0,
				difficulty: 2,
				maxPlayers: server.maxPlayers,
				levelType: "default",
				reducedDebugInfo: false
			});
		}

		pingInterval = setInterval(() => {
			client.write('keep_alive', Math.floor(Math.random() * 10000));
		}, 1000);
		analyticsInterval = setInterval(() => {
			ClientSocket.sendPacket(new SPacketAnalytics({
				fps: 60 - Math.random(),
				ping: filteredPing
			}));
		}, 30000);
	});

	// MINIBLOX SERVER
	ClientSocket.on("disconnect", reason => {
		if (skipKick > Date.now()) return;
		client.end(reason);
	});
	ClientSocket.on("CPacketAnimation", packet => {
		client.write('animation', {
			entityId: packet.id == clientId ? mcClientId : packet.id,
			animation: packet.type
		});
	});
	ClientSocket.on("CPacketBlockUpdate", packet => {
		if (!chunks.includes([Math.floor(packet.x / 16), Math.floor(packet.z / 16)].join())) return;
		const blockdata = BLOCKS[packet.id] ?? BLOCKS[9];
		client.write('block_change', {
			location: {
				x: packet.x,
				y: packet.y,
				z: packet.z
			},
			type: (typeof blockdata == 'number' ? blockdata : blockdata[0]) << 4 | (typeof blockdata == 'number' ? 0 : blockdata[1])
		});
	});
	ClientSocket.on("CPacketChunkData", packet => {
		const chunk = createChunk(packet), chunkInd = [packet.x, packet.z].join();
		const ind = queuedChunks.indexOf(chunkInd);
		if (ind != -1) {
			chunks.push(chunkInd);
			queuedChunks.splice(ind, 1);
		}
		client.write('map_chunk', {
			x: packet.x,
			z: packet.z,
			groundUp: true,
			bitMap: chunk.getMask(),
			chunkData: chunk.dump()
		});
		checkEntities(client);
	});
	ClientSocket.on("CPacketCloseWindow", packet => client.write('close_window', {windowId: packet.windowId}));
	ClientSocket.on("CPacketConfirmTransaction", packet => {
		client.write('transaction', {
			windowId: packet.windowId,
			action: packet.uid,
			accepted: packet.accepted
		});
	});
	ClientSocket.on("CPacketDestroyEntities", packet => {
		for (const id of packet.ids) delete entities[id];
		client.write('entity_destroy', {
			entityIds: packet.ids
		});
	});
	ClientSocket.on("CPacketDisconnect", packet => client.end(packet.reason));
	ClientSocket.on("CPacketEntityAction", packet => {
		if (packet.punching) {
			client.write('animation', {
				entityId: packet.id,
				animation: 0
			});
		}
	});
	ClientSocket.on("CPacketEntityEffect", packet => {
		client.write('entity_effect', {
			entityId: packet.id == clientId ? mcClientId : packet.id,
			effectId: packet.effectId,
			amplifier: packet.amplifier,
			duration: packet.duration,
			hideParticles: packet.hideParticles
		});
	});
	ClientSocket.on("CPacketEntityEquipment", packet => {
		for (const equip of packet.equipment) {
			if (equip.slot == 2) continue;
			const slot = equip.slot == 1 ? 0 : 7 - equip.slot, item = translateItem(equip.item);
			if (entities[packet.id]) entities[packet.id].equipment[slot] = item;
			client.write('entity_equipment', {
				entityId: packet.id,
				slot: slot,
				item: item
			});
		}
	});
	ClientSocket.on("CPacketEntityMetadata", packet => {
		let props = [];
		for (const watched of packet.data) {
			let value;
			let wType = watched.objectType;
			switch (watched.objectType) {
				case 2:
					value = watched.intValue;
					if (watched.dataValueId != 7 && watched.dataValueId != 18) {
						wType = 0;
						value = watched.dataValueId == 10 ? 127 : convertToByte(watched.intValue);
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
					value = {
						x: watched.blockPos.x,
						y: watched.blockPos.y,
						z: watched.blockPos.z
					};
					break;
				case 7:
					value = new Vector3(watched.vector.x,watched.vector.y,watched.vector.z);
					break;
				default:
					value = watched.intValue;
					break;
			}
			props.push({key: watched.dataValueId, value: value, type: wType});
		}

		if (entities[packet.id]) entities[packet.id].metadata = props;
		client.write('entity_metadata', {
			entityId: packet.id == clientId ? mcClientId : packet.id,
			metadata: props
		});
	});
	ClientSocket.on("CPacketEntityPositionAndRotation", packet => {
		const entity = entities[packet.id];
		if (entity) {
			entity.pos = {x: packet.pos.x, y: packet.pos.y, z: packet.pos.z};
			entity.yaw = convertAngle(packet.yaw, 180);
			entity.pitch = convertAngle(packet.pitch);
		} else return;
		client.write('entity_teleport', {
			entityId: packet.id,
			x: packet.pos.x,
			y: packet.pos.y,
			z: packet.pos.z,
			yaw: entity.yaw,
			pitch: entity.pitch,
			onGround: packet.onGround
		});
		client.write('entity_head_rotation', {
			entityId: packet.id,
			headYaw: entity.yaw
		});
	});
	ClientSocket.on("CPacketEntityRelPositionAndRotation", packet => {
		const entity = entities[packet.id];
		const yaw = packet.yaw != undefined ? convertAngle(packet.yaw, 180) : 0;
		const pitch = packet.pitch != undefined ? convertAngle(packet.pitch) : 0;
		if (entity) {
			if (packet.yaw != undefined || packet.pitch != undefined) {
				entity.yaw = yaw;
				entity.pitch = pitch;
			}

			if (packet.pos) {
				const pos = entity.pos;
				entity.pos = {x: pos.x + packet.pos.x, y: pos.y + packet.pos.y, z: pos.z + packet.pos.z};
			}
		}

		if (packet.pos && (packet.yaw != undefined || packet.pitch != undefined)) {
			client.write('entity_move_look', {
				entityId: packet.id,
				dX: convertToByte(packet.pos.x),
				dY: convertToByte(packet.pos.y),
				dZ: convertToByte(packet.pos.z),
				yaw: yaw,
				pitch: pitch,
				onGround: packet.onGround
			});
		} else if (packet.pos) {
			client.write('rel_entity_move', {
				entityId: packet.id,
				dX: convertToByte(packet.pos.x),
				dY: convertToByte(packet.pos.y),
				dZ: convertToByte(packet.pos.z),
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
	ClientSocket.on("CPacketEntityStatus", packet => {
		client.write('entity_status', {
			entityId: packet.entityId == clientId ? mcClientId : packet.entityId,
			entityStatus: packet.entityStatus
		});
	});
	ClientSocket.on("CPacketEntityVelocity", packet => {
		client.write('entity_velocity', {
			entityId: packet.id == clientId ? mcClientId : packet.id,
			velocityX: Math.max(Math.min(packet.motion.x * 8000, 32767), -32768),
			velocityY: Math.max(Math.min(packet.motion.y * 8000, 32767), -32768),
			velocityZ: Math.max(Math.min(packet.motion.z * 8000, 32767), -32768)
		});
	});
	ClientSocket.on("CPacketExplosion", packet => {
		client.write('explosion', {
			x: packet.pos.x,
			y: packet.pos.y,
			z: packet.pos.z,
			radius: packet.strength,
			affectedBlockOffsets: [],
			playerMotionX: packet.playerPos.x,
			playerMotionY: packet.playerPos.y,
			playerMotionZ: packet.playerPos.z
		});
	});
	ClientSocket.on("CPacketMessage", packet => {
		if (packet.text) {
			client.write('chat', {message: JSON.stringify({text: translateText(packet.text)})});
			if (packet.id == undefined && packet.text.includes("Queueing")) {
				client.write('chat', {
					message: JSON.stringify({
						text: "",
						extra: [
							{
								text: "Click here",
								color: "aqua",
								clickEvent: {
									action: "run_command",
									value: "/play " + gameType
								}
							},
							" to play again!"
						]
					})
				});
			}
		}
	});
	ClientSocket.on("CPacketPong", packet => {
		filteredPing += (Math.max(Date.now() - Number(packet.time), 1) - filteredPing) / 3;
	});
	ClientSocket.on("CPacketOpenShop", packet => {
		const gui = GUIS[packet.type];
		if (gui) {
			const itemCount = Math.ceil(gui.items.length / 9) * 9;
			client.write('open_window', {
				windowId: 255,
				inventoryType: "minecraft:container",
				windowTitle: gui.name,
				slotCount: itemCount,
				entityId: mcClientId
			});
			openShop = packet.type;

			const contents = Array(itemCount).fill({blockId: -1});
			for (let i = 0; i < gui.items.length; i++) {
				contents[i] = gui.items[i];
			}

			client.write('window_items', {
				windowId: 255,
				items: contents
			});
		}
	});
	ClientSocket.on("CPacketOpenWindow", packet => {
		if (packet.guiID === "chest") {
			client.write('open_window', {
				windowId: packet.windowId,
				inventoryType: "minecraft:container",
				windowTitle: packet.title,
				slotCount: packet.size,
				entityId: mcClientId
			});
		}
	});
	ClientSocket.on("CPacketParticles", packet => {
		client.write('world_particles', {
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
		});
	});
	ClientSocket.on("CPacketPlayerList", packet => {
		purgePlayers(client);
		let newData = [];
		for (const entity of packet.players) {
			const nameSplit = entity.id == clientId ? [client.username] : entity.name.split(" ");
			const realName = nameSplit[nameSplit.length - 1].slice(0, 16);
			const uuid = entity.id == clientId ? client.uuid : entity.uuid;
			const skin = playerSkins[entity.id] != undefined && SKINS[playerSkins[entity.id]] != undefined ? SKINS[playerSkins[entity.id]] : SKINS.granddad;
			playerUUIDs[entity.id] = uuid;
			newData.push({
				UUID: uuid,
				name: realName,
				properties: [{name: "textures", value: skin[0], signature: skin[1]}],
				gamemode: playerGamemodes[entity.id] != undefined ? playerGamemodes[entity.id] : 0,
				ping: entity.ping
			});
			client.write('scoreboard_team', {
				team: uuid.slice(0, 16),
				mode: 0,
				name: uuid.slice(0, 32),
				prefix: ((nameSplit.length > 1 ? translateText(nameSplit.slice(0, nameSplit.length - 1).join(" ")) : "") + translateText(`\\${(entity.color != "white" ? entity.color : undefined) ?? (entity.id == clientId ? "white" : "reset")}\\`)).slice(0, 16),
				suffix: "",
				friendlyFire: true,
				nameTagVisibility: "all",
				color: 0,
				players: [realName]
			});
		}
		client.write('player_info', {
			action: 0,
			data: newData
		});
		checkEntities(client);
	});
	ClientSocket.on("CPacketPlayerPosLook", packet => {
		if (isNaN(packet.x) || isNaN(packet.y) || isNaN(packet.z) || isNaN(packet.yaw) || isNaN(packet.pitch)) {
			client.end("Received invalid player position and look packet");
			return
		}

		client.write('position', {
			x: packet.x,
			y: packet.y,
			z: packet.z,
			yaw: (((packet.yaw * -1) * RAD2DEG) - 180),
			pitch: (packet.pitch * -1) * RAD2DEG,
			flags: 0x00
		});
	});
	ClientSocket.on("CPacketPlayerPosition", packet => {
		client.write('position', {
			x: packet.x,
			y: packet.y,
			z: packet.z,
			yaw: 0,
			pitch: 0,
			flags: 24
		});
	});
	ClientSocket.on("CPacketQueueNext", packet => connect(client, true, packet.minigameId));
	ClientSocket.on("CPacketRemoveEntityEffect", packet => {
		client.write('remove_entity_effect', {
			entityId: packet.id == clientId ? mcClientId : packet.id,
			effectId: packet.effectId
		});
	});
	ClientSocket.on("CPacketRespawn", packet => {
		if (packet.client) {
			ClientSocket.sendPacket(new SPacketRespawn$1);
			client.write('respawn', {
				dimension: packet.dimension,
				difficulty: 2,
				gamemode: 2,
				levelType: "FLAT"
			});
		}
	});
	ClientSocket.on("CPacketScoreboard", packet => {
		if (scoreData.length > 0) {
			client.write('scoreboard_objective', {
				name: "scoreboard",
				action: 1
			});
			scoreData = [];
		}
		client.write('scoreboard_objective', {
			name: "scoreboard",
			action: 0,
			displayText: translateText(packet.title),
			type: "INTEGER"
		});
		client.write('scoreboard_display_objective', {
			position: 1,
			name: "scoreboard"
		});

		let index = 0;
		for (const line of packet.content) {
			const name = translateText(line.columns.join(" "));
			scoreData.push(name.slice(0, 40));
			client.write('scoreboard_score', {
				scoreName: "scoreboard",
				itemName: name,
				action: 0,
				value: packet.content.length - index
			});
			index++;
		}
	});
	ClientSocket.on("CPacketSetExperience", packet => {
		client.write('experience', {
			experienceBar: packet.experience,
			level: packet.level,
			totalExperience: packet.experienceTotal
		});
	});
	ClientSocket.on("CPacketSetSlot", packet => {
		client.write('set_slot', {
			windowId: packet.windowId,
			slot: packet.windowId == 0 && SLOTS[packet.slot] != undefined ? SLOTS[packet.slot] : packet.slot,
			item: translateItem(packet.slotData)
		});
	});
	ClientSocket.on("CPacketSoundEffect", packet => {
		if (!packet.location) {
			packet.location = {x: lPosition.x * 8, y: lPosition.y * 8, z: lPosition.z * 8};
		}

		client.write('named_sound_effect', {
			soundName: packet.sound,
			x: packet.location.x,
			y: packet.location.y,
			z: packet.location.z,
			volume: packet.volume,
			pitch: packet.pitch * 63
		});
	});
	ClientSocket.on("CPacketSpawnEntity", packet => {
		if (ENTITIES[packet.type] == undefined) return;
		if (packet.motion == undefined) packet.motion = {x: 0, y: 0, z: 0};
		entities[packet.id] = {
			id: packet.id,
			type: ENTITIES[packet.type],
			pos: packet.pos,
			yaw: convertAngle(packet.yaw, 180),
			pitch: convertAngle(packet.pitch),
			metadata: {},
			equipment: {},
			objectData: {
				intField: packet.shooterId != null ? (packet.shooterId == clientId ? mcClientId : packet.shooterId) : 1,
				velocityX: Math.max(Math.min(packet.motion.x * 8000, 32767), -32768),
				velocityY: Math.max(Math.min(packet.motion.y * 8000, 32767), -32768),
				velocityZ: Math.max(Math.min(packet.motion.z * 8000, 32767), -32768)
			},
			spawned: false
		};
		checkEntity(entities[packet.id], client);
	});
	ClientSocket.on("CPacketSpawnExperienceOrb", packet => {
		client.write('spawn_entity_experience_orb', {
			entityId: packet.id,
			x: packet.x,
			y: packet.y,
			z: packet.z,
			count: packet.xpValue
		});
	});
	ClientSocket.on("CPacketSpawnPlayer", packet => {
		if (packet.socketId == ClientSocket.id) {
			delete playerGamemodes[packet.id];
			clientId = packet.id;
			lastLHP = [];
		} else {
			playerGamemodes[packet.id] = GAMEMODES[packet.gamemode ?? "survival"];
			playerSkins[packet.id] = packet.cosmetics.skin;
			entities[packet.id] = {
				id: packet.id,
				type: -1,
				special: packet.name && packet.name.includes(" "),
				pos: {x: packet.pos.x * 32, y: packet.pos.y * 32, z: packet.pos.z * 32},
				yaw: convertAngle(packet.yaw, 180),
				pitch: convertAngle(packet.pitch),
				metadata: {},
				equipment: {},
				spawned: entities[packet.id] ? entities[packet.id].spawned : false,
				name: packet.name
			};
			checkEntity(entities[packet.id], client);
		}
	});
	ClientSocket.on("CPacketTabComplete", packet => client.write('tab_complete', {matches: packet.matches}));
	ClientSocket.on("CPacketTitle", packet => {
		client.write('title', {
			action: 2,
			fadeIn: 6,
			stay: Math.floor(packet.duration / 50),
			fadeOut: 6
		});
		client.write('title', {
			action: 0,
			text: JSON.stringify({text: translateText(packet.title)})
		});
	});
	ClientSocket.on("CPacketUpdateHealth", packet => {
		if (packet.id == clientId) {
			lastLHP[0] = packet.hp != undefined ? packet.hp : (lastLHP[0] != undefined ? lastLHP[0] : 20);
			lastLHP[1] = packet.food != undefined ? packet.food : (lastLHP[1] != undefined ? lastLHP[1] : 20);
			lastLHP[2] = packet.foodSaturation != undefined ? packet.foodSaturation : (lastLHP[2] != undefined ? lastLHP[2] : 20);
			client.write('update_health', {
				health: lastLHP[0],
				food: lastLHP[1],
				foodSaturation: lastLHP[2]
			});
		}
	});
	ClientSocket.on("CPacketUpdateScoreboard", packet => {
		if (scoreData[packet.index] == undefined) return;
		const name = translateText(packet.columns.join(" "));
		client.write('scoreboard_score', {
			scoreName: "scoreboard",
			itemName: scoreData[packet.index],
			action: 1
		});
		client.write('scoreboard_score', {
			scoreName: "scoreboard",
			itemName: name,
			action: 0,
			value: scoreData.length - packet.index
		});
		scoreData[packet.index] = name;
	});
	ClientSocket.on("CPacketUpdateStatus", packet => {
		if (packet.mode) {
			if (packet.id == clientId) {
				client.write('game_state_change', {reason: 3, gameMode: GAMEMODES[packet.mode ?? "survival"]});
			} else {
				playerGamemodes[packet.id] = GAMEMODES[packet.mode ?? "survival"];
				if (playerUUIDs[packet.id] != undefined) {
					client.write('player_info', {
						action: 1,
						data: [{UUID: playerUUIDs[packet.id], gamemode: playerGamemodes[packet.id]}]
					});
				}

				checkEntity(entities[packet.id], client);
			}
		}
	});
	ClientSocket.on("CPacketWindowItems", packet => {
		if (ignoreInventory) {
			ignoreInventory = false;
			return;
		}
		let items = [];
		for (let i = 0; i < 40; i++) items.push(translateItem({present: false}));
		for (let i = 0; i < 40; i++) {
			items[packet.windowId == 0 && SLOTS[i] != undefined ? SLOTS[i] : i] = translateItem(packet.items[i]);
		}
		client.write('window_items', {
			windowId: packet.windowId,
			items: items
		});
	});
	ClientSocket.on("CPacketTimeUpdate", packet => {
		client.write('update_time', {
			age: packet.totalTime,
			time: packet.worldTime
		});
	});

	ClientSocket.connect();
}

server.on('playerJoin', async function(client) {
	if (connected) {
		client.end("A player is already logged in!");
		return;
	}

	client.on("end", function() {
		if (ClientSocket.socket) ClientSocket.disconnect();
		disconnect();
	});

	// MINECRAFT SERVER
	client.on('flying', ({ onGround } = {}) => {
		sendActions(client);
		ClientSocket.sendPacket(new SPacketPlayerPosLook({onGround: onGround}));
		sendAbilities();
	});
	client.on('position', ({ x, y, z, onGround } = {}) => {
		lPosition = {x: x, y: y, z: z};
		sendActions(client);
		ClientSocket.sendPacket(new SPacketPlayerPosLook({pos: {x: x, y: y, z: z}, onGround: onGround}));
		sendAbilities();
	});
	client.on('look', ({ yaw, pitch, onGround } = {}) => {
		sendActions(client);
		ClientSocket.sendPacket(new SPacketPlayerPosLook({yaw: ((yaw * -1) - 180) * DEG2RAD, pitch: (pitch * -1) * DEG2RAD, onGround: onGround}));
		sendAbilities();
	});
	client.on('position_look', ({ x, y, z, onGround, yaw, pitch } = {}) => {
		lPosition = {x: x, y: y, z: z};
		sendActions(client);
		ClientSocket.sendPacket(new SPacketPlayerPosLook({pos: {x: x, y: y, z: z}, yaw: ((yaw * -1) - 180) * DEG2RAD, pitch: (pitch * -1) * DEG2RAD, onGround: onGround}));
		sendAbilities();
	});
	client.on('chat', packet => {
		const msg = packet.message.toLocaleLowerCase()
		if (msg.startsWith("/queue") || msg.startsWith("/play")) {
			connect(client, true, msg.split(" ")[1]);
			return;
		} else if (msg.startsWith("/login")) {
			fs.writeFile('./login.token', packet.message.split(" ")[1] ?? "", (err) => {
				if (err) {
					client.write('chat', {message: JSON.stringify({text: translateText('\\red\\Failed to save file!' + err.message)})});
					throw err;
				}
				client.write('chat', {message: JSON.stringify({text: translateText('\\green\\Successfully logged in! Rejoin the game.')})});
			});
			return;
		} else if (msg.startsWith("/join")) {
			connect(client, true, undefined, msg.split(" ")[1] ?? "");
			return;
		}
		ClientSocket.sendPacket(new SPacketMessage({text: packet.message}));
	});
	client.on('tab_complete', packet => {
		if ((packet.text.startsWith("/queue") || packet.text.startsWith("/play")) && packet.text.indexOf(" ") != -1) {
			const split = packet.text.split(" ")[1].toLocaleLowerCase();
			client.write('tab_complete', {
				matches: [
					"skywars", "eggwars",
					"spleef", "survival", "creative",
					"duels_bridge", "blockhunt",
					"parkour", "oitq",
					"kitpvp", "blitzbuild", "murder",
					"pvp"
				].filter((str) => str.substring(0, split.length) == split)
			});
			return;
		}
		ClientSocket.sendPacket(new SPacketTabComplete$1({message: packet.text}));
	});
	client.on('held_item_slot', packet => ClientSocket.sendPacket(new SPacketHeldItemChange({slot: packet.slotId ?? 0})));
	client.on('arm_animation', _ => {
		ClientSocket.sendPacket(new SPacketClick({}));
		lStates[0] = Date.now() + 300;
	});
	client.on('entity_action', packet => {
		switch (packet.actionId) {
			case 0:
				lStates[2] = true;
				break;
			case 1:
				lStates[2] = false;
				break;
			case 2:
				ClientSocket.sendPacket(new SPacketEntityAction({
					id: clientId,
					stopSleeping: true
				}));
				break;
			case 3:
				lStates[1] = true;
				break;
			case 4:
				lStates[1] = false;
				break;
		}
	});
	client.on('use_entity', packet => {
		if (packet.target != undefined && entities[packet.target] && lPosition) {
			const newPos = clampToBox(lPosition, convertServerPos(entities[packet.target].pos));
			ClientSocket.sendPacket(new SPacketUseEntity({
				id: packet.target,
				action: packet.mouse,
				hitVec: new PBVector3({
					x: newPos[0],
					y: newPos[1],
					z: newPos[2]
				})
			}));
		}
	});
	client.on('block_place', packet => {
		if (packet.direction == -1) {
			ClientSocket.sendPacket(new SPacketUseItem);
		} else {
			ClientSocket.sendPacket(new SPacketPlaceBlock({
				positionIn: new PBBlockPos({
					x: packet.location.x,
					y: packet.location.y,
					z: packet.location.z
				}),
				side: packet.direction,
				hitX: packet.cursorX,
				hitY: packet.cursorY,
				hitZ: packet.cursorZ,
			}));
		}
		ignoreInventory = true;
	});
	client.on('block_dig', packet => {
		const location = new PBBlockPos({
			x: packet.location.x,
			y: packet.location.y,
			z: packet.location.z
		});
		switch (packet.status) {
			case 2:
				ClientSocket.sendPacket(new SPacketBreakBlock({location: location, start: false}));
				break;
			case 0:
				ClientSocket.sendPacket(new SPacketClick({location: location}));
				ClientSocket.sendPacket(new SPacketBreakBlock({location: location, start: true}));
				break;
		}
		ClientSocket.sendPacket(new SPacketPlayerAction({
			position: location,
			facing: packet.face,
			action: packet.status
		}));
	});
	client.on('client_command', packet => {
		if (packet.payload == 0) {
			ClientSocket.sendPacket(new SPacketRespawn$1);
		}
	});
	client.on('window_click', packet => {
		let slot = Number.parseInt(packet.slot) - 5;
		if (slot < 4) slot = 3 - slot;
		if (packet.windowId != 0) slot = Number.parseInt(packet.slot);
		if (packet.windowId == 255) {
			const gui = GUIS[openShop];
			if (gui) gui.command(packet.item, ClientSocket, client, gui);
			return;
		}
		ClientSocket.sendPacket(new SPacketClickWindow({
			windowId: packet.windowId,
			slotId: slot,
			button: packet.mouseButton,
			mode: packet.mode,
			itemStack: translateItemBack(packet.item),
			transactionId: packet.action
		}));
	});
	client.on('keep_alive', packet => {
		if (packet.keepAliveId > 0) ClientSocket.sendPacket(new SPacketPing({time: BigInt(Date.now())}));
	});
	client.on('transaction', packet => {
		ClientSocket.sendPacket(new SPacketConfirmTransaction({
			windowId: packet.windowId,
			actionNumber: packet.action,
			accepted: packet.accepted
		}));
	});
	client.on('close_window', packet => ClientSocket.sendPacket(new SPacketCloseWindow({windowId: packet.windowId == 255 ? 1 : packet.windowId})));

	await connect(client);
	connected = true;
});

console.log('\x1b[33mMiniblox Translation Layer Started!\nDeveloped & maintained by 7GrandDad (https://youtube.com/c/7GrandDadVape)\nVersion: ' + VERSION + '\x1b[0m');
console.log('\x1b[36m[*] Checking recaptcha token...\x1b[0m');

(async() => {
	recaptcha = await fs.readFileSync('recaptcha.token', {encoding: 'utf8'});

	while (true) {
		let fetched = {};
		if (recaptcha != "") fetched = await queue();
		if (!fetched.ok) {
			if (fetched.body) {
				const text = await fetched.text();
				console.log(text);
			}
			await new Promise(resolve => readline.question(`\x1b[31m[!] Invalid recaptcha token, please goto https://miniblox.io and run the code below in the console, then copy the output and paste it in here.
grecaptcha.execute("6LcPzJ8pAAAAACKzt7v7wxbOPXFy4vSWytw6owvT", {
	action: '/launch/queue_minigame'
}).then($ => {
	console.log($);
});
> \x1b[0m`, token => {
				recaptcha = token;
				resolve();
			}));
		} else {
			fs.writeFile('recaptcha.token', recaptcha, (err) => {
				if (err) throw err;
			});
			console.log('\x1b[32m[*] Valid token! You can now log into the server.\x1b[0m');
			readline.close();
			break;
		}
	}
})();