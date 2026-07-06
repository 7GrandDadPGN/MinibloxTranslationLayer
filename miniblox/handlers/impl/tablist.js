const Handler = require('./../handler.js');
const { ClientSocket, SPacketPing, SPacketAnalytics } = require('./../../main.js');
const { translateText, LEVEL_TO_COLOUR } = require('./../../utils.js');
const SKINS = require('./../../types/skins.js');
let client, entity, MCHandler;

const self = class TabListHandler extends Handler {
	processEntry(entry) {
		entry.id = entry.id.toString();
		const tabEntry = MCHandler.tablist.players[entry.id];
		const isLocal = MCHandler.local.index == entry.id;
		const nameSplit = entry.name.split(' ');
		if (isLocal) {
			nameSplit[nameSplit.length - 1] = client.username;
		}
		const prefix = (nameSplit.length > 1 ? translateText(nameSplit.slice(0, nameSplit.length - 1).join(' ')) + ' ' : '').slice(0, 14) + translateText(`\\${(entry.color != 'white' ? entry.color : undefined) ?? (isLocal ? 'white' : 'reset')}\\`).slice(0, 16);
		const suffix = (entry.level && entry.level > 0) ? translateText(`\\${entry.level ? LEVEL_TO_COLOUR[entry.level] : 'white'}\\ (${entry.level})`).slice(0, 16) : '';

		if (tabEntry != undefined) {
			MCHandler.tablist.updatePing(entry.id, entry.ping);
			MCHandler.tablist.updatePrefix(entry.id, prefix);
			MCHandler.tablist.updateSuffix(entry.id, suffix);
		} else {
			MCHandler.tablist.add(entry.id, {
				name: nameSplit.pop().replaceAll('.', '').slice(0, 16),
				gamemode: entity.gamemodes[entry.id] ?? 0,
				ping: entry.ping,
				prefix: prefix,
				suffix: suffix,
				skin: entity.skins[entry.id] ? SKINS[entity.skins[entry.id]] : undefined
			}, isLocal);
		}
	}
	miniblox() {
		ClientSocket.on('CPacketPlayerList', packet => {
			const exists = [];
			for (const entry of packet.players) {
				this.processEntry(entry);
				exists.push(entry.id);
			}

			for (const id of Object.keys(MCHandler.tablist.players).filter((id) => !exists.includes(id))) {
				MCHandler.tablist.remove(id);
			}

			MCHandler.world.tickEntities();

			client.write('playerlist_header', {
				header: JSON.stringify({text: translateText('\\cyan\\You are playing on \\lime\\miniblox.io')}),
				footer: JSON.stringify({text: translateText('\\gold\\Translation layer made by 7GrandDad')})
			});
		});

		ClientSocket.on('CPacketPlayerListDelta', packet => {
			for (const entry of packet.upserts) {
				this.processEntry(entry);
			}

			for (const id of packet.removedIds) {
				MCHandler.tablist.remove(id.toString());
			}

			MCHandler.world.tickEntities();
		});

		ClientSocket.on('CPacketPong', packet => {
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
		this.filteredPing = 0;
	}
	obtainHandlers(handlers, mchandler) {
		entity = handlers.entity;
		MCHandler = mchandler;
	}
};

module.exports = new self();