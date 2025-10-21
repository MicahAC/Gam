const { Menu, Option } = require("../inputManager");
const { colors } = require("../utils");

/**
 * 
 * @param {import('../entity/player').Player} player 
 * @param {import('../entity/enemy').Enemy} chosenEnemy 
 * @param {string} playerText 
 */
async function chooseAttack(player, chosenEnemy, playerText) {
    const attackText = `${playerText}\n\n${colors.brightGreen}You chose to attack ${chosenEnemy.name}!`;
    const moveMenu = new Menu(attackText, player.moves.map((move) => {
        if (move.requirements && !move.requirements(player)) return;
        if (move.selfMove) return;
        return new Option(`${move.name} - ${move.description}`, async () => move.use(player, chosenEnemy))
    }).filter(x=>x));
    await moveMenu.open();
}

module.exports = chooseAttack;