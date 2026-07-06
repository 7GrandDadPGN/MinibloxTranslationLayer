const EntityPlayer = require('./entityplayer.js');

module.exports = class EntityPlayerSP extends EntityPlayer {
	isLoaded = true
	constructor() {
		super();
		this.minecraftId = 1;
	}
	createSpawnPacket() {}
};