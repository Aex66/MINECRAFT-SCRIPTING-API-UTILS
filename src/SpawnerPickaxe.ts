/**
 * PICK MOB SPAWNERS
 */

import { ItemStack, world, system, Player, BlockVolume } from "@minecraft/server"
export function giveItem(plr: Player, item: ItemStack) {
    const inv = plr.getComponent('inventory').container
    inv.addItem(item)
}

export const pickaxeId = 'minecraft:netherite_pickaxe'

world.beforeEvents.playerBreakBlock.subscribe(({ player, itemStack: item, block, dimension }) => {
    if (block.typeId !== "minecraft:mob_spawner" || !item || item.typeId !== pickaxeId) return;

    const mobSpawnerItem = block.getItemStack(1, true)

    system.run(() => {
        dimension.spawnItem(mobSpawnerItem, block.location)
        const volume = new BlockVolume(block.location, block.location)
        dimension.fillBlocks(volume, 'air')
    })
})