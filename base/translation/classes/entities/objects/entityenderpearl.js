const EntityThrowable = require('./entitythrowable.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityEnderPearl extends EntityThrowable {
	typeId = mcData.entitiesByName.ThrownEnderpearl.id
	sendVelocityUpdates = true
};