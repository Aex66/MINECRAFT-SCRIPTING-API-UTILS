/**
 * SERVER BOW DING SOUND
 */
import { Player, world } from "@minecraft/server";
world.afterEvents.projectileHitEntity.subscribe((res) => {
    const { projectile, source: owner } = res;
    if (!(owner instanceof Player))
        return;
    if (projectile?.typeId !== 'minecraft:arrow')
        return;
    owner.playSound('random.orb', {
        volume: 0.4,
        pitch: 0.5
    });
});
