const EntityLivingBase = require('../entitylivingbase.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityCreeper extends EntityLivingBase {
	typeId = mcData.entitiesByName.Creeper.id
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			16: {key: 16, value: 255, type: 0},
			17: {key: 17, value: 0, type: 0},
			18: {key: 18, value: 0, type: 0}
		});
	}
};