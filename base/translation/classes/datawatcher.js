module.exports = class DataWatcher {
	data = {}
	constructor(entity, defaultData) {
		this.entity = entity;

		if (defaultData != undefined) {
			Object.assign(this.data, defaultData);
		}
	}
	updateObject(id, value, noUpdate) {
		if (this.data[id] != undefined) {
			this.data[id].value = value;

			if (this.entity.isLoaded && !noUpdate) {
				this.entity.world.client.write('entity_metadata', {
					entityId: this.entity.minecraftId,
					metadata: [this.data[id]]
				});
			}
		}
	}
	getObject(id) {
		return this.data[id].value;
	}
	updateAll() {
		if (this.entity.isLoaded) {
			this.entity.world.client.write('entity_metadata', {
				entityId: this.entity.minecraftId,
				metadata: Object.values(this.data)
			});
		}
	}
};