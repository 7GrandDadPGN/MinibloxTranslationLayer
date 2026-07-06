const Entity = require('../entity.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityPrimedTnt extends Entity {
	typeId = mcData.entitiesByName.PrimedTnt.id
	sendVelocityUpdates = true
};