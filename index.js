const { ClientSocket, SPacketLoginStart } = require('./miniblox/main.js');
const handlers = require('./miniblox/handlers/init.js');
const mc = require('minecraft-protocol');
const fs = require('node:fs');
const server = mc.createServer({
	'online-mode': false,
	motd: '\u00a76' + ' '.repeat(14) + 'Miniblox Translation Layer \u00a7c[1.8]\n\u00a7a' + ' '.repeat(21) + 'Made by 7GrandDad',
	favicon: 'data:image/png;base64,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',
	maxPlayers: 1,
	keepAlive: false,
	version: '1.8.9'
});
const VERSION = '3.41.10';
const GAMEMODES = require('./miniblox/types/gamemodes.js');
let connected, skipKick = Date.now();

function cleanup(teleport) {
	connected = teleport ?? false;
	Object.values(handlers).forEach((handler) => handler.cleanup(teleport));
}

async function queue(gamemode, server) {
	if (server) return {ok: true, json: function() { return {serverId: server}; }};
	let fetched
	try {
		fetched = await fetch('https://session.coolmathblox.ca/launch/queue_minigame', {
			method: 'POST',
			headers: {
				'accept': 'application/json, text/plain, */*',
				'accept-language': 'en-US,en;q=0.9',
				'cache-control': 'no-cache',
				'content-type': 'application/json',
				'pragma': 'no-cache',
				'priority': 'u=1, i',
				'sec-ch-ua': '"Microsoft Edge";v="133", "Chromium";v="133", "Not_A Brand";v="99"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Windows"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'cross-site',
				'Referer': 'https://miniblox.io/',
				'Referrer-Policy': 'strict-origin-when-cross-origin',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0'
			},
			body: JSON.stringify({
				clientVersion: VERSION,
				minigameId: gamemode ?? 'kitpvp'
			})
		});
	} catch (exception) {
		fetched = {text: function() { return exception; }};
	}
	return fetched;
}

function uuid() {
	return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, j => (j ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> j / 4).toString(16));
}

async function connect(client, requeue, gamemode, code) {
	if (requeue) {
		skipKick = Date.now() + 20;
		if (ClientSocket.socket) ClientSocket.disconnect();

		client.write('respawn', {
			dimension: 1,
			difficulty: 2,
			gamemode: 2,
			levelType: 'FLAT'
		});
		client.write('respawn', {
			dimension: 0,
			difficulty: 2,
			gamemode: 2,
			levelType: 'FLAT'
		});
	}
	cleanup(true);

	let fetched = await queue(gamemode, code);
	if (!fetched.ok) {
		const text = await fetched.text();
		client.end(text ?? (fetched.statusText ?? 'Disconnected'));
		return;
	}

	fetched = await fetched.json();
	console.log(`\x1b[36m[*] Connecting to ${fetched.serverId}\x1b[0m`);
	if (client.ended) return;

	const gameType = gamemode ?? 'kitpvp';
	ClientSocket.setUrl(`https://${fetched.serverId}.servers.coolmathblox.ca`, void 0);
	let session = '';
	try {
		session = await fs.readFileSync('login.token', {encoding: 'utf8'});
	} catch (exception) {}

	// MINIBLOX CONNECTION
	ClientSocket.once('connect', () => {
		ClientSocket.sendPacket(new SPacketLoginStart({
			requestedUuid: void 0,
			session: session,
			hydration: '0',
			metricsId: uuid(),
			clientVersion: VERSION
		}));
	});
	ClientSocket.once('CPacketJoinGame', packet => {
		if (!packet.canConnect) {
			client.end(packet.errorMessage ?? 'Disconnected');
			return;
		}

		if (!requeue) {
			client.write('login', {
				entityId: handlers.entity.local.mcId,
				gameMode: GAMEMODES[packet.gamemode ?? 'survival'],
				dimension: 0,
				difficulty: 2,
				maxPlayers: server.maxPlayers,
				levelType: 'default',
				reducedDebugInfo: false
			});
		}
	});

	ClientSocket.socket.io.on('reconnect_failed', () => {
		client.end('Failed to connect to the server.');
	});
	ClientSocket.on('disconnect', reason => {
		if (skipKick > Date.now()) return;
		client.end(reason);
	});
	Object.values(handlers).forEach((handler) => handler.miniblox(gameType));

	ClientSocket.connect();
}

server.on('playerJoin', async function(client) {
	if (connected) {
		client.end('A player is already logged in!');
		return;
	}

	client.on('end', function() {
		if (ClientSocket.socket) ClientSocket.disconnect();
		cleanup();
	});

	Object.values(handlers).forEach((handler) => handler.minecraft(client));

	await connect(client);
	connected = !client.ended;
});

Object.values(handlers).forEach((handler) => handler.obtainHandlers(handlers, connect));
console.log('\x1b[33mMiniblox Translation Layer Started!\nDeveloped & maintained by 7GrandDad (https://youtube.com/c/7GrandDadVape)\nVersion: ' + VERSION + '\x1b[0m');