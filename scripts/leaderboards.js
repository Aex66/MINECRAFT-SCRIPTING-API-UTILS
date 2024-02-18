//NOT MADE BY AEX66
import { Vector, system, world } from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui';
const adminTag = 'Admin';
const refreshRate = 100;
const configItem = 'minecraft:nether_star';
const prefixMulti = new Map([['null', 1], ['k', 1e3], ['m', 1e6], ['b', 1e9], ['t', 1e12], ['qd', 1e15], ['qt', 1e18]]);
const formatting = [
    { divider: 1e3, suffix: 'k' },
    { divider: 1e6, suffix: 'm' },
    { divider: 1e9, suffix: 'b' },
    { divider: 1e12, suffix: 't' },
    { divider: 1e15, suffix: 'qd' },
    { divider: 1e18, suffix: 'qt' }
];
world.afterEvents.itemUse.subscribe(res => {
    const { source: player, itemStack } = res;
    if (itemStack.typeId !== configItem)
        return;
    if (!player.hasTag(adminTag))
        return;
    const blockLook = player.getBlockFromViewDirection({ maxDistance: 10 })?.block;
    if (!blockLook)
        return;
    const aboveLoc = Vector.add(blockLook.location, new Vector(0.5, 1, 0.5));
    if (player.dimension.getBlock(aboveLoc)?.typeId !== 'minecraft:air')
        return;
    let nearestLB = player.dimension.getEntities({ type: 'floating:text', location: aboveLoc, closest: 1, maxDistance: 1 })[0];
    editLeaderboard(player, nearestLB, aboveLoc);
});
function editLeaderboard(plr, leaderboard, loc) {
    new ModalFormData()
        .title('§l§5Leaderboard Settings')
        .textField('§3Enter the objective name\n§7This is the objective that will be tracked on the leaderboard', 'money, coins, time§r', getStringProperty(leaderboard, 'objName'))
        .textField('§3Enter the display name\n§7This is the text that will display above the top players', '§l§6Top Coins§r, §bTime Played§r', getStringProperty(leaderboard, 'lbName'))
        .textField('§3Enter the colour for the LB number§r', '', getStringProperty(leaderboard, 'numCo') ?? '§a')
        .textField('§3Enter the colour for the player name§r', '', getStringProperty(leaderboard, 'namCo') ?? '§b')
        .textField('§3Enter the colour for the score§r', '', getStringProperty(leaderboard, 'scoCo') ?? '§c')
        .slider('§3Select the top X players to display on the scoreboard§r', 1, 25, 1, getNumberProperty(leaderboard, 'topX'))
        .toggle('§3Delete this leaderboard?\n§cNo §f| §aYes§r', false)
        .show(plr).then(response => {
        if (response.canceled)
            return;
        const [obj, disp, numCo, namCo, scoCo, top, del] = response.formValues;
        if (!leaderboard)
            leaderboard = plr.dimension.spawnEntity('floating:text', loc);
        if (del)
            return leaderboard.remove();
        if (numCo.length !== 2 || namCo.length !== 2 || scoCo.length !== 2)
            return plr.sendMessage('§cColour inputs must be two characters long!');
        world.getDimension('overworld').runCommandAsync(`scoreboard objectives add ${obj} dummy`);
        leaderboard.setDynamicProperty('objName', obj);
        leaderboard.setDynamicProperty('lbName', disp);
        leaderboard.setDynamicProperty('topX', top);
        leaderboard.setDynamicProperty('numCo', numCo);
        leaderboard.setDynamicProperty('namCo', namCo);
        leaderboard.setDynamicProperty('scoCo', scoCo);
        leaderboard.addTag('leaderboard');
    });
}
system.runInterval(() => {
    for (const entity of world.getDimension('overworld').getEntities({ type: 'floating:text', tags: ['leaderboard'] })) {
        let obj = getStringProperty(entity, 'objName');
        let leader = getStringProperty(entity, 'lbName') ?? '';
        let newTop = topleaderboard(obj), current = 1;
        const plrNames = entity.nameTag.match(/(?<=\d§r\. .{2}).*(?=§r: .{2})/g);
        const plrScores = entity.nameTag.replace(/,/g, '').match(/(?<=§r: .{2})[-0-9.]+/g);
        const plrMultis = entity.nameTag.match(/.(?=\n|$)/g)?.slice(1);
        for (let i = 0; i < entity.nameTag.match(/\n/g)?.length; i++) {
            const plrName = plrNames[i];
            if (newTop.some(v => v.name === plrName))
                continue;
            const multiplier = prefixMulti.get(plrMultis[i]) ?? 1; //@ts-ignore
            const plrScore = Math.floor(parseFloat(plrScores[i] ?? 0) * multiplier * 100) / 100;
            newTop.push({
                name: plrName,
                score: plrScore
            });
        }
        ;
        newTop.sort((a, b) => b.score - a.score);
        for (let i of newTop.slice(0, getNumberProperty(entity, 'topX'))) {
            const money = i.score;
            let moneyFormatted = money.toString();
            if (money >= 1000) {
                for (let i = 0; i < formatting.length; i++)
                    if (money >= formatting[i].divider)
                        moneyFormatted = (Math.floor((money / formatting[i].divider) * 100) / 100) + formatting[i].suffix;
            }
            leader += `\n${getStringProperty(entity, 'numCo')}${current++}§r. ${getStringProperty(entity, 'namCo')}${i.name}§r: ${getStringProperty(entity, 'scoCo')}${moneyFormatted}`;
        }
        entity.nameTag = leader;
    }
}, refreshRate);
const objDB = {};
function getScore(target, objective) {
    try {
        return (objDB[objective] ?? (objDB[objective] = world.scoreboard.getObjective(objective)))?.getScore(target) ?? 0;
    }
    catch {
        return 0;
    }
}
;
function getStringProperty(entity, id) {
    return entity?.getDynamicProperty(id);
}
function getNumberProperty(entity, id) {
    return entity?.getDynamicProperty(id);
}
function topleaderboard(obj) {
    const scores = [];
    world.getPlayers().forEach(plr => scores.push({ name: plr.name, score: getScore(plr, obj) }));
    scores.sort((a, b) => b.score - a.score);
    return scores;
}
