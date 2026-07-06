const EntityThrowable = require('./entitythrowable.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityEgg extends EntityThrowable {
	typeId = mcData.entitiesByName.ThrownEgg.id
	sendVelocityUpdates = true
};