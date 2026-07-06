const EntityLivingBase = require('../entitylivingbase.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntitySkeleton extends EntityLivingBase {
	typeId = mcData.entitiesByName.Skeleton.id
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			13: {key: 13, value: 0, type: 0}
		});
	}
};