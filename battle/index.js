const playerState = require('../entity/player');
const { Enemy } = require('../entity/enemy');
const battleLoop = require('./battleLoop');

/**
 * 
 * @param {Array.<Enemy>} enemies 
 */
module.exports = async function battle(enemies) {
    console.clear();
    for (const enemy of enemies) {
        enemy.health = enemy.getStat('health');
        enemy.mana = enemy.getStat('mana');
    }
    const player = playerState.player;
    player.mana = player.getStat('mana');
    player.health = player.getStat('health');

    let battleOver = 0;
    while (battleOver === 0) {
        battleOver = await battleLoop(player, enemies);
    }
    if (battleOver === 1) {

    }
    if (battleOver === -1) {
        
    }
}