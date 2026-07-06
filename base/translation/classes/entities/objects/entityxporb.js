const Entity = require('../entity.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = class EntityXPOrb extends Entity {
	constructor(index) {
		super(index);
	}
    createSpawnPacket() {
        this.world.client.write('spawn_entity_experience_orb', {
			entityId: this.minecraftId,
			x: this.pos.x * 32,
			y: this.pos.y * 32,
			z: this.pos.z * 32,
			count: this.count ?? 1
		});
    }
};