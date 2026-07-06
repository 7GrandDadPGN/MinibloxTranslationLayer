module.exports = class ProxyChunk {
	isLoaded = false
	constructor(x, z, data) {
		this.x = x;
		this.z = z;
		this.data = data;
	}
	load() {
		if (!this.isLoaded) {
			this.isLoaded = true;
			this.world.client.write('map_chunk', {
				x: this.x,
				z: this.z,
				groundUp: true,
				bitMap: this.data.getMask(),
				chunkData: this.data.dump()
			});

			this.world.tickEntitiesInChunk(this.x, this.z);
		}
	}
	unload() {
		if (this.isLoaded) {
			this.isLoaded = false;
			this.world.tickEntitiesInChunk(this.x, this.z);

			this.world.client.write('map_chunk', {
				x: this.x,
				z: this.z,
				groundUp: true,
				bitMap: 0,
				chunkData: []
			});
		}
	}
};