const EntityLivingBase = require('../entitylivingbase.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityCow extends EntityLivingBase {
	typeId = mcData.entitiesByName.Cow.id
};