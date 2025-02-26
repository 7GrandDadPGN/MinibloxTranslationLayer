import { PBItemStack } from './main.js';
import ITEMS from './types/items.js';
import { COLOR_PALETTE, COLOR_REGEX, COLOR_CODES } from './types/colors.js';
export { LEVEL_TO_COLOUR } from './types/colors.js';

export function colorDistance(color1, color2) {
	const rgb1 = hexToRgb(color1);
	const rgb2 = hexToRgb(color2);
	return Math.sqrt(
		Math.pow(rgb1.r - rgb2.r, 2) +
		Math.pow(rgb1.g - rgb2.g, 2) +
		Math.pow(rgb1.b - rgb2.b, 2)
	);
}

export function findClosestColor(hex) {
	let closestColor = null;
	let closestDistance = Infinity;
	for (const color in COLOR_PALETTE) {
		const distance = colorDistance(hex, color);
		if (distance < closestDistance) {
			closestDistance = distance;
			closestColor = color;
		}
	}
	return COLOR_PALETTE[closestColor];
}

export function hexToRgb(hex) {
	const bigint = parseInt(hex.slice(1), 16);
	return {
		r: (bigint >> 16) & 255,
		g: (bigint >> 8) & 255,
		b: bigint & 255
	};
}

export function translateItem(item) {
	let data;
	if (item.data) {
		let parsed = JSON.parse(item.data);
		if (parsed.ench) {
			let enchants = [];
			for (const ench of parsed.ench) {
				enchants.push({lvl: {type: "short", value: ench.lvl}, id: {type: "short", value: ench.id}});
			}
			data = {
				name: "",
				type: "compound",
				value: {
					ench: {
						type: "list",
						value: {
							type: "compound",
							value: enchants
						}
					}
				}
			};
		}
	}

	const itemData = item.present && (ITEMS[item.id] ?? 166);
	return item.present ? {
		blockId: typeof itemData == 'number' ? itemData : itemData[0],
		itemCount: item.stackSize,
		itemDamage: (typeof itemData == 'number' ? item.durability : itemData[1]),
		nbtData: data
	} : {blockId: -1}
}

export function translateItemBack(item) {
	let itemId;
	let data = void 0;
	for (const [mini, mc] of Object.entries(ITEMS)) {
		const compared = typeof mc == 'number' ? mc : mc[0];
		if (item.blockId === compared && item != 166) {
			itemId = Number.parseInt(mini);
			break;
		}
	}

	if (item.nbtData && item.nbtData.value.ench) {
		data = {ench: []};
		for (const ench of item.nbtData.value.ench.value.value) {
			data.ench.push({id: ench.id.value, lvl: ench.lvl.value});
		}
		data = JSON.stringify(data);
	}

	return itemId != undefined ? new PBItemStack({
		present: true,
		id: itemId,
		stackSize: item.itemCount,
		durability: Math.floor(item.itemDamage),
		data: data
	}) : new PBItemStack({present: false});
}

export function translateText(text) {
	for (const [code, color] of Object.entries(COLOR_CODES)) text = text.replaceAll(code, color);
	return text.replaceAll(COLOR_REGEX, (match) => {return findClosestColor(match.replaceAll("\\",''))});
}