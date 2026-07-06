const Entity = require('./entity.js');

function convertToByte(num) {
	num &= 0xFF;
	num = num > 127 ? num - 256 : num;
	return num;
};

module.exports = class EntityLivingBase extends Entity {
	equipment = []
	attributeMap = []
	activePotionsMap = {}
	constructor(index) {
		super(index);
		Object.assign(this.dataWatcher.data, {
			6: {key: 6, value: 20, type: 3},
			7: {key: 7, value: 0, type: 2},
			8: {key: 8, value: 0, type: 0},
			9: {key: 9, value: 0, type: 0}
		});
	}
	createSpawnPacket() {
		this.world.client.write('spawn_entity_living', {
			entityId: this.minecraftId,
			type: this.typeId,
			x: this.pos.x * 32,
			y: this.pos.y * 32,
			z: this.pos.z * 32,
			yaw: convertToByte(this.yaw),
			pitch: convertToByte(this.pitch),
			headPitch: convertToByte(this.pitch),
			velocityX: Math.max(Math.min(this.motion.x * 8000, 32767), -32768),
			velocityY: Math.max(Math.min(this.motion.y * 8000, 32767), -32768),
			velocityZ: Math.max(Math.min(this.motion.z * 8000, 32767), -32768),
			metadata: []
		});
	}
	updateEquipment(slot, item) {
		this.equipment[slot] = item ?? {blockId: -1};

		if (this.isLoaded) {
			this.world.client.write('entity_equipment', {
				entityId: this.minecraftId,
				slot: slot,
				item: this.equipment[slot]
			});
		}
	}
	updateAttributes(attributes) {
		this.attributeMap = attributes;

		if (this.isLoaded) {
			this.world.client.write('update_attributes', {
				entityId: this.minecraftId,
				properties: this.attributeMap
			});
		}
	}
	addPotionEffect(effect) {
		const isAdded = this.activePotionsMap[effect.effectId] != undefined;
		this.activePotionsMap[effect.effectId] = effect;

		if (this.isLoaded) {
			if (isAdded) {
				this.world.client.write('remove_entity_effect', {
					entityId: this.minecraftId,
					effectId: effect.effectId
				});
			}

			this.world.client.write('entity_effect', {
				entityId: this.minecraftId,
				effectId: effect.effectId,
				amplifier: effect.amplifier,
				duration: Math.max((effect.duration - Date.now()) / 50, 0),
				hideParticles: effect.hideParticles
			});
		}
	}
	removePotionEffect(id) {
		const didExist = this.activePotionsMap[id] != undefined;
		delete this.activePotionsMap[id];

		if (this.isLoaded && didExist) {
			this.world.client.write('remove_entity_effect', {
				entityId: this.minecraftId,
				effectId: id
			});
		}
	}
};