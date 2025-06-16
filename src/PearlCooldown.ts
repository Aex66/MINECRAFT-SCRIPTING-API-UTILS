/**
 * ENDER PEARL COOLDOWN
 */

import { Player, world } from "@minecraft/server";

const pearlCooldown = 60 //Seconds

world.beforeEvents.itemUse.subscribe((event) => {
    const { source: player, itemStack: item } = event

    if (!(player instanceof Player) || item.typeId !== 'minecraft:ender_pearl') return;

    const cooldown = player.getDynamicProperty('pearl_cooldown') as number ?? 0

    if (cooldown && (cooldown > Date.now())) return (
        event.cancel = true,
        player.sendMessage(`§cYou can't use ender pearls now!`)
    )

    player.setDynamicProperty('pearl_cooldown', Date.now() + (pearlCooldown * 1000))
})