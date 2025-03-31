const mcData = (await import('minecraft-data')).default("1.8.9");
export default {
    1: [mcData.entitiesByName.Item.id, false],
    3: [mcData.entitiesByName.Arrow.id, false],
    4: [mcData.entitiesByName.Snowball.id, false],
    5: [mcData.entitiesByName.ThrownEnderpearl.id, false],
    6: [mcData.entitiesByName.ThrownEgg.id, false],
    7: [mcData.entitiesByName.ThrownPotion.id, false],
    8: [mcData.entitiesByName.ItemFrame.id, false],
    9: [mcData.entitiesByName.FallingSand.id, false],
    10: [mcData.entitiesByName.PrimedTnt.id, false],
    11: [mcData.entitiesByName.Fireball.id, false],
    12: [mcData.entitiesByName.Pig.id, true],
    13: [mcData.entitiesByName.Cow.id, true],
    14: [mcData.entitiesByName.Chicken.id, true],
    15: [mcData.entitiesByName.Sheep.id, true],
    16: [mcData.entitiesByName.Zombie.id, true],
    17: [mcData.entitiesByName.Skeleton.id, true],
    18: [mcData.entitiesByName.Creeper.id, true],
    19: [mcData.entitiesByName.Slime.id, true],
    20: [mcData.entitiesByName.Spider.id, true],
    21: [mcData.entitiesByName.Boat.id, false]
};