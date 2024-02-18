import { Player, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

function ModalForm(player: Player) {
    new ModalFormData()
    .title(`MODAL FORM TITLE`)
    .textField('Text Input:', 'Example', 'Default Value')
    .dropdown('Dropdown', ['Option 1', 'Option 2'], 0)
    .slider('Slider', 0, 10, 1, 0)
    .toggle('Toggle', true)
    .show(player).then((res) => {
        if (res.canceled) return player.sendMessage(`Canceled form`)

        const [ input, dropdown, slider, toggle ] = res.formValues as [string, number, number, boolean]

        player.sendMessage(`Input: ${input}\nDropdown Index: ${dropdown}\nSlider Value: ${slider}\nToggle value: ${toggle}`)
    })
}

world.afterEvents.itemUse.subscribe((event) => {
    const { itemStack, source } = event

    if (itemStack.typeId !== 'minecraft:lodestone_compass') return;

    ModalForm(source)
})