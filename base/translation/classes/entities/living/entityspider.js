const EntityLivingBase = require('../entitylivingbase.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntitySpider extends EntityLivingBase {
	typeId = mcData.entitiesByName.Spider.id
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			16: {key: 16, value: 0, type: 0}
		});
	}
};