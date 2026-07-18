const readSendPacket = require('./c2s/sendPacket');
const writeReceivePacket = require('./s2c/receivePacket');

module.exports = {
	readSendPacket,
	writeReceivePacket
};