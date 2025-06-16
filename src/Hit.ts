/**
 * EXECUTE CODE WHEN HITTING AN SPECIFIC ENTITY
 */

import { Entity, Player, world } from "@minecraft/server";

class Hit {
    static callbacks: { [tag: string]: (player: Player, victim: Entity) => void } = {}

    static on(tag: string, call: (player: Player, victim: Entity) => void) {
        Object.assign(Hit.callbacks, { [tag]: call })
    }
}

world.afterEvents.entityHitEntity.subscribe((res) => {
    if (!(res.damagingEntity instanceof Player)) return;

    const { damagingEntity: player, hitEntity: victim } = res

    const tags = victim.getTags()
    const found = tags.find(tag => tag in Hit.callbacks)

    if (!found) return;

    const call = Hit.callbacks[found]

    call(player, victim)
})

//Will add the levitation effect to any entity that has the tag 'levitation' when hit.
Hit.on('levitation', (plr) => {
    plr.addEffect('levitation', 60)
})