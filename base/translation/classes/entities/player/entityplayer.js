const EntityLivingBase = require('../entitylivingbase.js');

module.exports = class EntityPlayer extends EntityLivingBase {
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			10: {key: 10, value: 127, type: 0},
			16: {key: 16, value: 0, type: 0},
			17: {key: 17, value: 0, type: 3},
			18: {key: 18, value: 0, type: 2}
		});
	}
};