const Handler = require('./../handler.js');
const { ClientSocket } = require('./../../main.js');
const { translateText } = require('./../../utils.js');
const SKINS = require('./../../types/skins.js');
let client;

const self = class TabListHandler extends Handler {
	miniblox() {
		ClientSocket.on('CPacketScoreboard', packet => {
			if (this.score.length > 0) {
				client.write('scoreboard_objective', {
					name: 'scoreboard',
					action: 1
				});
				this.score = [];
			}

			client.write('scoreboard_objective', {
				name: 'scoreboard',
				action: 0,
				displayText: translateText(packet.title),
				type: 'INTEGER'
			});
			client.write('scoreboard_display_objective', {
				position: 1,
				name: 'scoreboard'
			});
			if (packet.content.length < 15) {
				packet.content.push({columns: ['']});
				packet.content.push({columns: ['\\yellow\\miniblox.io']});
			}

			let index = 0;
			for (const line of packet.content) {
				const name = translateText(line.columns.join(' '));
				this.score.push(name.slice(0, 40));
				client.write('scoreboard_score', {
					scoreName: 'scoreboard',
					itemName: name,
					action: 0,
					value: packet.content.length - index
				});
				index++;
			}
		});
		ClientSocket.on('CPacketUpdateScoreboard', packet => {
			if (!this.score[packet.index]) return;
			const name = translateText(packet.columns.join(' '));
			client.write('scoreboard_score', {
				scoreName: 'scoreboard',
				itemName: this.score[packet.index],
				action: 1
			});
			client.write('scoreboard_score', {
				scoreName: 'scoreboard',
				itemName: name,
				action: 0,
				value: this.score.length - packet.index
			});
			this.score[packet.index] = name;
		});
	}
	minecraft(mcClient) {
		client = mcClient;
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
		if (client) {
			client.write('scoreboard_objective', {
				name: 'scoreboard',
				action: 1
			});
		}
		this.score = [];
	}
};

module.exports = new self();