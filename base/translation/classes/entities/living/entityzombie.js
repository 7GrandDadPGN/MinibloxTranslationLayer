const EntityLivingBase = require('../entitylivingbase.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityZombie extends EntityLivingBase {
	typeId = mcData.entitiesByName.Zombie.id
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			12: {key: 12, value: 0, type: 0},
			13: {key: 13, value: 0, type: 0},
			14: {key: 14, value: 0, type: 0}
		});
	}
};