module.exports = class RequestQueue {
	queued = {}
	queue(x, z, expireTime) {
		this.queued[x + ',' + z] = Date.now() + expireTime;
	}
	clear(x, z) {
		delete this.queued[x + ',' + z];
	}
	isInQueue(x, z) {
		return (this.queued[x + ',' + z] ?? 0) > Date.now();
	}
	getSize() {
		let size = 0;
		for (const entry of Object.values(this.queued)) {
			if (entry > Date.now()) size++;
		}

		return size;
	}
};