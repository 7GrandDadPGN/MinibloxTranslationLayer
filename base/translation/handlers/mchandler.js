const World = require('../classes/world.js');

module.exports = class MCHandler {
	createWorld(client, isFirst, difficulty, dimensionId) {
		this.deleteWorld();
		this.world = new World(dimensionId ?? 0, difficulty ?? 0);
		this.world.start(client, isFirst, this);
		return this.world;
	}
	deleteWorld() {
		if (this.world != undefined) {
			this.world.stop();

			this.world = undefined;
			this.local = undefined;
			this.tablist = undefined;
		}
	}
};