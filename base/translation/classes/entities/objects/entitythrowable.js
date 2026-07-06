const Entity = require('../entity.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityThrowable extends Entity {
	constructor(index) {
		super(index);
	}
};