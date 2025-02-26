const mcData = (await import('minecraft-data')).default("1.8.9");
let BLOCKS = {}, BLOCK_ID = {};

function createStair(start, id) {
	for (let i = 0; i < 80; i++) BLOCKS[start + i] = id;
	BLOCKS[start + 1] = [id, 6];
	BLOCKS[start + 11] = [id, 2];
	BLOCKS[start + 21] = [id, 5];
	BLOCKS[start + 31] = [id, 1];
	BLOCKS[start + 41] = [id, 7];
	BLOCKS[start + 51] = [id, 3];
	BLOCKS[start + 61] = [id, 4];
	BLOCKS[start + 71] = id;
}

function createSlab(start, id, enddata) {
	for (let i = 0; i < 6; i++) BLOCKS[start + i] = id;
	BLOCKS[start + 1] = [id, 8];
	BLOCKS[start + 5] = enddata;
}

function createButton(offset, id) {
	for (let i = 0; i < 8; i += 2) {
		BLOCKS[offset + i] = [id, 13];
		BLOCKS[offset + 1 + i] = [id, 5];
	}
	for (let i = 0; i < 8; i += 2) {
		BLOCKS[offset + 16 + i] = [id, 8];
		BLOCKS[offset + 17 + i] = id;
	}
	BLOCKS[offset + 8] = [id, 11];
	BLOCKS[offset + 9] = [id, 3];
	BLOCKS[offset + 10] = [id, 10];
	BLOCKS[offset + 11] = [id, 2];
	BLOCKS[offset + 12] = [id, 12];
	BLOCKS[offset + 13] = [id, 4];
	BLOCKS[offset + 14] = [id, 9];
	BLOCKS[offset + 15] = [id, 1];
}

function createDoor(offset, id) {
	for (let i = 0; i < 64; i += 16) {
		for (let i2 = 0; i2 < 8; i2++) BLOCKS[offset + i + i2] = [id, 8 + Math.floor(i2 / 4)];
		for (let i2 = 0; i2 < 8; i2++) BLOCKS[offset + 8 + i + i2] = [id, 1 + Math.floor(i / 16)];
	}
}

function createTrapdoor(offset, id) {
	BLOCKS[offset + 3] = [id, 13];
	BLOCKS[offset + 7] = [id, 9];
	BLOCKS[offset + 11] = [id, 5];
	BLOCKS[offset + 15] = [id, 1];
	BLOCKS[offset + 19] = [id, 14];
	BLOCKS[offset + 23] = [id, 10];
	BLOCKS[offset + 27] = [id, 6];
	BLOCKS[offset + 31] = [id, 2];
	BLOCKS[offset + 35] = [id, 12];
	BLOCKS[offset + 39] = [id, 8];
	BLOCKS[offset + 43] = [id, 4];
	BLOCKS[offset + 47] = id;
	BLOCKS[offset + 51] = [id, 15];
	BLOCKS[offset + 55] = [id, 11];
	BLOCKS[offset + 59] = [id, 7];
	BLOCKS[offset + 63] = [id, 3];
}

function createTorch(offset, id) {
	BLOCKS[offset] = [id, 5];
	BLOCKS[offset + 1] = [id, 3];
	BLOCKS[offset + 2] = [id, 2];
	BLOCKS[offset + 3] = [id, 4];
	BLOCKS[offset + 4] = [id, 1];
}

BLOCKS[0] = mcData.blocksByName.air.id;
for (let i = 0; i < 7; i++) BLOCKS[1 + i] = [mcData.blocksByName.stone.id, i];
for (let i = 0; i < 2; i++) BLOCKS[8 + i] = mcData.blocksByName.grass.id;
for (let i = 0; i < 4; i++) BLOCKS[10 + i] = [mcData.blocksByName.dirt.id, Math.min(i, 2)];
BLOCKS[14] = mcData.blocksByName.cobblestone.id;
for (let i = 0; i < 6; i++) BLOCKS[15 + i] = [mcData.blocksByName.planks.id, i];
for (let i = 0; i < 6; i++) {
	BLOCKS[21 + i] = [mcData.blocksByName.sapling.id, i];
	BLOCKS[21 + i + 1] = [mcData.blocksByName.sapling.id, i + 8];
}
BLOCKS[33] = mcData.blocksByName.bedrock.id;
for (let i = 0; i < 16; i++) BLOCKS[34 + i] = [mcData.blocksByName.water.id, i];
for (let i = 0; i < 16; i++) BLOCKS[50 + i] = [mcData.blocksByName.lava.id, i];
for (let i = 0; i < 2; i++) BLOCKS[66 + i] = [mcData.blocksByName.sand.id, i];
BLOCKS[68] = mcData.blocksByName.gravel.id;
for (let i = 0; i < 2; i++) BLOCKS[69 + i] = mcData.blocksByName.gold_ore.id;
for (let i = 0; i < 2; i++) BLOCKS[71 + i] = mcData.blocksByName.iron_ore.id;
for (let i = 0; i < 2; i++) BLOCKS[73 + i] = mcData.blocksByName.coal_ore.id;
BLOCKS[75] = mcData.blocksByName.gold_ore.id;
for (let i = 0; i < 5; i++) {
	BLOCKS[76 + (i * 3)] = [mcData.blocksByName.log.id, (i % 4) + 4];
	BLOCKS[76 + (i * 3) + 1] = [mcData.blocksByName.log.id, (i % 4)];
	BLOCKS[76 + (i * 3) + 2] = [mcData.blocksByName.log.id, (i % 4) + 8];
	BLOCKS[112 + (i * 3)] = [mcData.blocksByName.log.id, (i % 4) + 12];
	BLOCKS[112 + (i * 3) + 1] = [mcData.blocksByName.log.id, (i % 4) + 12];
	BLOCKS[112 + (i * 3) + 2] = [mcData.blocksByName.log.id, (i % 4) + 12];
}
for (let i = 0; i < 2; i++) {
	BLOCKS[88 + (i * 3)] = [mcData.blocksByName.log2.id, (i % 4) + 4];
	BLOCKS[88 + (i * 3) + 1] = [mcData.blocksByName.log2.id, (i % 4)];
	BLOCKS[88 + (i * 3) + 2] = [mcData.blocksByName.log2.id, (i % 4) + 8];
	BLOCKS[124 + (i * 3)] = [mcData.blocksByName.log2.id, (i % 4) + 4];
	BLOCKS[124 + (i * 3) + 1] = [mcData.blocksByName.log2.id, (i % 4)];
	BLOCKS[124 + (i * 3) + 2] = [mcData.blocksByName.log2.id, (i % 4) + 8];
}
for (let i = 0; i < 112; i++) BLOCKS[148 + i] = [mcData.blocksByName.leaves.id, Math.floor(i / 14) % 4];
for (let i = 0; i < 2; i++) BLOCKS[260 + i] = [mcData.blocksByName.sponge.id, i];
BLOCKS[262] = mcData.blocksByName.glass.id;
for (let i = 0; i < 2; i++) BLOCKS[263 + i] = mcData.blocksByName.lapis_ore.id;
BLOCKS[265] = mcData.blocksByName.lapis_block.id;
for (let i = 0; i < 12; i++) BLOCKS[266 + i] = mcData.blocksByName.dispenser.id;
for (let i = 0; i < 3; i++) BLOCKS[278 + i] = [mcData.blocksByName.sandstone.id, i];
for (let i = 0; i < 800; i++) BLOCKS[281 + i] = mcData.blocksByName.noteblock.id;
for (let i = 0; i < 256; i += 16) {
	for (let i2 = 0; i2 < 16; i2 += 4) {
		BLOCKS[1081 + i + i2] = [mcData.blocksByName.bed.id, 8 + Math.floor(i2 / 4)];
		BLOCKS[1081 + i + i2 + 1] = [mcData.blocksByName.bed.id, 0 + Math.floor(i2 / 4)];
		BLOCKS[1081 + i + i2 + 2] = BLOCKS[1081 + i + i2];
		BLOCKS[1081 + i + i2 + 3] = BLOCKS[1081 + i + i2 + 1];
	}
}
for (let i = 0; i < 24; i++) BLOCKS[1337 + i] = [mcData.blocksByName.golden_rail.id, i % 12];
for (let i = 0; i < 24; i++) BLOCKS[1361 + i] = [mcData.blocksByName.detector_rail.id, i % 12];
for (let i = 0; i < 12; i++) BLOCKS[1385 + i] = [mcData.blocksByName.sticky_piston.id, i];
BLOCKS[1397] = mcData.blocksByName.web.id;
for (let i = 0; i < 2; i++) BLOCKS[1398 + i] = [mcData.blocksByName.tallgrass.id, 1];
BLOCKS[1400] = mcData.blocksByName.deadbush.id;
for (let i = 0; i < 3; i++) BLOCKS[1401 + i] = [mcData.blocksByName.tallgrass.id, 1];
for (let i = 0; i < 12; i++) BLOCKS[1404 + i] = [mcData.blocksByName.piston.id, i];
for (let i = 0; i < 24; i++) BLOCKS[1416 + i] = [mcData.blocksByName.piston_head.id, i];
for (let i = 0; i < 16; i++) BLOCKS[1440 + i] = [mcData.blocksByName.wool.id, i];
for (let i = 0; i < 12; i++) BLOCKS[1456 + i] = [mcData.blocksByName.piston_extension.id, i];
BLOCKS[1468] = mcData.blocksByName.yellow_flower.id;
for (let i = 0; i < 12; i++) BLOCKS[1469 + i] = [mcData.blocksByName.red_flower.id, i % 10];
BLOCKS[1481] = mcData.blocksByName.brown_mushroom.id;
BLOCKS[1482] = mcData.blocksByName.red_mushroom.id;
BLOCKS[1483] = mcData.blocksByName.gold_block.id;
BLOCKS[1484] = mcData.blocksByName.iron_block.id;
BLOCKS[1485] = mcData.blocksByName.brick_block.id;
for (let i = 0; i < 2; i++) BLOCKS[1486 + i] = [mcData.blocksByName.tnt.id, i];
BLOCKS[1488] = mcData.blocksByName.bookshelf.id;
BLOCKS[1489] = mcData.blocksByName.mossy_cobblestone.id;
BLOCKS[1490] = mcData.blocksByName.obsidian.id;
createTorch(1491, mcData.blocksByName.torch.id);
for (let i = 0; i < 513; i++) BLOCKS[1496 + i] = mcData.blocksByName.fire.id;
BLOCKS[2009] = mcData.blocksByName.mob_spawner.id;
createStair(2010, mcData.blocksByName.oak_stairs.id);
for (let i = 0; i < 6; i++) {
	BLOCKS[2090 + i] = [mcData.blocksByName.chest.id, 3];
	BLOCKS[2096 + i] = [mcData.blocksByName.chest.id, 4];
	BLOCKS[2102 + i] = [mcData.blocksByName.chest.id, 2];
	BLOCKS[2108 + i] = [mcData.blocksByName.chest.id, 5];
}
for (let i = 0; i < 1296; i++) BLOCKS[2114 + i] = mcData.blocksByName.redstone_wire.id;
for (let i = 0; i < 2; i++) BLOCKS[3410 + i] = mcData.blocksByName.diamond_ore.id;
BLOCKS[3412] = mcData.blocksByName.diamond_block.id;
BLOCKS[3413] = mcData.blocksByName.crafting_table.id;
for (let i = 0; i < 8; i++) BLOCKS[3414 + i] = [mcData.blocksByName.wheat.id, i];
for (let i = 0; i < 8; i++) BLOCKS[3422 + i] = [mcData.blocksByName.farmland.id, i];
BLOCKS[3430] = [mcData.blocksByName.lit_furnace.id, 3];
BLOCKS[3431] = [mcData.blocksByName.furnace.id, 3];
BLOCKS[3432] = [mcData.blocksByName.lit_furnace.id, 4];
BLOCKS[3433] = [mcData.blocksByName.furnace.id, 4];
BLOCKS[3434] = [mcData.blocksByName.lit_furnace.id, 2];
BLOCKS[3435] = [mcData.blocksByName.furnace.id, 2];
BLOCKS[3436] = [mcData.blocksByName.lit_furnace.id, 5];
BLOCKS[3437] = [mcData.blocksByName.furnace.id, 5];
for (let i = 0; i < 192; i++) BLOCKS[3438 + i] = [mcData.blocksByName.standing_sign.id, i % 16];
createDoor(3630, mcData.blocksByName.wooden_door.id);
for (let i = 0; i < 8; i++) BLOCKS[3694 + i] = [mcData.blocksByName.ladder.id, 2];
BLOCKS[3695] = [mcData.blocksByName.ladder.id, 3];
BLOCKS[3697] = [mcData.blocksByName.ladder.id, 4];
BLOCKS[3699] = [mcData.blocksByName.ladder.id, 2];
BLOCKS[3701] = [mcData.blocksByName.ladder.id, 5];
for (let i = 0; i < 20; i++) BLOCKS[3702 + i] = [mcData.blocksByName.rail.id, i % 10];
createStair(3722, mcData.blocksByName.stone_stairs.id);
for (let i = 0; i < 48; i += 8) {
	BLOCKS[3802 + i + 1] = [mcData.blocksByName.wall_sign.id, 3];
	BLOCKS[3802 + i + 3] = [mcData.blocksByName.wall_sign.id, 4];
	BLOCKS[3802 + i + 5] = [mcData.blocksByName.wall_sign.id, 2];
	BLOCKS[3802 + i + 7] = [mcData.blocksByName.wall_sign.id, 5];
}
for (let i = 0; i < 24; i++) BLOCKS[3850 + i] = [mcData.blocksByName.lever.id, i % 16];
for (let i = 0; i < 2; i++) BLOCKS[3874 + i] = [mcData.blocksByName.stone_pressure_plate.id, i];
createDoor(3876, mcData.blocksByName.iron_door.id);
for (let i = 0; i < 12; i++) BLOCKS[3940 + i] = [mcData.blocksByName.wooden_pressure_plate.id, i % 2];
for (let i = 0; i < 4; i++) BLOCKS[3952 + i] = mcData.blocksByName.redstone_ore.id;
for (let i = 0; i < 2; i++) BLOCKS[3956 + i] = [mcData.blocksByName.redstone_torch.id, 5];
for (let i = 0; i < 8; i++) BLOCKS[3958 + i] = [mcData.blocksByName.redstone_torch.id, 1 + (i % 4)];
createButton(3966, mcData.blocksByName.stone_button.id);
//for (let i = 0; i < 24; i++) BLOCKS[3966 + i] = [mcData.blocksByName.stone_button.id, (i % 14)];
for (let i = 0; i < 8; i++) BLOCKS[3990 + i] = [mcData.blocksByName.snow_layer.id, i];
BLOCKS[3998] = mcData.blocksByName.ice.id;
BLOCKS[3999] = mcData.blocksByName.snow.id;
for (let i = 0; i < 16; i++) BLOCKS[4000 + i] = [mcData.blocksByName.cactus.id, i];
BLOCKS[4016] = mcData.blocksByName.clay.id;
for (let i = 0; i < 16; i++) BLOCKS[4017 + i] = [mcData.blocksByName.reeds.id, i];
for (let i = 0; i < 2; i++) BLOCKS[4033 + i] = [mcData.blocksByName.jukebox.id, i];
for (let i = 0; i < 32; i++) BLOCKS[4035 + i] = mcData.blocksByName.fence.id;
BLOCKS[4067] = mcData.blocksByName.pumpkin.id;
BLOCKS[4068] = mcData.blocksByName.nether_brick.id;
for (let i = 0; i < 8; i++) BLOCKS[4069 + i] = mcData.blocksByName.soul_sand.id;
createTorch(4077, mcData.blocksByName.redstone_torch.id);
BLOCKS[4081] = mcData.blocksByName.glowstone.id;
for (let i = 0; i < 3; i++) BLOCKS[4082 + i] = [mcData.blocksByName.portal.id, i];
for (let i = 0; i < 8; i++) BLOCKS[4085 + i] = [mcData.blocksByName.lit_pumpkin.id, i % 4];
for (let i = 0; i < 7; i++) BLOCKS[4093 + i] = [mcData.blocksByName.cake.id, i];
for (let i = 0; i < 64; i++) BLOCKS[4100 + i] = [mcData.blocksByName.powered_repeater.id, i % 16];
for (let i = 0; i < 16; i++) BLOCKS[4164 + i] = [mcData.blocksByName.stained_glass.id, i];
for (let i = 0; i < 384; i += 64) createTrapdoor(4180 + i, mcData.blocksByName.trapdoor.id);
for (let i = 0; i < 4; i++) BLOCKS[4564 + i] = [mcData.blocksByName.stonebrick.id, i];
BLOCKS[4568] = mcData.blocksByName.stone.id;
BLOCKS[4569] = mcData.blocksByName.cobblestone.id;
for (let i = 0; i < 4; i++) BLOCKS[4570 + i] = [mcData.blocksByName.stonebrick.id, i];
for (let i = 0; i < 64; i++) BLOCKS[4574 + i] = [mcData.blocksByName.brown_mushroom_block.id, 14];
for (let i = 0; i < 64; i++) BLOCKS[4638 + i] = [mcData.blocksByName.red_mushroom_block.id, 14];
for (let i = 0; i < 64; i++) BLOCKS[4702 + i] = mcData.blocksByName.pumpkin_stem.id;
for (let i = 0; i < 38; i++) BLOCKS[4766 + i] = mcData.blocksByName.iron_bars.id;
for (let i = 0; i < 32; i++) BLOCKS[4804 + i] = mcData.blocksByName.glass_pane.id;
BLOCKS[4836] = mcData.blocksByName.melon_block.id;
for (let i = 0; i < 4; i++) BLOCKS[4837 + i] = [mcData.blocksByName.pumpkin_stem.id, i];
for (let i = 0; i < 4; i++) BLOCKS[4841 + i] = [mcData.blocksByName.melon_stem.id, i];
for (let i = 0; i < 8; i++) BLOCKS[4845 + i] = mcData.blocksByName.pumpkin_stem.id;
for (let i = 0; i < 8; i++) BLOCKS[4853 + i] = mcData.blocksByName.melon_stem.id;
for (let i = 0; i < 160; i++) BLOCKS[4861 + i] = [mcData.blocksByName.vine.id, i % 16];
createStair(5053, mcData.blocksByName.brick_stairs.id);
createStair(5133, mcData.blocksByName.stone_brick_stairs.id);
for (let i = 0; i < 2; i++) BLOCKS[5213 + i] = mcData.blocksByName.dirt.id;
BLOCKS[5215] = mcData.blocksByName.waterlily.id;
BLOCKS[5216] = mcData.blocksByName.nether_brick.id;
createStair(5249, mcData.blocksByName.nether_brick_stairs.id);
for (let i = 0; i < 4; i++) BLOCKS[5329 + i] = mcData.blocksByName.nether_brick.id;
BLOCKS[5333] = mcData.blocksByName.enchanting_table.id;
for (let i = 0; i < 8; i++) BLOCKS[5334 + i] = [mcData.blocksByName.brewing_stand.id, i];
for (let i = 0; i < 8; i++) BLOCKS[5342 + i] = mcData.blocksByName.cauldron.id;
BLOCKS[5350] = mcData.blocksByName.end_portal.id;
for (let i = 0; i < 8; i++) BLOCKS[5351 + i] = [mcData.blocksByName.end_portal_frame.id, i];
BLOCKS[5359] = mcData.blocksByName.end_stone.id;
BLOCKS[5360] = mcData.blocksByName.dragon_egg.id;
BLOCKS[5361] = mcData.blocksByName.redstone_lamp.id;
BLOCKS[5362] = mcData.blocksByName.lit_redstone_lamp.id;
for (let i = 0; i < 12; i++) BLOCKS[5363 + i] = [mcData.blocksByName.cocoa.id, i];
createStair(5375, mcData.blocksByName.sandstone_stairs.id);
for (let i = 0; i < 2; i++) BLOCKS[5455 + i] = mcData.blocksByName.emerald_ore.id;
for (let i = 0; i < 2; i++) {
	BLOCKS[5457 + i] = [mcData.blocksByName.ender_chest.id, 3];
	BLOCKS[5459 + i] = [mcData.blocksByName.ender_chest.id, 4];
	BLOCKS[5461 + i] = [mcData.blocksByName.ender_chest.id, 2];
	BLOCKS[5463 + i] = [mcData.blocksByName.ender_chest.id, 5];
}
for (let i = 0; i < 16; i++) BLOCKS[5465 + i] = [mcData.blocksByName.tripwire_hook.id, i];
for (let i = 0; i < 128; i++) BLOCKS[5481 + i] = [mcData.blocksByName.tripwire.id, i % 16];
BLOCKS[5609] = mcData.blocksByName.emerald_block.id;
createStair(5610, mcData.blocksByName.spruce_stairs.id);
createStair(5690, mcData.blocksByName.birch_stairs.id);
createStair(5770, mcData.blocksByName.jungle_stairs.id);
for (let i = 0; i < 12; i++) BLOCKS[5850 + i] = [mcData.blocksByName.command_block.id, i];
BLOCKS[5862] = mcData.blocksByName.beacon.id;
for (let i = 0; i < 648; i++) BLOCKS[5863 + i] = [mcData.blocksByName.cobblestone_wall.id, Math.floor(i / 324)];
for (let i = 0; i < 24; i++) BLOCKS[6511 + i] = [mcData.blocksByName.flower_pot.id, i % 16];
for (let i = 0; i < 8; i++) BLOCKS[6536 + i] = [mcData.blocksByName.carrots.id, i];
for (let i = 0; i < 8; i++) BLOCKS[6544 + i] = [mcData.blocksByName.potatoes.id, i];
for (let i = 0; i < 144; i += 24) createButton(6552 + i, mcData.blocksByName.wooden_button.id);
for (let i = 0; i < 120; i++) BLOCKS[6696 + i] = [mcData.blocksByName.skull.id, i % 14];
for (let i = 0; i < 12; i++) BLOCKS[6816 + i] = [mcData.blocksByName.anvil.id, i];
for (let i = 0; i < 24; i++) BLOCKS[6828 + i] = [mcData.blocksByName.trapped_chest.id, 2 + (i % 4)];
for (let i = 0; i < 16; i++) BLOCKS[6852 + i] = [mcData.blocksByName.light_weighted_pressure_plate.id, i];
for (let i = 0; i < 16; i++) BLOCKS[6868 + i] = [mcData.blocksByName.heavy_weighted_pressure_plate.id, i];
for (let i = 0; i < 16; i++) BLOCKS[6884 + i] = [mcData.blocksByName.unpowered_comparator.id, i];
for (let i = 0; i < 32; i++) BLOCKS[6900 + i] = [mcData.blocksByName.daylight_detector.id, i];
BLOCKS[6932] = mcData.blocksByName.redstone_block.id;
BLOCKS[6933] = mcData.blocksByName.quartz_ore.id;
for (let i = 0; i < 10; i++) BLOCKS[6934 + i] = [mcData.blocksByName.hopper.id, i];
for (let i = 0; i < 2; i++) BLOCKS[6944 + i] = [mcData.blocksByName.quartz_block.id, i];
BLOCKS[6946] = [mcData.blocksByName.quartz_block.id, 3];
BLOCKS[6947] = [mcData.blocksByName.quartz_block.id, 2];
BLOCKS[6948] = [mcData.blocksByName.quartz_block.id, 4];
createStair(6949, mcData.blocksByName.quartz_stairs.id);
for (let i = 0; i < 24; i++) BLOCKS[7029 + i] = [mcData.blocksByName.activator_rail.id, i % 12];
for (let i = 0; i < 24; i++) BLOCKS[7053 + i] = [mcData.blocksByName.dropper.id, i];
for (let i = 0; i < 16; i++) BLOCKS[7065 + i] = [mcData.blocksByName.stained_hardened_clay.id, i];
for (let i = 0; i < 512; i += 32) BLOCKS[7081 + i] = [mcData.blocksByName.stained_glass_pane.id, Math.floor(i / 32)];
createStair(7593, mcData.blocksByName.acacia_stairs.id);
createStair(7673, mcData.blocksByName.dark_oak_stairs.id);
BLOCKS[7753] = mcData.blocksByName.slime.id;
BLOCKS[7754] = mcData.blocksByName.barrier.id;
createTrapdoor(7787, mcData.blocksByName.iron_trapdoor.id);
for (let i = 0; i < 3; i++) BLOCKS[7851 + i] = [mcData.blocksByName.prismarine.id, i];
createStair(7854, mcData.blocksByName.sandstone_stairs.id);
createStair(7934, mcData.blocksByName.sandstone_stairs.id);
createStair(8014, mcData.blocksByName.sandstone_stairs.id);
createSlab(8094, mcData.blocksByName.stone_slab.id, mcData.blocksByName.double_stone_slab.id);
createSlab(8100, mcData.blocksByName.stone_slab.id, mcData.blocksByName.double_stone_slab.id);
createSlab(8106, mcData.blocksByName.stone_slab.id, mcData.blocksByName.double_stone_slab.id);
BLOCKS[8112] = mcData.blocksByName.sea_lantern.id;
BLOCKS[8113] = [mcData.blocksByName.hay_block.id, 4];
BLOCKS[8114] = mcData.blocksByName.hay_block.id;
BLOCKS[8115] = [mcData.blocksByName.hay_block.id, 8];
for (let i = 0; i < 16; i++) BLOCKS[8116 + i] = [mcData.blocksByName.carpet.id, i];
BLOCKS[8132] = mcData.blocksByName.clay.id;
BLOCKS[8133] = mcData.blocksByName.coal_block.id;
BLOCKS[8134] = mcData.blocksByName.packed_ice.id;
for (let i = 0; i < 12; i++) BLOCKS[8135 + i] = [mcData.blocksByName.double_plant.id, i];
for (let i = 0; i < 3; i++) BLOCKS[8467 + i] = [mcData.blocksByName.red_sandstone.id, i];
createStair(8470, mcData.blocksByName.red_sandstone_stairs.id);
for (let i = 0; i < 36; i += 6) createSlab(8550 + i, mcData.blocksByName.wooden_slab.id, [mcData.blocksByName.double_wooden_slab.id, Math.floor(i / 6) % 6]);
for (let i = 0; i < 78; i += 6) createSlab(8586 + i, mcData.blocksByName.stone_slab.id, [mcData.blocksByName.double_stone_slab.id, Math.floor(i / 8) % 8]);
BLOCKS[8664] = mcData.blocksByName.stone.id;
BLOCKS[8665] = mcData.blocksByName.sandstone.id;
for (let i = 0; i < 2; i++) BLOCKS[8666 + i] = mcData.blocksByName.red_sandstone.id;
for (let i = 0; i < 32; i++) BLOCKS[8828 + i] = mcData.blocksByName.spruce_fence.id;
for (let i = 0; i < 32; i++) BLOCKS[8860 + i] = mcData.blocksByName.birch_fence.id;
for (let i = 0; i < 32; i++) BLOCKS[8892 + i] = mcData.blocksByName.jungle_fence.id;
for (let i = 0; i < 32; i++) BLOCKS[8924 + i] = mcData.blocksByName.acacia_fence.id;
for (let i = 0; i < 32; i++) BLOCKS[8956 + i] = mcData.blocksByName.dark_oak_fence.id;
createDoor(8988, mcData.blocksByName.spruce_door.id);
createDoor(9052, mcData.blocksByName.birch_door.id);
createDoor(9116, mcData.blocksByName.birch_door.id);
createDoor(9180, mcData.blocksByName.acacia_door.id);
createDoor(9244, mcData.blocksByName.dark_oak_door.id);
for (let i = 0; i < 16; i++) BLOCKS[9688 + i] = [mcData.blocksByName.stained_hardened_clay.id, i];
createStair(9919, mcData.blocksByName.stone_stairs.id);
createStair(9999, mcData.blocksByName.red_sandstone_stairs.id);
createStair(10079, mcData.blocksByName.stone_stairs.id);
createStair(10159, mcData.blocksByName.stone_stairs.id);
createStair(10239, mcData.blocksByName.stone_stairs.id);
createStair(10319, mcData.blocksByName.stone_stairs.id);
createStair(10399, mcData.blocksByName.stone_stairs.id);
createStair(10479, mcData.blocksByName.sandstone_stairs.id);
createStair(10559, mcData.blocksByName.quartz_stairs.id);
createStair(10639, mcData.blocksByName.stone_stairs.id);
createStair(10719, mcData.blocksByName.stone_stairs.id);
createStair(10879, mcData.blocksByName.stone_stairs.id);
createStair(10959, mcData.blocksByName.stone_stairs.id);
createSlab(11087, mcData.blocksByName.stone_slab.id, mcData.blocksByName.double_stone_slab.id);
createSlab(11093, mcData.blocksByName.stone_slab.id, mcData.blocksByName.double_stone_slab.id);
createSlab(11111, mcData.blocksByName.stone_slab.id, mcData.blocksByName.double_stone_slab.id);
for (let i = 0; i < 5380; i++) BLOCKS[11117 + i] = mcData.blocksByName.cobblestone_wall.id;
for (let i = 0; i < 8; i++) BLOCKS[20342 + i] = [mcData.blocksByName.ladder.id, 2];
BLOCKS[20343] = [mcData.blocksByName.ladder.id, 3];
BLOCKS[20345] = [mcData.blocksByName.ladder.id, 4];
BLOCKS[20347] = [mcData.blocksByName.ladder.id, 2];
BLOCKS[20349] = [mcData.blocksByName.ladder.id, 5];

BLOCK_ID[80] = mcData.blocksByName.noteblock.id;
BLOCK_ID[80] = mcData.blocksByName.noteblock.id;
BLOCK_ID[151] = mcData.blocksByName.mob_spawner.id;
BLOCK_ID[153] = mcData.blocksByName.chest.id;
BLOCK_ID[283] = mcData.blocksByName.ender_chest.id;
BLOCK_ID[291] = mcData.blocksByName.beacon.id;

export default BLOCKS;
export { BLOCKS, BLOCK_ID };