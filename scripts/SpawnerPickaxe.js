/**
 * PICK MOB SPAWNERS
 */
import { BlockTypes, world, system } from "@minecraft/server";
export function giveItem(plr, item) {
    const inv = plr.getComponent('inventory').container;
    inv.addItem(item);
}
export const pickaxeId = 'minecraft:netherite_pickaxe';
world.beforeEvents.playerBreakBlock.subscribe(res => {
    const { player: plr, itemStack } = res;
    const block = res.block;
    if (block.type !== BlockTypes.get("minecraft:mob_spawner"))
        return;
    if (!itemStack)
        return;
    if (itemStack.typeId !== pickaxeId)
        return;
    const item = block.getItemStack(1, true);
    system.run(() => {
        plr.dimension.spawnItem(item, block.location);
        res.dimension.fillBlocks(block.location, block.location, BlockTypes.get('air'));
    });
});
