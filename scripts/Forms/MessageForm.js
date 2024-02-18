/**
* CREATE A MESSAGE FORM
*/
import { world } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";
function MessageForm(player) {
    new MessageFormData()
        .title(`MESSAGE FORM TITLE`)
        .body(`AUCTION FORM BODY`)
        .button1(`BUTTON 1`)
        .button2(`BUTTON 2`)
        .show(player).then((res) => {
        if (res.canceled)
            return player.sendMessage(`Canceled form`);
        if (res.selection === 0)
            return player.sendMessage(`Clicked button 1`);
        if (res.selection === 1)
            return player.sendMessage(`Clicked button 2`);
    });
}
world.afterEvents.itemUse.subscribe((event) => {
    const { itemStack, source } = event;
    if (itemStack.typeId !== 'minecraft:recovery_compass')
        return;
    MessageForm(source);
});
