const { Menu, Option } = require("../inputManager");
const playerState = require("../entity/player");
const { statTypes } = require("../globals");
const { colors } = require("../utils");

module.exports = async function showStats() {
    const p = playerState.player;
    if (!p) {
        console.log("No player initialized yet.");
        return;
    }
    const stats = `${colors.brightBlue}Level: ${colors.yellow}${p.level} (${p.exp}/${p.getLevelUpExp()})\n` + Object.entries(p.stats).map(([key, value]) => {
        const bonus = p.getBonus(key);
        const statType = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        return `${colors.brightBlue}${statType}: ${colors.yellow}${value} ${bonus ? `( +${bonus} )` : ''}`;
    }).join('\n');

    const moves = p.moves.map(move => `${colors.brightGreen}${move.name} ${colors.brightBlue}- ${colors.brightGreen}${move.description}`).join('\n');

    let statsMenu;

    if(p.statPoints <= 0)
    statsMenu = new Menu(`${colors.brightBlue}-=Stats=-${colors.reset}\n${stats}\n\n${colors.brightBlue}Your moves:\n${moves}\m`, [
        new Option("Back", ()=>{})
    ])
    else {
    statsMenu = new Menu(`${colors.brightBlue}-=Stats=-${colors.reset}\n${stats}\n\n${colors.brightBlue}Your moves:\n${moves}\n\nYou have ${p.statPoints} stat point${p.statPoints === 1 ? '' : 's'} to allocate`, 
        [
            ...Object.keys(p.stats).map((statKey) => new Option(`Increase ${statKey.charAt(0).toUpperCase() + statKey.slice(1)}`, async () => {
                p.stats[statKey] += statTypes[statKey].upgrade;
                p.statPoints -= 1;
                await showStats();
            })),
            new Option("Back", ()=>{})
        ]);
    }
    await statsMenu.open()
}  