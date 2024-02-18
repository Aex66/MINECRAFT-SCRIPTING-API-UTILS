import { system, world } from "@minecraft/server";
let delta = Date.now();
const TPS = [];
system.runInterval(() => {
    const currentTPS = 1000 / (Date.now() - delta);
    if (TPS.length >= 100)
        TPS.shift();
    TPS.push(currentTPS);
    delta = Date.now();
});
system.runInterval(() => {
    const averageTPS = TPS.reduce((prev, current) => prev + current) / TPS.length;
    world.sendMessage(`${averageTPS}`);
}, 60);
