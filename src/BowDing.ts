import { Player, world } from "@minecraft/server";

world.afterEvents.projectileHitEntity.subscribe((res) => {
    const { source: owner } = res

    if (!(owner instanceof Player)) return;

    owner.playSound('random.orb', {
        volume: 0.4,
        pitch: 0.5
    })
})