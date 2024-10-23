const Handler = require('./../handler.js');
const { ClientSocket, SPacketMessage, SPacketTabComplete$1 } = require('./../../main.js');
const { translateText } = require('./../../utils.js');
const DEG2RAD = Math.PI / 180, RAD2DEG = 180 / Math.PI;
let client, entity, connect;

const self = class ChatHandler extends Handler {
	miniblox(gameType) {
		ClientSocket.on('CPacketMessage', packet => {
			if (packet.text) {
				client.write('chat', {message: JSON.stringify({text: translateText(packet.text)})});
				if (packet.id == undefined && packet.text.includes('Summary')) {
					client.write('chat', {
						message: JSON.stringify({
							text: '',
							extra: [
								{
									text: 'Click here',
									color: 'aqua',
									clickEvent: {
										action: 'run_command',
										value: '/play ' + gameType
									}
								},
								' to play again!'
							]
						})
					});
				}
			}
		});
		ClientSocket.on('CPacketTitle', packet => {
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
		ClientSocket.on('CPacketTabComplete', packet => client.write('tab_complete', {matches: packet.matches}));
	}
	minecraft(mcClient) {
		client = mcClient;
		client.on('chat', packet => {
			const msg = packet.message.toLocaleLowerCase()
			if (msg.startsWith('/queue') || msg.startsWith('/play')) {
				connect(client, true, msg.split(' ')[1]);
				return;
			} else if (msg.startsWith('/login')) {
				fs.writeFile('./login.token', packet.message.split(' ')[1] ?? '', (err) => {
					if (err) {
						client.write('chat', {message: JSON.stringify({text: translateText('\\red\\Failed to save file!' + err.message)})});
						throw err;
					}
					client.write('chat', {message: JSON.stringify({text: translateText('\\green\\Successfully logged in! Rejoin the game.')})});
				});
				return;
			} else if (msg.startsWith('/join')) {
				connect(client, true, undefined, msg.split(' ')[1] ?? '');
				return;
			} else if (msg.startsWith('/resync')) {
				if (entity.teleport) {
					client.write('position', {
						x: entity.teleport.x,
						y: entity.teleport.y,
						z: entity.teleport.z,
						yaw: 0,
						pitch: 0,
						flags: 24
					});
					client.write('chat', {message: JSON.stringify({text: translateText('\\green\\Resynced!')})});
				}
				return;
			}
			ClientSocket.sendPacket(new SPacketMessage({text: packet.message}));
		});
		client.on('tab_complete', packet => {
			if ((packet.text.startsWith('/queue') || packet.text.startsWith('/play')) && packet.text.indexOf(' ') != -1) {
				const split = packet.text.split(' ')[1].toLocaleLowerCase();
				client.write('tab_complete', {
					matches: [
						'skywars', 'eggwars',
						'spleef', 'survival', 'creative',
						'duels_bridge', 'blockhunt',
						'parkour', 'oitq',
						'kitpvp', 'blitzbuild', 'murder',
						'pvp'
					].filter((str) => str.substring(0, split.length) == split)
				});
				return;
			}
			ClientSocket.sendPacket(new SPacketTabComplete$1({message: packet.text}));
		});
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
	}
	obtainHandlers(handlers, connectFunction) {
		connect = connectFunction;
		entity = handlers.entity;
	}
};

module.exports = new self();