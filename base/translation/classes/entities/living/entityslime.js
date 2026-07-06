const EntityLivingBase = require('../entitylivingbase.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntitySlime extends EntityLivingBase {
	typeId = mcData.entitiesByName.Slime.id
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			16: {key: 16, value: 1, type: 0}
		});
	}
};