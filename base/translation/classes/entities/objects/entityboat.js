const Entity = require('../entity.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityBoat extends Entity {
	typeId = mcData.entitiesByName.Boat.id
	sendVelocityUpdates = true
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			17: {key: 17, value: 0, type: 2},
			18: {key: 18, value: 1, type: 2},
			19: {key: 19, value: 0, type: 3}
		});
	}
};