const Entity = require('../entity.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityFallingBlock extends Entity {
	typeId = mcData.entitiesByName.FallingSand.id
	sendVelocityUpdates = true
};