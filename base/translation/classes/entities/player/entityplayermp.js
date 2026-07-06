const EntityPlayer = require('./entityplayer.js');

function convertToByte(num) {
	num &= 0xFF;
	num = num > 127 ? num - 256 : num;
	return num;
};

module.exports = class EntityPlayerMP extends EntityPlayer {
	constructor(index) {
		super(index);
	}
	canSpawn() {
		return super.canSpawn() && (this.world.tablist.players[this.index] != undefined || this.bot != undefined);
	}
	createSpawnPacket() {
		if (this.bot != undefined && this.world.tablist.players[this.index.toString()] == undefined) {
			this.world.tablist.add(this.index.toString(), {name: this.bot.name ?? 'BOT'}, false);
		}

		this.world.client.write('named_entity_spawn', {
			entityId: this.minecraftId,
			playerUUID: this.world.tablist.uuids[this.index] ?? crypto.randomUUID(),
			x: this.pos.x * 32,
			y: this.pos.y * 32,
			z: this.pos.z * 32,
			yaw: convertToByte(this.yaw),
			pitch: convertToByte(this.pitch),
			currentItem: 0,
			metadata: []
		});

		if (this.bot != undefined) {
			this.world.tablist.remove(this.index.toString());
		}

		this.world.client.write('entity_head_rotation', {
			entityId: this.minecraftId,
			headYaw: convertToByte(this.yaw)
		});
	}
};