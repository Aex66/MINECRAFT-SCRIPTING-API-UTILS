import { world } from "@minecraft/server";
/**
 * GET ENTITIES IN A CERTAIN RADIUS
 */
function getEntitiesRadius(center, dimension, radius) {
    const entities = world.getDimension(dimension).getEntities({ location: center, maxDistance: radius });
    return entities ?? [];
}
/**
 * THIS WILL MAKE ALL THE ENTITIES LEVITATE IN A 10 BLOCKS RADIUS (INCLUDING YOU AND OTHER PLAYERS) WHEN YOU RIGHT-CLICK A FEATHER
 */
world.afterEvents.itemUse.subscribe((res) => {
    const { itemStack, source } = res;
    if (itemStack.typeId !== 'minecraft:feather')
        return;
    const entities = getEntitiesRadius(source.location, source.dimension.id, 10);
    if (!entities.length)
        return;
    entities.forEach(entity => {
        entity.addEffect('levitation', 40);
    });
});
