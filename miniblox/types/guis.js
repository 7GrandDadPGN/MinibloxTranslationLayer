import { SPacketMessage, SPacketCloseWindow } from './../main.js';
const mcData = (await import('minecraft-data')).default("1.8.9");

// thanks again roblox thot :money:
function make_item(item) {
	const realItem = mcData.itemsByName[item.item];
	if (!realItem) return {blockId: -1};
	return {
		blockId: realItem.id,
		itemCount: 1,
		itemDamage: item.itemDamage,
		nbtData: {
			type: "compound",
			name: "",
			value: {
				display: {
					type: "compound",
					value: {
						Name: {
							type: "string",
							value: item.name ?? realItem.displayName
						},
						Lore: {
							type: "list",
							value: {
								type: "string",
								value: item.lore ?? []
							}
						}
					}
				}
			}
		}
	};
}

const replacementNames = {
	wool: "white_wool",
	planks: "oak_planks",
	clay: "terracotta"
}

function updateGui(gui, client) {
	const contents = Array((Math.ceil(gui.items.length / 9) * 9)).fill({blockId: -1});
	for (let i = 0; i < gui.items.length; i++) {
		contents[i] = gui.items[i];
	}

	client.write('set_slot', {
		windowId: -1,
		slot: -1,
		item: {blockId: -1}
	});
	client.write('window_items', {
		windowId: 255,
		items: contents
	});
}

export const SLOTS = {
	0: 36,
	1: 37,
	2: 38,
	3: 39,
	4: 40,
	5: 41,
	6: 42,
	7: 43,
	8: 44,
	36: 5,
	37: 6,
	38: 7,
	39: 8
};
export const WINDOW_NAMES = {
	'Chest': '{"translate":"container.chest"}',
	'Large Chest': '{"translate":"container.chestDouble"}',
	'Ender Chest': '{"translate":"container.enderchest"}',
	'Furnace': '{"translate":"container.furnace"}'
};
export const WINDOW_TYPES = {
	chest: 'minecraft:chest',
	container: 'minecraft:container',
	furnace: 'minecraft:furnace'
};
export const GUIS = {
	'KitPvP Kit': {
		name: "Kits",
		command: function (item, ClientSocket, client) {
			if (item.nbtData) {
				const itemName = item.nbtData.value.display.value.Name.value;
				ClientSocket.sendPacket(new SPacketMessage({ text: '/kit ' + itemName.toLocaleLowerCase() }));
				ClientSocket.sendPacket(new SPacketCloseWindow({ windowId: 0 }));
				client.write('close_window', { windowId: 255 });
			}
		},
		items: [
			make_item({ name: "Knight", item: "iron_sword", lore: ["Good ol' sword and armor", "Blocking with a sword will negate all arrow damage"] }),
			make_item({ name: "Archer", item: "bow", lore: ["Start with a bow and some arrows", "Left click with a bow to fire a barrage of arrows"] }),
			make_item({ name: "Tank", item: "diamond_chestplate", lore: ["Tanky but slow", "Crouching reduces incoming damage by 50%"] }),
			make_item({ name: "Scout", item: "feather", lore: ["Fast and agile", "Permanent speed boost"] }),
			make_item({ name: "Princess", item: "golden_helmet", lore: ["Wield a special bow that packs a punch"] }),
			make_item({ name: "Medic", item: "golden_apple", lore: ["Harness the power of potions"] }),
			make_item({ name: "Slapper", item: "wooden_sword", lore: ["Slap your foes"] }),
			make_item({ name: "Pyro", item: "flint_and_steel", lore: ["Burn your enemies with fire"] }),
			make_item({ name: "Enderman", item: "ender_pearl", lore: ["Get a free ender pearl on kill"] }),
			make_item({ name: "Demolitionist", item: "tnt", lore: ["Who doesn't like explosives?"] }),
			make_item({ name: "Sloth", item: "web", lore: ["Slow your enemies"] })
		]
	},
	'Skywars Kit': {
		name: "Kits",
		command: function (item, ClientSocket, client) {
			if (item.nbtData) {
				const itemName = item.nbtData.value.display.value.Name.value;
				ClientSocket.sendPacket(new SPacketMessage({ text: '/kit ' + itemName.toLocaleLowerCase() }));
				ClientSocket.sendPacket(new SPacketCloseWindow({ windowId: 0 }));
				client.write('close_window', { windowId: 255 });
			}
		},
		items: [
			make_item({ name: "Default", item: "barrier", lore: ["Start with nothing"] }),
			make_item({ name: "Miner", item: "iron_pickaxe", lore: ["Start with a pickaxe and stone"] }),
			make_item({ name: "Rookie", item: "stone_sword", lore: ["Start with a sword and some food"] }),
			make_item({ name: "Farmer", item: "egg", lore: ["It's egg throwing time"] }),
			make_item({ name: "Hunter", item: "bow", lore: ["Start with a bow and some arrows"] }),
			make_item({ name: "The Slapper", item: "wooden_sword", lore: ["Slap your foes off the map"] }),
			make_item({ name: "Pyro", item: "flint_and_steel", lore: ["Light your enemies on fire"] }),
			make_item({ name: "Enderman", item: "ender_pearl", lore: ["Get a free ender pearl"] }),
			make_item({ name: "Princess", item: "bow", lore: ["Start with a flame bow and some arrows"] }),
			make_item({ name: "Demolitionist", item: "tnt", lore: ["BOOM BOOM BOOM"] }),
			make_item({ name: "Knight", item: "golden_helmet", lore: ["Start with shiny armor"] }),
			make_item({ name: "Troll", item: "wooden_axe", lore: ["Troll your enemies with cobwebs"] })
		]
	},
	'Item Shop': {
		name: "Item Shop",
		command: function (item, ClientSocket, client, gui) {
			if (item.nbtData) {
				const itemName = mcData.items[item.blockId] ? mcData.items[item.blockId].name : undefined;
				if (itemName) {
					ClientSocket.sendPacket(new SPacketMessage({ text: '/buy ' + (replacementNames[itemName] ?? itemName) }));
					updateGui(gui, client);
				}
			}
		},
		items: [
			make_item({ item: "wool", lore: ['Cost: 4 Iron'] }),
			make_item({ item: "clay", lore: ['Cost: 12 Iron'] }),
			make_item({ item: "glass", lore: ['Cost: 12 Iron'] }),
			make_item({ item: "end_stone", lore: ['Cost: 24 Iron'] }),
			make_item({ item: "ladder", lore: ['Cost: 4 Iron'] }),
			make_item({ item: "planks", lore: ['Cost: 4 Gold'] }),
			make_item({ item: "obsidian", lore: ['Cost: 3 Emeralds'] }),
			make_item({ item: "stone_sword", lore: ['Cost: 10 Iron'] }),
			make_item({ item: "iron_sword", lore: ['Cost: 7 Gold'] }),
			make_item({ item: "diamond_sword", lore: ['Cost: 4 Emeralds'] }),
			make_item({ name: "KB Stick", item: "stick", lore: ['Cost: 5 Gold'] }),
			make_item({ item: "arrow", lore: ['Cost: 2 Gold'] }),
			make_item({ item: "bow", lore: ['Cost: 12 Gold'] }),
			//make_item({name: "Power Bow", item: "bow", lore: ['Cost: 20 Gold']}),
			//make_item({name: "Punch Bow", item: "bow", lore: ['Cost: 4 Emeralds']}),
			make_item({ name: "Chainmail Armor", item: "chainmail_chestplate", lore: ['Cost: 24 Iron'] }),
			make_item({ name: "Iron Armor", item: "iron_chestplate", lore: ['Cost: 12 Gold'] }),
			make_item({ name: "Diamond Armor", item: "diamond_chestplate", lore: ['Cost: 6 Emeralds'] }),
			make_item({ item: "shears", lore: ['Cost: 30 Iron'] }),
			make_item({ item: "wooden_pickaxe", lore: ['Cost: 10 Iron'] }),
			make_item({ item: "stone_pickaxe", lore: ['Cost: 20 Iron'] }),
			make_item({ item: "iron_pickaxe", lore: ['Cost: 3 Gold'] }),
			make_item({ item: "diamond_pickaxe", lore: ['Cost: 6 Gold'] }),
			make_item({ item: "wooden_axe", lore: ['Cost: 10 Iron'] }),
			make_item({ item: "stone_axe", lore: ['Cost: 20 Iron'] }),
			make_item({ item: "iron_axe", lore: ['Cost: 3 Gold'] }),
			make_item({ item: "diamond_axe", lore: ['Cost: 6 Gold'] }),
			//make_item({name: "Speed Potion", item: "potion", lore: ['Cost: 1 Emerald']}),
			//make_item({name: "Jump Potion", item: "potion", lore: ['Cost: 1 Emerald']}),
			make_item({ item: "golden_apple", lore: ['Cost: 3 Gold'] }),
			make_item({ name: "Fireball", item: "fire_charge", lore: ['Cost: 40 Iron'] }),
			make_item({ item: "tnt", lore: ['Cost: 4 Gold'] }),
			make_item({ item: "water_bucket", lore: ['Cost: 1 Emerald'] }),
			make_item({ name: "Bridge Egg", item: "egg", lore: ['Cost: 2 Emeralds'] })
		]
	},
	'Upgrade Shop': {
		name: "Upgrade Shop",
		command: function (item, ClientSocket, client, gui) {
			if (item.nbtData) {
				const itemName = item.nbtData.value.display.value.Name.value;
				if (itemName) {
					ClientSocket.sendPacket(new SPacketMessage({ text: '/upgrade ' + itemName.toLocaleLowerCase() }));
					updateGui(gui, client);
				}
			}
		},
		items: [
			make_item({ name: "Sharpness", item: "iron_sword", lore: ['Cost: 4/8/16 Diamonds'] }),
			make_item({ name: "Protection", item: "iron_chestplate", lore: ['Cost: 4/8/16 Diamonds'] }),
			make_item({ name: "Haste", item: "golden_pickaxe", lore: ['Cost: 2/4 Diamonds'] }),
			make_item({ name: "HealPool", item: "beacon", lore: ['Cost: 1 Diamond'] }),
			make_item({ name: "Forge", item: "furnace", lore: ['Cost: 2/4/6/8 Diamonds'] }),
		]
	},
	'Team Select': {
		name: "Team Select",
		command: function (item, ClientSocket, client, gui) {
			if (item.nbtData) {
				const itemName = item.nbtData.value.display.value.Name.value;
				if (itemName) {
					const team = itemName.toLocaleLowerCase().split(' ')[0];
					if (team != "random") ClientSocket.sendPacket(new SPacketMessage({ text: '/team ' + team }));
					ClientSocket.sendPacket(new SPacketCloseWindow({ windowId: 0 }));
					client.write('close_window', { windowId: 255 });
				}
			}
		},
		items: [
			make_item({ name: "Random Team", item: "barrier" }),
			make_item({ name: "Red Team", item: "wool", itemDamage: 14 }),
			make_item({ name: "Blue Team", item: "wool", itemDamage: 11 }),
			make_item({ name: "Lime Team", item: "wool", itemDamage: 5 }),
			make_item({ name: "Yellow Team", item: "wool", itemDamage: 4 })
		]
	}
};