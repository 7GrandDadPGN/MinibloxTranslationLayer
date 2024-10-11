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
	knight: make_item(mcData.itemsByName.iron_sword, "Knight", ["Good ol' sword and armor","Blocking with a sword will negate all arrow damage"]),
	archer: make_item(mcData.itemsByName.bow, "Archer", ["Start with a bow and some arrows","Left click with a bow to fire a barrage of arrows"]),
	tank: make_item(mcData.itemsByName.diamond_chestplate, "Tank", ["Tanky but slow","Crouching reduces incoming damage by 50%"])
};


module.exports = KITPVP_KITS