/**
 * SHOOT PROJECTILES
 */
import { Vector, world } from "@minecraft/server";
/**
 * USE BLAZE ROD AND RIGHT CLICK TO SHOOT SNOWBALLS
 */
world.afterEvents.itemUse.subscribe((res) => {
    const { itemStack, source: player } = res;
    if (itemStack.typeId !== 'minecraft:blaze_rod')
        return;
    const playerDirection = player.getViewDirection();
    const projectileVelocity = new Vector(playerDirection.x * 4, playerDirection.y * 4, playerDirection.z * 4);
    const entity = player.dimension.spawnEntity(`snowball`, player.getHeadLocation());
    const projectile = entity.getComponent('projectile');
    projectile.owner = player;
    projectile.catchFireOnHurt = true;
    projectile.shoot(projectileVelocity);
});
