const { ClientSocket, SPacketMessage, SPacketLoginStart, SPacketPlayerPosLook, SPacketHeldItemChange, SPacketCloseWindow, SPacketRequestChunk, BitArray, SPacketRespawn$1, PBVector3, SPacketUseEntity, SPacketClick, SPacketEntityAction, PBBlockPos, SPacketPlaceBlock, SPacketPlayerAction, SPacketUseItem, SPacketBreakBlock, SPacketClickWindow, SPacketConfirmTransaction, Vector3, SPacketTabComplete$1, PBItemStack } = require('./miniblox/main.js');
const BLOCKS = require('./miniblox/blocks.js');
const ITEMS = require('./miniblox/items.js');
const ENTITIES = require('./miniblox/entities.js');
const SKINS = require('./miniblox/skins.js');
const mc = require('minecraft-protocol');
const Chunk = require('prismarine-chunk')('1.8.9');
const Vec3 = require('vec3');
const server = mc.createServer({
	'online-mode': false,
	'motd': 'Miniblox Translation Layer',
	'maxPlayers': 1,
	version: '1.8.9'
});
const airChunk = new Chunk();
let connected = false;
let clientId = -1;
let mcClientId = 99999;
let chunks = [];
let queuedChunks = [];
let lastLHP = [];
let lStates = [];
let playerUUIDs = {};
let queuedSpawns = {};

let players = [];
let playerPositions = {};
let playerRotations = {};
let playerGamemodes = {};
let playerSkins = {};

let ignoreInventory = false;
let skipKick = Date.now();
let lastLState = [];
let scoreData = []

const GAMEMODES = {"survival": 0, "creative": 1, "adventure": 2, "spectator": 3};
const COLOR_CODES = {
	"\\lime\\": "\u00a7a",
	"\\aqua\\": "\u00a7b",
	"\\red\\": "\u00a7c",
	"\\pink\\": "\u00a7d",
	"\\yellow\\": "\u00a7e",
	"\\white\\": "\u00a7f",
	"\\green\\": "\u00a72",
	"\\orange\\": "\u00a76",
	"\\gold\\": "\u00a76",
	"\\gray\\": "\u00a77",
	"\\grey\\": "\u00a77",
	"\\silver\\": "\u00a77",
	"\\blue\\": "\u00a79",
	"\\black\\": "\u00a70",
	"\\bold\\": "\u00a7l",
	"\\italic\\": "\u00a7o",
	"\\reset\\": "\u00a7r",
	"\\glow\\": ""
};
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

const VERSION = "3.35.38", CELL_VOLUME = 16 * 16 * 16;
const DEG2RAD = Math.PI / 180, RAD2DEG = 180 / Math.PI;

function translateText(text) {
	for (const [code, color] of Object.entries(COLOR_CODES)) text = text.replaceAll(code, color);
	return text;
}

function clampToBox(pos, box) {
	return [Math.min(Math.max(pos[0], box[0] - 0.3), box[0] + 0.3), Math.min(Math.max(pos[1] + 1.62, box[1]), box[1] + 1.8), Math.min(Math.max(pos[2], box[2] - 0.3), box[2] + 0.3)]
}

function updateChunks(x, z, client) {
	const positions = [];
	const currentlyLoaded = [];

	for (let checkX = -7; checkX < 7; checkX++) {
		for (let checkZ = -7; checkZ < 7; checkZ++) {
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

	for (; positions.length > 0 && queuedChunks.length < 2; ) {
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
			break;
		}
	}
}

function getBlockIndex(x, y, z) {
	return (y & 15) << 8 | (z & 15) << 4 | x & 15
}

function createChunk(packet) {
	const chunk = new Chunk();
	for (const cell of packet.cells) {
		const array = new BitArray(CELL_VOLUME, cell.bitsPerEntry, cell.bitArray);
		if (!array) continue;
		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 16; y++) {
				for (let z = 0; z < 16; z++) {
					const offset = getBlockIndex(x, y, z);
					const blockdata = BLOCKS[cell.palette[array.get(offset)]] ?? BLOCKS[9];
					for (let skyY = 0; skyY < 256; skyY++) {
						chunk.setSkyLight(new Vec3(x, skyY, z), 15);
					}
					if (cell.palette.length <= 0) continue;
					chunk.setBlockType(new Vec3(x, cell.y + y, z), typeof blockdata == 'number' ? blockdata : blockdata[0]);
					chunk.setBlockData(new Vec3(x, cell.y + y, z), typeof blockdata == 'number' ? 0 : blockdata[1]);
				}
			}
		}
	}
	return chunk;
}

function translateItem(item) {
	const itemData = item.present && (ITEMS[item.id] ?? 166);
	return item.present ? {
		blockId: typeof itemData == 'number' ? itemData : itemData[0],
		itemCount: item.stackSize,
		itemDamage: (typeof itemData == 'number' ? item.durability : itemData[1])
	} : {blockId: -1}
}

function translateItemBack(item) {
	let itemId;
	for (const [mini, mc] of Object.entries(ITEMS)) {
		if(item.blockId == mc && item != 166) itemId = Number.parseInt(mini);
	}
	return itemId != undefined ? new PBItemStack({
		present: true,
		id: itemId,
		stackSize: item.itemCount,
		durability: Math.floor(item.itemDamage),
		data: void 0
	}) : new PBItemStack({present: false});
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

function convertToByte(num) {
	num = num & 0xFF;
	num = num > 127 ? num - 256 : num;
	return num;
}

function convertAngle(ang, num) {
	ang = ang / 256 * Math.PI * 2;
	ang = (((ang * -1) * RAD2DEG) - (num != undefined ? num : 0)) * 256 / 360;
	return convertToByte(ang);
}

function spawnEntity(packet, client) {
	playerRotations[packet.id] = [convertAngle(packet.yaw, 180), convertAngle(packet.pitch)];
	playerGamemodes[packet.id] = GAMEMODES[packet.gamemode ?? "survival"];
	playerSkins[packet.id] = packet.cosmetics.skin;
	if (playerUUIDs[packet.id] == undefined || playerPositions[packet.id] == undefined) return;
	if (playerGamemodes[packet.id] == GAMEMODES.spectator) return;
	if (players.includes(packet.id)) return;
	players.push(packet.id);
	client.write('named_entity_spawn', {
		entityId: packet.id,
		playerUUID: playerUUIDs[packet.id] ?? crypto.randomUUID(),
		x: playerPositions[packet.id].x * 32,
		y: playerPositions[packet.id].y * 32,
		z: playerPositions[packet.id].z * 32,
		yaw: playerRotations[packet.id][0],
		pitch: playerRotations[packet.id][1],
		currentItem: 0,
		metadata: []
	});
}

function sendActions() {
	const newStates = {punching: lStates[0] > Date.now(), sprinting: lStates[1], sneak: lStates[2]};
	if (newStates.punching == lastLState.punching && newStates.sprinting == lastLState.sprinting && newStates.sneak == lastLState.sneak) return;
	ClientSocket.sendPacket(new SPacketEntityAction({
		id: clientId,
		punching: newStates.punching != lastLState.punching ? newStates.punching : undefined,
		sprinting: newStates.sprinting != lastLState.sprinting ? newStates.sprinting : undefined,
		sneak: newStates.sneak != lastLState.sneak ? newStates.sneak : undefined
	}));
	lastLState = newStates;
}

function disconnect() {
	connected = false;
	clientId = -1;
	ignoreInventory = false;
	chunks = [];
	queuedChunks = [];
	lastLHP = [];
	lStates = [];
	playerUUIDs = {};
	queuedSpawns = {};
	players = [];
	playerPositions = {};
	playerRotations = {};
	playerGamemodes = {};
	playerSkins = {};
	lastLState = [];
	scoreData = [];
}

async function connect(client, requeue, gamemode) {
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

	let fetched
	try {
		fetched = await fetch('https://session.coolmathblox.ca/launch/queue_minigame', {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				clientVersion: VERSION,
				minigameId: gamemode ?? "kitpvp"
			})
		});
	} catch (exception) {
		fetched = {statusText: "Unable to connect to server"};
	}

	if (!fetched.ok) {
		client.end(fetched.statusText ?? "Disconnected");
		return;
	}
	fetched = await fetched.json();
	console.log(fetched);
	ClientSocket.setUrl(`https://${fetched.serverId}.servers.coolmathblox.ca`, void 0);

	// MINIBLOX CONNECTION
	ClientSocket.once("connect", () => {
		ClientSocket.sendPacket(new SPacketLoginStart({
			requestedUuid: void 0,
			session: "",
			hydration: "0",
			metricsId: "",
			clientVersion: VERSION
		}));
	});
	ClientSocket.once("CPacketJoinGame", packet => {
		disconnect();
		if (!packet.canConnect) {
			client.end(packet.errorMessage ?? "Disconnected");
		}
		if (requeue) return;
		client.write('login', {
			entityId: mcClientId,
			levelType: "default",
			gameMode: GAMEMODES[packet.gamemode ?? "survival"],
			previousGameMode: -1,
			worldNames: ["world"],
			dimensionCodec: 0,
			worldName: "world",
			dimension: 0,
			hashedSeed: [0, 0],
			difficulty: 2,
			viewDistance: 10,
			reducedDebugInfo: false,
			maxPlayers: server.maxPlayers,
			enableRespawnScreen: true,
			isDebug: false,
			isFlat: true
		});
	});

	// MINIBLOX SERVER
	ClientSocket.on("disconnect", reason => {
		if (skipKick > Date.now()) return;
		client.end(reason);
	});
	ClientSocket.on("CPacketPlayerPosLook", packet => {
		if (isNaN(packet.x) || isNaN(packet.y) || isNaN(packet.z) || isNaN(packet.yaw) || isNaN(packet.pitch)) {
			client.end("Received invalid player position and look packet");
			return
		}

		queuedChunks = [];
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
		queuedChunks = [];
		client.write('position', {
			x: packet.x,
			y: packet.y,
			z: packet.z,
			yaw: 0,
			pitch: 0,
			flags: 0x00
		});
	});
	ClientSocket.on("CPacketSoundEffect", packet => {
		if(!packet.location) {
			const pos = playerPositions[mcClientId];
			packet.location = {x: pos.x * 8, y: pos.y * 8, z: pos.z * 8};
		}

		client.write('named_sound_effect', {
			soundName: packet.sound,
			x: packet.location.x,
			y: packet.location.y,
			z: packet.location.z,
			volume: packet.volume,
			pitch: packet.pitch * 63
		});
	})
	ClientSocket.on("CPacketMessage", packet => {
		if (packet.text) client.write('chat', {message: JSON.stringify({text: translateText(packet.text)})});
	});
	ClientSocket.on("CPacketTabComplete", packet => client.write('tab_complete', {matches: packet.matches}));
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

				if (playerPositions[packet.id] != undefined) {
					delete queuedSpawns[packet.id];
					if (playerGamemodes[packet.id] == GAMEMODES.spectator) {
						if (players.includes(packet.id)) {
							players.splice(players.indexOf(packet.id), 1);
							client.write('entity_destroy', {
								entityIds: [packet.id]
							});
						}
					} else {
						spawnEntity({
							id: packet.id,
							yaw: playerRotations[packet.id][0],
							pitch: playerRotations[packet.id][1],
							cosmetics: {skin: playerSkins[packet.id]},
							gamemode: packet.mode
						}, client);
					}
				}
			}
		}
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
	ClientSocket.on("CPacketEntityStatus", packet => {
		client.write('entity_status', {
			entityId: packet.entityId == clientId ? mcClientId : packet.entityId,
			entityStatus: packet.entityStatus
		});
	});
	ClientSocket.on("CPacketEntityVelocity", packet => {
		client.write('entity_velocity', {
			entityId: packet.id == clientId ? mcClientId : packet.id,
			velocityX: packet.motion.x * 8000,
			velocityY: packet.motion.y * 8000,
			velocityZ: packet.motion.z * 8000
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
	ClientSocket.on("CPacketAnimation", packet => {
		client.write('animation', {
			entityId: packet.id == clientId ? mcClientId : packet.id,
			animation: packet.type
		});
	});
	ClientSocket.on("CPacketEntityAction", packet => {
		if (packet.punching) {
			client.write('animation', {
				entityId: packet.id,
				animation: 0
			});
		}
	});
	ClientSocket.on("CPacketSpawnPlayer", packet => {
		if (packet.socketId == ClientSocket.id) {
			delete playerGamemodes[packet.id];
			clientId = packet.id;
			lastLHP = [];
		} else {
			playerPositions[packet.id] = packet.pos;
			if (playerUUIDs[packet.id] == undefined) {
				playerRotations[packet.id] = [convertAngle(packet.yaw, 180), convertAngle(packet.pitch)];
				queuedSpawns[packet.id] = packet;
				return;
			}
			spawnEntity(packet, client);
		}
	});
	ClientSocket.on("CPacketSpawnEntity", packet => {
		if (ENTITIES[packet.type] == undefined) return;
		if (packet.motion == undefined) packet.motion = {x: 0, y: 0, z: 0};
		client.write('spawn_entity', {
			entityId: packet.id,
			type: ENTITIES[packet.type],
			x: packet.pos.x,
			y: packet.pos.y,
			z: packet.pos.z,
			pitch: convertAngle(packet.pitch),
			yaw: convertAngle(packet.yaw, 180),
			objectData: {
				intField: packet.shooterId != null ? (packet.shooterId == clientId ? mcClientId : packet.shooterId) : 1,
				velocityX: packet.motion.x * 8000,
				velocityY: packet.motion.y * 8000,
				velocityZ: packet.motion.z * 8000
			}
		});
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
	ClientSocket.on("CPacketDestroyEntities", packet => {
		for (const id of packet.ids) {
			delete queuedSpawns[id];
			delete playerPositions[id];
			if (players.includes(id)) {
				players.splice(players.indexOf(id), 1);
			}
		}
		client.write('entity_destroy', {
			entityIds: packet.ids
		});
	});
	ClientSocket.on("CPacketEntityPositionAndRotation", packet => {
		playerPositions[packet.id] = [packet.pos.x / 32, packet.pos.y / 32, packet.pos.z / 32];
		playerRotations[packet.id] = [convertAngle(packet.yaw, 180), convertAngle(packet.pitch)];
		client.write('entity_teleport', {
			entityId: packet.id,
			x: packet.pos.x,
			y: packet.pos.y,
			z: packet.pos.z,
			yaw: playerRotations[packet.id][0],
			pitch: playerRotations[packet.id][1],
			onGround: packet.onGround
		});
		client.write('entity_head_rotation', {
			entityId: packet.id,
			headYaw: playerRotations[packet.id][0]
		});
	});
	ClientSocket.on("CPacketEntityRelPositionAndRotation", packet => {
		playerRotations[packet.id] = playerRotations[packet.id] ?? [0, 0];
		const x = Math.min(Math.max(packet.pos ? packet.pos.x : 0, -128), 127);
		const y = Math.min(Math.max(packet.pos ? packet.pos.y : 0, -128), 127);
		const z = Math.min(Math.max(packet.pos ? packet.pos.z : 0, -128), 127);
		const yaw = packet.yaw != undefined ? convertAngle(packet.yaw, 180) : playerRotations[packet.id][0];
		const pitch = packet.pitch != undefined ? convertAngle(packet.pitch) : playerRotations[packet.id][1];
		if (playerPositions[packet.id]) {
			const pos = playerPositions[packet.id];
			playerPositions[packet.id] = [pos[0] + (x / 32), pos[1] + (y / 32), pos[2] + (z / 32)];
		}
		playerRotations[packet.id] = [yaw, pitch];

		client.write('entity_move_look', {
			entityId: packet.id,
			dX: x,
			dY: y,
			dZ: z,
			yaw: yaw,
			pitch: pitch,
			onGround: packet.onGround
		});
		client.write('entity_head_rotation', {
			entityId: packet.id,
			headYaw: yaw
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

		for (const [id, packet] of Object.entries(queuedSpawns)) {
			if (playerUUIDs[id]) {
				delete queuedSpawns[id];
				spawnEntity(packet, client);
			}
		}
	});
	ClientSocket.on("CPacketRespawn", packet => {
		if (packet.client) {
			ClientSocket.sendPacket(new SPacketRespawn$1);
			client.write('respawn', {
				dimension: 0,
				difficulty: 2,
				gamemode: 2,
				levelType: "FLAT"
			});
		}
	});
	ClientSocket.on("CPacketSetExperience", packet => {
		client.write('experience', {
			experienceBar: packet.experience,
			level: packet.level,
			totalExperience: packet.experienceTotal
		})
	});
	ClientSocket.on("CPacketTimeUpdate", packet => {
		client.write('update_time', {
			age: packet.totalTime,
			time: packet.worldTime
		});
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
	ClientSocket.on("CPacketCloseWindow", packet => client.write('close_window', {windowId: packet.windowId}));
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
	ClientSocket.on("CPacketSetSlot", packet => {
		client.write('set_slot', {
			windowId: packet.windowId,
			slot: packet.windowId == 0 && SLOTS[packet.slot] != undefined ? SLOTS[packet.slot] : packet.slot,
			item: translateItem(packet.slotData)
		});
	});
	ClientSocket.on("CPacketEntityEquipment", packet => {
		for (const equip of packet.equipment) {
			if (equip.slot == 2) continue;
			client.write('entity_equipment', {
				entityId: packet.id,
				slot: equip.slot == 1 ? 0 : 7 - equip.slot,
				item: translateItem(equip.item)
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

		client.write('entity_metadata', {
			entityId: packet.id == clientId ? mcClientId : packet.id,
			metadata: props
		});
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
	ClientSocket.on("CPacketRemoveEntityEffect", packet => {
		client.write('remove_entity_effect', {
			entityId: packet.id == clientId ? mcClientId : packet.id,
			effectId: packet.effectId
		});
	});
	ClientSocket.on("CPacketTitle", packet => {
		client.write('title', {
			action: 2,
			fadeIn: 6,
			stay: packet.duration / 20,
			fadeOut: 6
		});
		client.write('title', {
			action: 0,
			text: packet.title
		});
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
			scoreData.push(name);
			client.write('scoreboard_score', {
				scoreName: "scoreboard",
				itemName: name,
				action: 0,
				value: packet.content.length - index
			});
			index++;
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
	ClientSocket.on("CPacketQueueNext", packet => connect(client, true, packet.minigameId));
	ClientSocket.on("CPacketConfirmTransaction", packet => {
		client.write('transaction', {
			windowId: packet.windowId,
			action: packet.uid,
			accepted: packet.accepted
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
		sendActions();
		ClientSocket.sendPacket(new SPacketPlayerPosLook({onGround: onGround}));
	});
	client.on('position', ({ x, y, z, onGround } = {}) => {
		updateChunks(x, z, client);
		sendActions();
		ClientSocket.sendPacket(new SPacketPlayerPosLook({pos: {x: x, y: y, z: z}, onGround: onGround}));
		playerPositions[mcClientId] = [x, y, z];
	});
	client.on('look', ({ yaw, pitch, onGround } = {}) => {
		sendActions();
		ClientSocket.sendPacket(new SPacketPlayerPosLook({yaw: ((yaw * -1) - 180) * DEG2RAD, pitch: (pitch * -1) * DEG2RAD, onGround: onGround}));
	});
	client.on('position_look', ({ x, y, z, onGround, yaw, pitch } = {}) => {
		updateChunks(x, z, client);
		sendActions();
		ClientSocket.sendPacket(new SPacketPlayerPosLook({pos: {x: x, y: y, z: z}, yaw: ((yaw * -1) - 180) * DEG2RAD, pitch: (pitch * -1) * DEG2RAD, onGround: onGround}));
		playerPositions[mcClientId] = [x, y, z];
	});
	client.on('chat', packet => {
		if (packet.message.toLocaleLowerCase().startsWith("/queue") || packet.message.toLocaleLowerCase().startsWith("/play")) {
			const split = packet.message.toLocaleLowerCase().split(" ");
			connect(client, true, split[1]);
			return;
		}
		ClientSocket.sendPacket(new SPacketMessage({text: packet.message}));
	});
	client.on('tab_complete', packet => {ClientSocket.sendPacket(new SPacketTabComplete$1({message: packet.text}))});
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
		if (packet.target != undefined && playerPositions[packet.target] && playerPositions[mcClientId]) {
			const newPos = clampToBox(playerPositions[mcClientId], playerPositions[packet.target]);
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
		ClientSocket.sendPacket(new SPacketClickWindow({
			windowId: packet.windowId,
			slotId: slot,
			button: packet.mouseButton,
			mode: packet.mode,
			itemStack: translateItemBack(packet.item),
			transactionId: packet.action
		}));
	});
	client.on('transaction', packet => {
		ClientSocket.sendPacket(new SPacketConfirmTransaction({
			windowId: packet.windowId,
			actionNumber: packet.action,
			accepted: packet.accepted
		}));
	});
	client.on('close_window', packet => ClientSocket.sendPacket(new SPacketCloseWindow({windowId: packet.windowId})));

	await connect(client);
	connected = true;
});