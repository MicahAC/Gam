const playerState = require('./entity/player');
const {Enemy} = require('./entity/enemy');
const {colors, wait} = require("./utils");
const {prompt} = require("./inputManager");

/**
 * 
 * @param {Array.<Enemy>} enemies 
 */
module.exports = async function battle(enemies) {
    console.clear();
    for(const enemy of enemies) {
        enemy.health = enemy.getStat('health');
        enemy.mana = enemy.getStat('mana');
    }
    const player = playerState.player;
    player.mana = player.getStat('mana');
    player.health = player.getStat('health');


    while (enemies.length > 0) {
        const enemyList = enemies.map((enemy) => {
            return `${colors.yellow}Lv${enemy.level} ${colors.brightBlue}${enemy.name} ${colors.brightGreen}(${enemy.health}/${enemy.getStat('health')} HP)`;
        })
        const playerText = `${colors.yellow}Lv${player.level} ${colors.brightBlue}${player.name}\n${colors.brightGreen}Health: (${player.health}/${player.getStat('health')})\n${colors.brightCyan}Mana: (${player.mana}/${player.getStat('mana')})`;
        console.log(playerText)
        console.log("\n")
        console.log(enemyList.join('\n'));
        await wait(2000);
    }
}