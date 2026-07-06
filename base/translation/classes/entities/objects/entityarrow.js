const Entity = require('../entity.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityArrow extends Entity {
	typeId = mcData.entitiesByName.Arrow.id
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			16: {key: 16, value: 0, type: 0}
		});
	}
};