const EntityLivingBase = require('../entitylivingbase.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntitySnowman extends EntityLivingBase {
	typeId = mcData.entitiesByName.SnowMan.id;
};
