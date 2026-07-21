const granddad = ['ewogICJ0aW1lc3RhbXAiIDogMTcyNDA0NTQyNTAyNSwKICAicHJvZmlsZUlkIiA6ICJjOGFjMDFmZWE4YTQ0MGI2OTIyNDM4NmVhZDMxMmJmOSIsCiAgInByb2ZpbGVOYW1lIiA6ICI3R3JhbmREYWQiLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOTQxZWU2OGQzNTJlNGQ3ZDdiNjlmNDViZTYwNzNjZjkyZTAzYWVmNjlkOTJiOTMzMzc2N2Q0NTYwMDdiMWQ3IgogICAgfQogIH0KfQ==', 'oQKmMZjfv1oDEBaloV4gH/y2I1IkUVycZFjO0cvsKxZnXatNAX/dq1wZvb1bnRYzIXT5cIaoWG5u5EvrDwgIbENhZZLZRPPCTdVUu14GCd5Tx57l7AwQRo1EU8iXfwHb6/bBIUsHAQTs6I7hcR+ObaF1hInEHaT9e8p6iUypiTMv/sPpBGLQWvlfkl8PvLHYOf4F7x3NgtA4FCY4/u9chWT0HbYYd3KIOxCTBIRTTTnfRoUcWH+rTD6O6PAMPNdGMP4l8b0RjLqD4xzckBF+hgIqUDkuDAmAUhuIszGo9pPf87TlrK1ZSVAZs879Cl4EqFecQU17VcIgYTizRZi3AibdAzn9IPPdkEbWXL0hTg/6d8gguV8jWdNOdnxIWDVQPt2KLo8FLgxaN4Ww5EOXQE9MhJmAXxEku/d5mFvz0QIu7cX04oVx9BbP6XnKblCn1Wc8GIJrvx4WtthYYE8UDJXTQx3CcW/RukjespTiudJIyOnBjXbBTFI5v2CfUi8ZWhzvqqOFZGIM0PJe5SSYReLTDdMfDzKdbEFsG/+iekqJ6+gro3K4Lqqtg/bmzEtyAoMocyisqpE3PaNehYTnGv0xz4SPfQiaRt9LoPhDoqYYVPGXYIaJA1e+l/pZCQcHgcwj0Hp+w2zTW50xJFzULuDa9NoZaoTm8FUzWZWTlw8='];

module.exports = class TablistHandler {
	players = {}
	uuids = {}
	constructor(client) {
		this.client = client;
	}
	add(index, entry, isLocal) {
		entry.uuid ??= crypto.randomUUID(); // bots don't have UUIDs
		const name = isLocal ? this.client.username : entry.name.slice(0, 16);
		const uuid = entry.uuid;
		this.uuids[index] = uuid;
		this.players[index] = {
			prefix: entry.prefix ?? '',
			suffix: entry.suffix ?? '',
			ping: entry.ping ?? 0,
			gamemode: entry.gamemode ?? 0,
			name: name,
			isLocal: isLocal
		};

		const skin = isLocal ? granddad : (entry.skin ?? granddad);
		this.client.write('player_info', {
			action: 0,
			data: [{
				UUID: uuid,
				name: name,
				properties: [{name: 'textures', value: skin[0], signature: skin[1]}],
				gamemode: entry.gamemode ?? 0,
				ping: entry.ping ?? 0
			}]
		});

		this.updateTeam(entry, uuid);
	}
	remove(index) {
		if (this.players[index] != undefined) {
			this.client.write('player_info', {
				action: 4,
				data: [{
					UUID: this.uuids[index]
				}]
			});

			this.client.write('scoreboard_team', {
				team: this.uuids[index].slice(0, 16),
				mode: 1
			});

			delete this.uuids[index];
			delete this.players[index];
		}
	}
	clear() {
		this.client.write('player_info', {
			action: 4,
			data: Object.values(this.uuids).map((uuid) => {
				return {UUID: uuid};
			})
		});

		for (const uuid of Object.values(this.uuids)) {
			this.client.write('scoreboard_team', {
				team: uuid.slice(0, 16),
				mode: 1
			});
		}

		this.uuids = {};
		this.players = {};
	}
	updateGamemode(index, gamemode) {
		const entry = this.players[index];
		if (entry != undefined && entry.gamemode != (gamemode ?? 0)) {
			entry.gamemode = gamemode ?? 0;
			this.client.write('player_info', {
				action: 1,
				data: [{
					UUID: this.uuids[index],
					gamemode: entry.gamemode
				}]
			});
		}
	}
	updatePing(index, ping) {
		const entry = this.players[index];
		if (entry != undefined && entry.ping != (ping ?? 0)) {
			entry.ping = ping ?? 0;
			this.client.write('player_info', {
				action: 2,
				data: [{
					UUID: this.uuids[index],
					ping: entry.ping
				}]
			});
		}
	}
	updatePrefix(index, prefix) {
		const entry = this.players[index];
		if (entry != undefined && entry.prefix != (prefix ?? '')) {
			entry.prefix = prefix ?? '';
			this.updateTeam(entry, this.uuids[index], true);
		}
	}
	updateSuffix(index, suffix) {
		const entry = this.players[index];
		if (entry != undefined && entry.suffix != (suffix ?? '')) {
			entry.suffix = suffix ?? '';
			this.updateTeam(entry, this.uuids[index], true);
		}
	}
	updateSkin(index, skin) {
		const entry = this.players[index];
		if (entry != undefined) {
			entry.skin = skin;
			this.remove(index);
			this.add(index, entry, entry.isLocal);
		}
	}
	updateTeam(entry, uuid, doRemove) {
		if (doRemove) {
			this.client.write('scoreboard_team', {
				team: uuid.slice(0, 16),
				mode: 1
			});
		}

		this.client.write('scoreboard_team', {
			team: uuid.slice(0, 16),
			mode: 0,
			name: uuid.slice(0, 32),
			prefix: entry.prefix ?? '',
			suffix: entry.suffix ?? '',
			friendlyFire: true,
			nameTagVisibility: 'all',
			color: entry.color ?? 0,
			players: [entry.name]
		});
	}
};