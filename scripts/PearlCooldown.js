/**
 * ENDER PEARL COOLDOWN
 */
import { Player, world } from "@minecraft/server";
const pearlCooldown = 60; //Seconds
world.beforeEvents.itemUse.subscribe(res => {
    if (!(res.source instanceof Player))
        return;
    const source = res.source;
    if (res.itemStack.typeId !== 'minecraft:ender_pearl')
        return;
    const cooldown = res.source.getDynamicProperty('pearl_cooldown') ?? 0;
    if (cooldown && (cooldown > Date.now())) {
        res.cancel = true;
        source.sendMessage(`§cYou can't use ender pearls now!`);
        return;
    }
    res.source.setDynamicProperty('pearl_cooldown', Date.now() + (pearlCooldown * 1000));
});
