module.exports = {
    /**
     * 
     * @param {import('minecraft-protocol').ServerClient} cl the client to use to send the data
     * @param {string} channel the channel to send the custom packet over
     * @param {Buffer} data the data to send in the custom packet channel
     */
    sendPacket(cl, channel, data) {
        cl.write('custom_payload', {
            channel,
            data
        })
    }
}