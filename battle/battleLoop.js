const {Menu, Option} = require("../inputManager");
const chooseAction = require("./chooseAction");
const chooseAttack = require("./chooseAttack");
const chooseSelfMove = require("./chooseSelfMove");
const enemyMove = require("./enemyMove");
const { colors, wait } = require("../utils");

/**
 * 
 * @param {import("../entity/player").Player} player 
 * @param {import("../entity/enemy").Enemy[]} enemies 
 * @returns {Promise<boolean>} - Returns 1 if battle is won, 0 if continues, -1 if lost
 */
async function battleLoop(player, enemies) {
    let playerText = `${colors.yellow}Lv${player.level} ${colors.brightBlue}${player.name}\n${colors.brightGreen}Health: (${player.health}/${player.getStat('health')})\n${colors.brightCyan}Mana: (${player.mana}/${player.getStat('mana')})${colors.reset}`;

    if (enemies.length === 0) return 0;
    const { chosenEnemy, selfMove } = await chooseAction(player, playerText, enemies);

    if (chosenEnemy) await chooseAttack(player, chosenEnemy, playerText); 
    else if (selfMove) await chooseSelfMove(player, playerText);
    await wait(500);

    const defeatedEnemies = enemies.filter(e => e.health <= 0);
    for (const defeated of defeatedEnemies) {
        await wait(500);
        console.log(`${colors.red}${defeated.name} has been defeated!${colors.reset}`);
        enemies.splice(enemies.indexOf(defeated), 1);
    }

    if (enemies.length === 0) {
        await wait(500);
        console.log(`${colors.brightRed}Victory! You have defeated all enemies!${colors.reset}`);
        await wait(500);
        return 1;
    }

    if(player.health <= 0) {
        console.log(`${colors.red}You have been defeated${colors.reset}`);
        return -1;
    }

    for (const enemy of enemies) await enemyMove(enemy, player);
    await wait(500);
    return 0;
}

module.exports = battleLoop;