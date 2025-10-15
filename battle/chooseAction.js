const { Menu, Option } = require("../inputManager");
const { colors } = require("../utils");

/**
 * @typedef {Object} Action
 * Represents a battle action.
 * @property {import("../entity/enemy").Enemy | null} chosenEnemy - The enemy chosen to attack, or null if a self move is chosen.
 * @property {boolean} selfMove - Indicates if a self move was chosen.
 */

/**
 * 
 * @param {import("../entity/player").Player} player 
 * @param {string} playerText 
 * @param {import("../entity/enemy").Enemy[]} enemies 
 * @returns {Promise.<Action>} - The chosen action (either an enemy to attack or a self move)
 */
async function chooseAction(player, playerText, enemies) {
    const enemyList = enemies.map((enemy) => {
        return `${colors.yellow}Lv${enemy.level} ${colors.brightBlue}${enemy.name} ${colors.brightGreen}(${enemy.health}/${enemy.getStat('health')} HP)`;
    })

    let chosenEnemy = null;
    const actions = enemyList.map((enemyText, index) => {
        return new Option(`${colors.brightRed}Attack ` + enemyText, async () => {
            chosenEnemy = enemies[index];
        })
    })

    let selfMove = false;
    if (player.moves.some(m => m.selfMove))
        actions.push(new Option(`${colors.brightGreen}Self Move`, async () => {
            selfMove = true;
        }))

    const actionMenu = new Menu(playerText + colors.brightBlue + "\n\nChoose an action:", actions)
    await actionMenu.open();

    return { chosenEnemy, selfMove };
}

module.exports = chooseAction;