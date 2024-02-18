/**
 * EXECUTE CODE WHEN HITTING AN SPECIFIC ENTITY
 */
import { Player, world } from "@minecraft/server";
class Hit {
    static on(tag, call) {
        Object.assign(Hit.callbacks, { [tag]: call });
    }
}
Hit.callbacks = {};
world.afterEvents.entityHitEntity.subscribe((res) => {
    if (!(res.damagingEntity instanceof Player))
        return;
    const { damagingEntity: player, hitEntity: victim } = res;
    const tags = victim.getTags();
    const found = tags.find(tag => tag in Hit.callbacks);
    if (!found)
        return;
    const call = Hit.callbacks[found];
    call(player, victim);
});
//Add the tag "levitation" to any entity and then hit the entity.
Hit.on('levitation', (plr) => {
    plr.addEffect('levitation', 60);
});
