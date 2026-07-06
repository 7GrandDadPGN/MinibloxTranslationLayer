const EntityThrowable = require('./entitythrowable.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityPotion extends EntityThrowable {
	typeId = mcData.entitiesByName.ThrownPotion.id
	sendVelocityUpdates = true
};