const Entity = require('../entity.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityItem extends Entity {
	typeId = mcData.entitiesByName.Item.id
	sendVelocityUpdates = true
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			10: {key: 10, value: {blockId: -1}, type: 5}
		});
	}
};