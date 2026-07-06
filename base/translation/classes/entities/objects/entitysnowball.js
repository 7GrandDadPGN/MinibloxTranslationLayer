const EntityThrowable = require('./entitythrowable.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntitySnowball extends EntityThrowable {
	typeId = mcData.entitiesByName.Snowball.id
	sendVelocityUpdates = true
};