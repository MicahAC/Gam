const { wait } = require('../utils');

/**
 * 
 * @param {import('../entity/enemy').Enemy} enemy 
 * @param {import('../entity/player').Player} player 
 */
async function enemyMove(enemy, player) {
    const moves = enemy.moves.filter(move => move.requirements(enemy));
    if(moves.length === 0) return;
    
    const move = moves[Math.floor(Math.random() * moves.length)];
    move.use(enemy, player);
    await wait(500);
}

module.exports = enemyMove;