const { Menu, Option } = require("../inputManager");
const playerState = require("../entity/player");
const { statTypes } = require("../globals");

module.exports = async function showStats() {
    const p = playerState.player;
    if (!p) {
        console.log("No player initialized yet.");
        return;
    }
    const stats = `Level: ${p.level} (${p.exp}/${p.getLevelUpExp()})\n` + Object.entries(p.stats).map(([key, value]) => {
        const bonus = p.getBonus(key);
        const statType = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        return `${statType}: ${value} ${bonus ? `( +${bonus} )` : ''}`;
    }).join('\n');

    let statsMenu;

    if(p.statPoints <= 0)
    statsMenu = new Menu(`-=Stats=-\n${stats}`, [
        new Option("Back", ()=>{})
    ])
    else {
    statsMenu = new Menu(`-=Stats=-\n${stats}\n\nYou have ${p.statPoints} stat point${p.statPoints === 1 ? '' : 's'} to allocate`, 
        [
            ...Object.keys(p.stats).map(statKey => new Option(`Increase ${statKey.charAt(0).toUpperCase() + statKey.slice(1)}`, () => {
                p.stats[statKey] += statTypes[statKey].upgrade;
                p.statPoints -= 1;
            })),
            new Option("Back", ()=>{})
        ]);
    }
    await statsMenu.open()
}  