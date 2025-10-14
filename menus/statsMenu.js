const { Menu, Option } = require("../inputManager");
const playerState = require("../entity/player");

module.exports = async function showStats() {
    const p = playerState.player;
    if (!p) {
        console.log("No player initialized yet.");
        return;
    }
    const stats = `Level: ${p.level}\n` + Object.entries(p.stats).map(([key, value]) => {
        const bonus = p.getBonus(key);
        const statType = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        return `${statType}: ${value} ${bonus ? `( +${bonus} )` : ''}`;
    }).join('\n');

    const statsMenu = new Menu(`-=Stats=-\n${stats}`, [
        new Option("Back", ()=>{})
    ])
    await statsMenu.open()
}  