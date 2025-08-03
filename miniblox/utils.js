// Imports
const { PBItemStack } = require('./main.js');
const ITEMS = require('./types/items.js');
const { COLOR_PALETTE, COLOR_REGEX, COLOR_CODES, LEVEL_TO_COLOUR } = require('./types/colors.js');

// Color Handling
function hexToRgb(hex) {
    if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) throw new Error(`Invalid hex color: ${hex}`);
    const cleanHex = hex.replace(/^#/, '');
    const bigint = parseInt(cleanHex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function colorDistance(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    return Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
}

function findClosestColor(hex) {
    let minDist = Infinity;
    let bestMatch = null;
    for (const candidateHex in COLOR_PALETTE) {
        try {
            const dist = colorDistance(hex, candidateHex);
            if (dist < minDist) {
                minDist = dist;
                bestMatch = candidateHex;
            }
        } catch {}
    }
    return bestMatch ? COLOR_PALETTE[bestMatch] : null;
}

// Text Translation
function translateText(text) {
    let replaced = text;
    for (const [code, color] of Object.entries(COLOR_CODES)) {
        replaced = replaced.replaceAll(code, color);
    }
    return replaced.replaceAll(COLOR_REGEX, (match) => {
        try {
            return findClosestColor(match.replaceAll("\\", ''));
        } catch {
            return match;
        }
    });
}

// Item Translation
function parseEnchants(data) {
    const parsed = JSON.parse(data);
    if (!parsed.ench) return undefined;

    const enchants = parsed.ench.map(ench => ({
        lvl: { type: "short", value: ench.lvl },
        id: { type: "short", value: ench.id }
    }));

    return {
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

function translateItem(item) {
    if (!item.present) return { blockId: -1 };

    const itemData = ITEMS[item.id] ?? 166;
    const blockId = typeof itemData === 'number' ? itemData : itemData[0];
    const itemDamage = typeof itemData === 'number' ? item.durability : itemData[1];
    const nbtData = item.data ? parseEnchants(item.data) : undefined;

    return {
        blockId,
        itemCount: item.stackSize,
        itemDamage,
        nbtData
    };
}

function translateItemBack(item) {
    const itemId = Object.entries(ITEMS).find(([key, val]) => {
        const blockMatch = typeof val === 'number' ? val : val[0];
        return item.blockId === blockMatch && item.blockId !== 166;
    })?.[0];

    let data;
    if (item.nbtData?.value?.ench?.value?.value) {
        data = JSON.stringify({
            ench: item.nbtData.value.ench.value.value.map(e => ({
                id: e.id.value,
                lvl: e.lvl.value
            }))
        });
    }

    return itemId ? new PBItemStack({
        present: true,
        id: parseInt(itemId),
        stackSize: item.itemCount,
        durability: Math.floor(item.itemDamage),
        data
    }) : new PBItemStack({ present: false });
}

// Module Export
module.exports = {
    translateItem,
    translateItemBack,
    translateText,
    LEVEL_TO_COLOUR
};
