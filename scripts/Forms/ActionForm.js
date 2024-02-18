/**
 * CREATE AN ACTION FORM
 */
import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
function ActionForm(player) {
    new ActionFormData()
        .title(`AUCTION FORM TITLE`)
        .body(`AUCTION FORM BODY`)
        .button(`BUTTON 0`)
        .button(`BUTTON 1`)
        .button(`BUTTON 2`)
        .show(player).then((res) => {
        if (res.canceled)
            return player.sendMessage(`Canceled form`);
        if (res.selection === 0)
            return player.sendMessage(`Clicked button 0`);
        if (res.selection === 1)
            return player.sendMessage(`Clicked button 1`);
        if (res.selection === 2)
            return player.sendMessage(`Clicked button 2`);
    });
}
world.afterEvents.itemUse.subscribe((event) => {
    const { itemStack, source } = event;
    if (itemStack.typeId !== 'minecraft:compass')
        return;
    ActionForm(source);
});
