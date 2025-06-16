/**
 * SHOOT PROJECTILES WITH ITEMS
 */

import { Player, world } from "@minecraft/server";

const magnitude = 4

/**
 * USE BLAZE ROD AND RIGHT CLICK TO SHOOT SNOWBALLS
 */
world.afterEvents.itemUse.subscribe(({ source: player, itemStack: item }) => {
    
    if (!(player instanceof Player) || item.typeId !== 'minecraft:blaze_rod') return;

    const playerDirection = player.getViewDirection();

    const velocity = { x: playerDirection.x * magnitude, y: playerDirection.y * magnitude, z: playerDirection.z * magnitude }
    
    const entity = player.dimension.spawnEntity('minecraft:snowball', player.getHeadLocation());
    
    const projectile = entity.getComponent('projectile');
    projectile.owner = player;
    projectile.catchFireOnHurt = true

    projectile.shoot(velocity);
})