import { world } from "@minecraft/server";
function isInsideBox(point, boxMin, boxMax) {
    return point.x >= boxMin.x && point.x <= boxMax.x &&
        point.y >= boxMin.y && point.y <= boxMax.y &&
        point.z >= boxMin.z && point.z <= boxMax.z;
}
world.beforeEvents.playerBreakBlock.subscribe((res) => {
    const { player } = res;
    const { location } = res.block;
    const heightRange = world.getDimension('overworld').heightRange;
    if (!isInsideBox(location, { x: -10, y: heightRange.min, z: -10 }, { x: 10, y: heightRange.max, z: 10 }))
        return;
    res.cancel = true;
    player.sendMessage(`§cYou are not able to break blocks in a protected zone`);
});
world.beforeEvents.playerPlaceBlock.subscribe((res) => {
    const { player } = res;
    const { location } = res.block;
    // Ensure boxMin coordinates are less than boxMax coordinates for each axis
    const heightRange = world.getDimension('overworld').heightRange;
    if (!isInsideBox(location, { x: -10, y: heightRange.min, z: -10 }, { x: 10, y: heightRange.max, z: 10 }))
        return;
    res.cancel = true;
    player.sendMessage(`§cYou are not able to place blocks in a protected zone`);
});
