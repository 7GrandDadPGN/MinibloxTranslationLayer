> [!WARNING]
> As of 02/24/2025, you are required to send a custom movement packet alongside your usual position packets.
> For an example of this, see MovePacket.java

# MinibloxTranslationLayer
A middle man to translate Miniblox packets into Minecraft 1.8.9 packets.

## Use Steps
1. Install the latest NodeJS at (https://nodejs.org)
2. Download & extract the repository to a random folder
3. Open a terminal inside said folder
4. Run npm install & node index.js
5. Connect to localhost on a supported Minecraft 1.8.x client.

## Commands

### /play, /queue, and /q

Syntax: `/q [gamemode]` (`[gamemode]` can be autocompleted using the <kbd>TAB</kbd> key)

Joins a server matching the gamemode criteria.
`skywars` is the default gamemode

### /login

Syntax: `/login <token>`

Writes `token` to `login.token` so the translation layer can use it once you rejoin.
Rejoin for the changes to take effect.

## /join

Syntax: `/join <server ID or invite code>`

Joins a specific server.
A server ID looks like this:
`{server size, e.g. small, large, medium, or planet}-{ID 1}-{ID 2}`.
An invite code looks like this: `https://miniblox.io/join/INVITECODE` or just `INVITECODE`.
Crazy Gays invite links are not supported because no one wants it (just copy the invite code which is everything after `?join=` instead lol)

### /resync

Syntax: `/resync`

Setbacks you to the last place you were teleported to.

### /reloadchunks

Syntax: `/reloadchunks`

Reloads... the... chunks. (like <kbd>F3</kbd> + <kbd>A</kbd>)

### /next

Syntax: `/next`

Sends you to the next game using `CPacketQueueNext`, note that sometimes the server just doesn't allow this command.

## Custom payload channels

<!-- here's a useful utility to update ts: https://www.tablesgenerator.com/markdown_tables -->

| Channel Name         | Direction | Description                                              | Contents                                        |
|----------------------|-----------|----------------------------------------------------------|-------------------------------------------------|
| miniblox:send_packet | C->S      | Send a Miniblox packet                                   | packet name (string), data (JSON, string)       |
| miniblox:receive_pkt | S->C      | A packet was sent by the server that wasn't blacklisted  | packet name (string), data (JSON, msg.toJSON()) |
| layer:player         | S->C      | Sent on connect, replaces the deprecated layer:name_c2s. | player name (string), player UUID (string)      |
