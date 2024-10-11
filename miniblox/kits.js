const mcData = require('minecraft-data')("1.8.9");

function make_item(item,name,lore){
	return {
		blockId: item.id,
		itemCount: 1,
		nbtData: {
			type: "compound",
			name: "",
			value: {
				display: {
					type: "compound",
					value: {
						Name: {
							type: "string",
							value: name
						},
						
						Lore: {
						type: "list",
						value: {
							type: "string",
							value: lore
						}
					},
					}
				}
			}
		}
	};
}

let KITPVP_KITS = {
	knight: make_item(mcData.itemsByName.iron_sword, "Knight", ["Good ol' sword and armor"]),
	archer: make_item(mcData.itemsByName.bow, "Archer", ["Start with a bow and some arrows"]),
	tank: make_item(mcData.itemsByName.diamond_chestplate, "Tank", ["Tanky but slow"])
};


module.exports = KITPVP_KITS