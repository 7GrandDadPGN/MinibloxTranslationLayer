const { PBItemStack, BitArray } = require('./main.js');
const { BLOCKS } = require('./blocks.js');
const ITEMS = require('./items.js');
/**
 * @type {import("prismarine-chunk").PCChunk}
 */
const Chunk = require('prismarine-chunk')('1.8.9');
const Vec3 = require('vec3');
const DEG2RAD = Math.PI / 180, RAD2DEG = 180 / Math.PI, CELL_VOLUME = 16 * 16 * 16;

const COLOR_REGEX = /\\#[A-Za-z0-9]+\\/g;
const COLOR_CODES = {
	"\\lime\\": "\u00a7a",
	"\\aqua\\": "\u00a7b",
	"\\cyan\\": "\u00a7b",
	"\\red\\": "\u00a7c",
	"\\pink\\": "\u00a7d",
	"\\yellow\\": "\u00a7e",
	"\\white\\": "\u00a7f",
	"\\green\\": "\u00a72",
	"\\orange\\": "\u00a76",
	"\\gold\\": "\u00a76",
	"\\gray\\": "\u00a77",
	"\\grey\\": "\u00a77",
	"\\silver\\": "\u00a77",
	"\\blue\\": "\u00a79",
	"\\black\\": "\u00a70",
	"\\bold\\": "\u00a7l",
	"\\italic\\": "\u00a7o",
	"\\reset\\": "\u00a7r",
	"\\glow\\": ""
};
const COLOR_PALETTE = {
	"#AA0000": "\u00a7a",
	"#FF5555": "\u00A7c",
	"#FFAA00": "\u00A76",
	"#FFFF55": "\u00A7e",
	"#00AA00": "\u00A72",
	"#55FF55": "\u00A7a",
	"#55FFFF": "\u00A7b",
	"#00AAAA": "\u00A73",
	"#0000AA": "\u00A71",
	"#5555FF": "\u00A79",
	"#FF55FF": "\u00A7d",
	"#AA00AA": "\u00A75",
	"#FFFFFF": "\u00A7f",
	"#AAAAAA": "\u00A77",
	"#555555": "\u00A78",
	"#000000": "\u00A70"
};
const LEVEL_TO_COLOUR = {
	0: "#aba9a5",
	1: "#afa99d",
	2: "#b3a995",
	3: "#b7a98d",
	4: "#bba885",
	5: "#c0a87d",
	6: "#c4a875",
	7: "#c9a669",
	8: "#d2a159",
	9: "#da9c4a",
	10: "#e2973a",
	11: "#ea922a",
	12: "#f28d1a",
	13: "#fa880a",
	14: "#ff8700",
	15: "#ff8e00",
	16: "#ff9400",
	17: "#ff9a00",
	18: "#ffa100",
	19: "#ffa700",
	20: "#ffae00",
	21: "#ffb400",
	22: "#ffba00",
	23: "#fec100",
	24: "#fcc802",
	25: "#facf03",
	26: "#f8d605",
	27: "#f6dd06",
	28: "#f4e407",
	29: "#f2ea09",
	30: "#ecf00a",
	31: "#d9f209",
	32: "#c6f308",
	33: "#b3f507",
	34: "#a0f606",
	35: "#8df805",
	36: "#7af904",
	37: "#67fb03",
	38: "#54fc02",
	39: "#41fe01",
	40: "#30ff02",
	41: "#33ff1a",
	42: "#36ff31",
	43: "#38ff49",
	44: "#3bff61",
	45: "#3eff78",
	46: "#40ff90",
	47: "#43ffa7",
	48: "#46ffbf",
	49: "#48ffd6",
	50: "#4bffee",
	51: "#44eff0",
	52: "#3cdff1",
	53: "#35cff3",
	54: "#2dc0f5",
	55: "#26b0f6",
	56: "#1ea0f8",
	57: "#1790fa",
	58: "#1080fb",
	59: "#0870fd",
	60: "#0161ff",
	61: "#0a5bfb",
	62: "#1656f7",
	63: "#2251f4",
	64: "#2d4cf0",
	65: "#3948ec",
	66: "#4443e8",
	67: "#503ee4",
	68: "#5c39e0",
	69: "#6735dc",
	70: "#7330d8",
	71: "#7a2ddb",
	72: "#812be0",
	73: "#8828e5",
	74: "#8e26ea",
	75: "#9523ef",
	76: "#9c21f4",
	77: "#a21ef9",
	78: "#a91cfe",
	79: "#af1dfd",
	80: "#b421fa",
	81: "#b924f7",
	82: "#be28f5",
	83: "#c32bf2",
	84: "#c82eef",
	85: "#cd32ec",
	86: "#d235ea",
	87: "#d738e7",
	88: "#dc3ce4",
	89: "#e03ad8",
	90: "#e235c5",
	91: "#e530b2",
	92: "#e82ba0",
	93: "#eb278d",
	94: "#ed227b",
	95: "#f01d68",
	96: "#f31856",
	97: "#f51343",
	98: "#f80e30",
	99: "#fb091e",
	100: "#fe0404"
};

/**
 * 
 * @param {string} color1 Hex color #1
 * @param {string} color2 Hex color #2
 * @returns {number} The distance between {@link color1} and {@link color2} as a number.
 */
function colorDistance(color1, color2) {
	const rgb1 = hexToRgb(color1);
	const rgb2 = hexToRgb(color2);
	return Math.sqrt(
		Math.pow(rgb1.r - rgb2.r, 2) +
		Math.pow(rgb1.g - rgb2.g, 2) +
		Math.pow(rgb1.b - rgb2.b, 2)
	);
}

/**
 * Converts {@link num} to a byte.
 * @param {number} num The number to convert to a byte.
 * @returns {number} The number as a byte.
 */
function convertToByte(num) {
	num &= 0xFF;
	num = num > 127 ? num - 256 : num;
	return num;
}

/**
 * Converts a radian angle into a Miniblox byte angle or whatever
 * @param {number} ang The angle in radians
 * @param {boolean} ignore Controls if the angle shouldn't be divided by 256 and multiplied by Math.PI & 2
 * @param {number} num a number (lol)
 * @returns 
 */
function convertAngle(ang, ignore, num) {
	if (!ignore) ang = ang / 256 * Math.PI * 2;
	ang = (((ang * -1) * RAD2DEG) - (num != undefined ? num : 0)) * 256 / 360;
	return convertToByte(ang);
}

function clampByte(byte) {
	return Math.min(Math.max(byte, -128), 127);
}

function clampToBox(pos, box) {
	box = convertServerPos(box);
	return [Math.min(Math.max(pos.x, box.x - 0.4), box.x + 0.4), Math.min(Math.max(pos.y + 1.62, box.y - 0.1), box.y + 1.9), Math.min(Math.max(pos.z, box.z - 0.4), box.z + 0.4)]
}

/**
 * Converts a Vector 3 position to a server position by dividing its `x`, `y`, and `z` by 32.
 * @param {import("vec3").Vec3} pos The position to convert to a server position
 * @returns {@link pos} as a server position (`x / 32`, `y / 32`, and `z / 32`)
 */
function convertServerPos(pos) {
	return {x: pos.x / 32, y: pos.y / 32, z: pos.z / 32};
}

/**
 * Converts a chunk packet to a Minecraft chunk.
 * @param {import("./main.js").CPacketChunkData} packet The chunk packet.
 * @returns {import("prismarine-chunk").PCChunk} The chunk, as a Minecraft chunk.
 */
function createChunk(packet) {
	const chunk = new Chunk();
	for (const cell of packet.cells) {
		const array = new BitArray(CELL_VOLUME, cell.bitsPerEntry, cell.bitArray);
		if (!array) continue;
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				for (let skyY = 0; skyY < 256; skyY++) {
					chunk.setSkyLight(new Vec3(x, skyY, z), 15);
				}
				for (let y = 0; y < 16; y++) {
					const offset = array.get(getBlockIndex(x, y, z));
					if (offset == 0 || cell.palette.length <= 0) continue;
					const blockdata = BLOCKS[cell.palette[offset]] ?? BLOCKS[9];

					chunk.setBlockType(new Vec3(x, cell.y + y, z), typeof blockdata == 'number' ? blockdata : blockdata[0]);
					chunk.setBlockData(new Vec3(x, cell.y + y, z), typeof blockdata == 'number' ? 0 : blockdata[1]);
				}
			}
		}
	}
	return chunk;
}

/**
 * 
 * @param {string} hex The hex value to return the closest Minecraft color of.
 * @returns {string} The closest Minecraft color to {@link hex}.
 */
function findClosestColor(hex) {
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

/**
 * Gets the block index at the provided X, Y, and Z.
 * @param {number} x
 * @param {number} y 
 * @param {number} z 
 * @returns {number} The block index.
 */
function getBlockIndex(x, y, z) {
	return (y & 15) << 8 | (z & 15) << 4 | x & 15
}

/**
 * 
 * @param {string} hex The hex color code.
 * @returns {{r: number, g: number, b: number}} {@link hex} in RGB format.
 */
function hexToRgb(hex) {
	const bigint = parseInt(hex.slice(1), 16);
	return {
		r: (bigint >> 16) & 255,
		g: (bigint >> 8) & 255,
		b: bigint & 255
	};
}

/**
 * Translates a Miniblox item into a Minecraft item.
 * @param {typeof PBItemStack} item The Miniblox item to translate to a minecraft item.
 * @returns {Item} {@link item} as a Minecraft item.
 */
function translateItem(item) {
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

/**
 * Converts {@link item} from a Minecraft item to a Miniblox item.
 * @param {*} item The Minecraft item.
 * @returns {@link item} as a Miniblox item.
 */
function translateItemBack(item) {
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

/**
 * Translate {@link text} from Miniblox-formatted text to Minecraft-formatted text.
 * @param {string} text Miniblox text
 * @returns {string} The Minecraft version of {@link text}.
 */
function translateText(text) {
	for (const [code, color] of Object.entries(COLOR_CODES)) text = text.replaceAll(code, color);
	return text.replaceAll(COLOR_REGEX, (match) => {return findClosestColor(match.replaceAll("\\",''))});
}

module.exports = { convertToByte, convertAngle, clampByte, clampToBox, convertServerPos, createChunk, translateItem, translateItemBack, translateText, LEVEL_TO_COLOUR };