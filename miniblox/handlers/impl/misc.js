const Handler = require('./../handler.js');
const { ClientSocket, SPacketMessage, SPacketTabComplete$1, SPacketQueueNext } = require('./../../main.js');
const { translateText } = require('./../../utils.js');
const fs = require('node:fs');
let client, entity, connect, world;

/**
 * Matches a server ID (e.g. https://miniblox.io/join/JOINCODEHERE)
 */
const JOIN_CODE = /(?:https?:\/\/^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}\/join\/)?([A-Z]+)/;

/**
 * Matches a server ID
 */
const SERVER_ID = /(large|small|medium|planet)-[A-z|0-9]+-[A-z|0-9]+/;

/**
 * Resolves a join code to a server ID,
 * it will return {@link code} if {@link code} is already a server ID.
 * @param {string} code the invite code or a server ID.
 * @return {Promise<string | null>} a server ID if the server resolved the invite code, otherwise `null`
 */
async function resolveServerID(code) {
	if (SERVER_ID.test(code))
		return code; // no need for modifying, this is already a server ID.
	const joinCode = JOIN_CODE.exec(code);
	if (joinCode === null) throw new IllegalArgumentException(`Invalid invite code: ${code}`);
	const serverId = await fetch("https://session.coolmathblox.ca/launch/invite_code", {
		method: "POST",
		body: JSON.stringify({
			code: joinCode[2]
		}),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(r => r.json()).then(r => r.serverId);
	return serverId;
}

/**
 * Handles a custom chat command
 * @param {string} name the name of the command
 * @param {string[]} args arguments passed to the command
 * @returns {boolean} if it was handled/shouldn't be sent to Miniblox.
 */
async function handleCommand(name, args) {
	// not adding /desync here because it's patched
	switch (name) {
		case 'next':
			// this triggers the server to send a CPacketQueueNext,
			// see the `miniblox` function in ChatHandler below for how that's handled.
			ClientSocket.sendPacket(new SPacketQueueNext);
			break;
		case 'reloadchunks':
			world.chunks = [];
			world.queued = [];
			break;
		case 'q':
		case 'queue':
		case 'play': {
			// un-scruffily stuff happens if we don't wrap in {}
			// (if you use the same variable name in a different case block then it doesn't purr)
			let config;
			try {
				if (args[1]) JSON.parse(args[1]);
			} catch (err) {
				client.write('chat', {
					message: JSON.stringify({
						extra: [translateText(`\\red\\Failed to parse config: ${err.message}`)],
						text: ''
					}),
					position: 1
				});
			}
			connect(client, true, args[0], config);
			break;
		}
		case 'resync':
			if (entity.teleport) {
				client.write('position', {
					x: entity.teleport.x,
					y: entity.teleport.y,
					z: entity.teleport.z,
					yaw: 0,
					pitch: 0,
					flags: 24
				});

				client.write('chat', {
					message: JSON.stringify({
						extra: [translateText('\\green\\Resynced!')],
						text: ''
					}),
					position: 1
				});
			}
			break;
		case 'join': {
			const code = args.join(" ");
			const resolved = await resolveServerID(code).then(c => c ?? code).catch(e => {
				console.error("Error resolving server ID / invite code, trying to connect without resolving. Error:", e);
				client.write('chat', {
					message: JSON.stringify({
						extra: [translateText(
							"\\red\\Failed to resolve Server ID / Invite Code\\reset\\, trying without resolving! See console logs for error"
						)],
						text: ''
					}),
					position: 1
				});
				return code;
			});
			connect(client, true, undefined, undefined, resolved);
			break;
		}
		case 'login': {
			fs.writeFile('./login.token', packet.message.split(' ')[1] ?? '', (err) => {
				if (err) {
					client.write('chat', {
						message: JSON.stringify({
							extra: [translateText(`\\red\\Failed to save file!${err.message}`)],
							text: ''
						}),
						position: 1
					});
					throw err;
				}

				client.write('chat', {
					message: JSON.stringify({
						extra: [translateText('\\green\\Successfully logged in! Rejoin the game.')],
						text: ''
					}),
					position: 1
				});
			});
			break;
		}
		default:
			return false;
	}
	return true;
}

const self = class ChatHandler extends Handler {
	miniblox(_) {
		ClientSocket.on('CPacketQueueNext', packet => {
			connect(client, true, packet.minigameId, packet.minigameConfig);
		});
		ClientSocket.on('CPacketMessage', packet => {
			if (packet.text) {
				if (packet.id == 'miniblox:game-summary') {
					if (packet.text.includes('Victory!')) {
						client.write('chat', {
							message: JSON.stringify({
								text: '',
								extra: [
									{
										text: 'Click here',
										color: 'aqua',
										clickEvent: {
											action: 'run_command',
											value: '/next'
										}
									},
									' to play again!'
								]
							}),
							position: 1
						});
					}
					return;
				}

				client.write('chat', {
					message: JSON.stringify({
						extra: [translateText(packet.text)],
						text: ''
					}),
					position: packet.id == undefined ? 1 : 0
				});
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
				text: JSON.stringify({ text: translateText(packet.title) })
			});
		});

		ClientSocket.on('CPacketTabComplete', packet => client.write('tab_complete', { matches: packet.matches }));
	}
	minecraft(mcClient) {
		client = mcClient;

		client.on('chat', async packet => {
			/**
			 * @type {string}
			 */
			const msg = packet.message;
			if (msg.startsWith('/')) {
				const parts = msg.split(' ');
				const cmd = parts.shift().substring(1);
				const handled = await handleCommand(cmd, parts);
				if (handled) return;
			}
			ClientSocket.sendPacket(new SPacketMessage({ text: msg }));
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

			ClientSocket.sendPacket(new SPacketTabComplete$1({ message: packet.text }));
		});
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
	}
	obtainHandlers(handlers, _, connectFunction) {
		connect = connectFunction;
		entity = handlers.entity;
		world = handlers.world;
	}
};

module.exports = new self();