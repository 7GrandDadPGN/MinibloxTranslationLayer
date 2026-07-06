const EntityArrow = require('../../base/translation/classes/entities/objects/entityarrow.js');
const EntityEgg = require('../../base/translation/classes/entities/objects/entityegg.js');
const EntityEnderPearl = require('../../base/translation/classes/entities/objects/entityenderpearl.js');
const EntityFallingBlock = require('../../base/translation/classes/entities/objects/entityfallingblock.js');
const EntityFireball = require('../../base/translation/classes/entities/objects/entityfireball.js');
const EntityItem = require('../../base/translation/classes/entities/objects/entityitem.js');
const EntityPrimedTnt = require('../../base/translation/classes/entities/objects/entityprimedtnt.js');
const EntitySnowball = require('../../base/translation/classes/entities/objects/entitysnowball.js');
const EntityBoat = require('../../base/translation/classes/entities/objects/entityboat.js');
const EntityPotion = require('../../base/translation/classes/entities/objects/entitypotion.js');
const EntityPig = require('../../base/translation/classes/entities/living/entitypig.js');
const EntityCow = require('../../base/translation/classes/entities/living/entitycow.js');
const EntityChicken = require('../../base/translation/classes/entities/living/entitychicken.js');
const EntitySheep = require('../../base/translation/classes/entities/living/entitysheep.js');
const EntityZombie = require('../../base/translation/classes/entities/living/entityzombie.js');
const EntitySkeleton = require('../../base/translation/classes/entities/living/entityskeleton.js');
const EntityCreeper = require('../../base/translation/classes/entities/living/entitycreeper.js');
const EntitySlime = require('../../base/translation/classes/entities/living/entityslime.js');
const EntitySpider = require('../../base/translation/classes/entities/living/entityspider.js');
const mcData = require('minecraft-data')('1.8.9');

module.exports = {
	1: EntityItem,
	3: EntityArrow,
	4: EntitySnowball,
	5: EntityEnderPearl,
	6: EntityEgg,
	7: EntityPotion,
	9: EntityFallingBlock,
	10: EntityPrimedTnt,
	11: EntityFireball,
	12: EntityPig,
	13: EntityCow,
	14: EntityChicken,
	15: EntitySheep,
	16: EntityZombie,
	17: EntitySkeleton,
	18: EntityCreeper,
	19: EntitySlime,
	20: EntitySpider,
	21: EntityBoat
};