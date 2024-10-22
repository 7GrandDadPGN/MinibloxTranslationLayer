const Handler = require('./../handler.js');
const { ClientSocket, SPacketPing, SPacketAnalytics } = require('./../../main.js');
const { translateText, LEVEL_TO_COLOUR } = require('./../../utils.js');
const SKINS = require('./../../types/skins.js');
let client, entities;

const self = class TabListHandler extends Handler {
	purge() {
		let data = [];
		Object.values(this.entries).forEach((uuid) => {
			data.push({UUID: uuid});
			client.write('scoreboard_team', {
				team: uuid.slice(0, 16),
				mode: 1
			});
		})
		client.write('player_info', {
			action: 4,
			data: data
		});
	}
	miniblox() {
		ClientSocket.on('CPacketPlayerList', packet => {
			this.purge();
			let data = [];
			for (const entity of packet.players) {
				let nameSplit = entity.name.split(' ');
				if (entity.id == entities.local.id) nameSplit[nameSplit.length - 1] = client.username;
				const realName = nameSplit[nameSplit.length - 1].slice(0, 16);
				const uuid = entity.id == entities.local.id ? client.uuid : entity.uuid;
				const skin = entities.skins[entity.id] != undefined ? (SKINS[entities.skins[entity.id]] ?? SKINS.granddad) : SKINS.granddad;
				this.entries[entity.id] = uuid;
				data.push({
					UUID: uuid,
					name: realName,
					properties: [{name: 'textures', value: skin[0], signature: skin[1]}],
					gamemode: entities.gamemodes[entity.id] ?? 0,
					ping: entity.ping
				});
				client.write('scoreboard_team', {
					team: uuid.slice(0, 16),
					mode: 0,
					name: uuid.slice(0, 32),
					prefix: (nameSplit.length > 1 ? translateText(nameSplit.slice(0, nameSplit.length - 1).join(' ')) + ' ' : '').slice(0, 14) + translateText(`\\${(entity.color != 'white' ? entity.color : undefined) ?? (entity.id == entities.local.id ? 'white' : 'reset')}\\`),
					suffix: (entity.level && entity.level > 0) ? translateText(`\\${entity.level ? LEVEL_TO_COLOUR[entity.level] : 'white'}\\ (${entity.level})`) : '',
					friendlyFire: true,
					nameTagVisibility: 'all',
					color: 0,
					players: [realName]
				});
			}
			client.write('player_info', {
				action: 0,
				data: data
			});
			client.write('playerlist_header', {
				header: JSON.stringify({text: translateText('\\cyan\\You are playing on \\lime\\miniblox.io')}),
				footer: JSON.stringify({text: translateText('\\gold\\Translation layer made by 7GrandDad')})
			});
			entities.checkAll();
		});
		ClientSocket.on("CPacketPong", packet => {
			this.filteredPing += (Math.max(Date.now() - Number(packet.time), 1) - this.filteredPing) / 3;
		});
	}
	minecraft(mcClient) {
		client = mcClient;
		client.on('keep_alive', packet => {
			if (packet.keepAliveId > 0) ClientSocket.sendPacket(new SPacketPing({time: BigInt(Date.now())}));
		});
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
		if (client) this.purge();
		if (this.pingLoop) clearInterval(this.pingLoop);
		if (this.analyticsLoop) clearInterval(this.analyticsLoop);
		if (requeue) {
			this.pingLoop = setInterval(() => {
				client.write('keep_alive', {keepAliveId: Math.floor(Math.random() * 10000)});
			}, 1000);
			this.analyticsLoop = setInterval(() => {
				ClientSocket.sendPacket(new SPacketAnalytics({
					fps: 60 - Math.random(),
					ping: this.filteredPing
				}));
			}, 30000);
		}
		this.entries = {};
		this.filteredPing = 0;
	}
	obtainHandlers(handlers) {
		entities = handlers.entity;
	}
};

module.exports = new self();