const { Menu, Option } = require("../inputManager");
const { colors } = require("../utils");

/**
 * 
 * @param {import('../entity/player').Player} player 
 * @param {string} playerText 
 */
async function chooseSelfMove(player, playerText) {
    const selfMoveText = `${playerText}\n\n${colors.brightGreen}You chose to use a self move!`;
    const selfMoveMenu = new Menu(selfMoveText, player.moves.map((move) => {
        if (move.requirements && !move.requirements(player)) return;
        if (!move.selfMove) return;
        return new Option(`${move.name} - ${move.description}`, async () => move.use(player, player))
    }));
    await selfMoveMenu.open();
}

module.exports = chooseSelfMove;