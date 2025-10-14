const playerState = require('./entity/player');
const { Enemy } = require('./entity/enemy');
const { colors, wait } = require("./utils");
const { prompt, Menu, Option } = require("./inputManager");

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
    let chosenEnemy;
    let selfMove;

    while (true) {
        let playerText = `${colors.yellow}Lv${player.level} ${colors.brightBlue}${player.name}\n${colors.brightGreen}Health: (${player.health}/${player.getStat('health')})\n${colors.brightCyan}Mana: (${player.mana}/${player.getStat('mana')})${colors.reset}`;
        
        //Handle Last Move
        if (chosenEnemy) {
            const attackText = `${playerText}\n\n${colors.brightGreen}You chose to attack ${chosenEnemy.name}!`;
            const moveMenu = new Menu(attackText, player.moves.map((move) => {
                if (move.requirements && !move.requirements(player)) return;
                if (move.selfMove) return;
                return new Option(`${move.name} - ${move.description}`, async () => move.use(player, chosenEnemy))
            }));
            await moveMenu.open();
            if (chosenEnemy.health <= 0) {
                console.log(`${colors.brightRed}${chosenEnemy.name} was slain!${colors.reset}`);
                enemies = enemies.filter(e => e !== chosenEnemy);
            }
            chosenEnemy = null;
            await wait(1000);
        }

        //Handle Defeated Enemy
        if (enemies.length === 0) return;
        const enemyList = enemies.map((enemy) => {
            return `${colors.yellow}Lv${enemy.level} ${colors.brightBlue}${enemy.name} ${colors.brightGreen}(${enemy.health}/${enemy.getStat('health')} HP)`;
        })


        playerText = `${colors.yellow}Lv${player.level} ${colors.brightBlue}${player.name}\n${colors.brightGreen}Health: (${player.health}/${player.getStat('health')})\n${colors.brightCyan}Mana: (${player.mana}/${player.getStat('mana')})${colors.reset}`;
        const actions = enemyList.map((enemyText, index) => {
            return new Option(`${colors.brightRed}Attack `+enemyText, async () => {
                chosenEnemy = enemies[index];
            })
        })

        //Handle Self Moves
        if(player.moves.some(m => m.selfMove))
        actions.push(new Option(`${colors.brightGreen}Self Move`, async () => {
            selfMove = true;
        }))

        const enemyMenu = new Menu(playerText + colors.brightBlue +"\n\nChoose an action:", actions)
        await enemyMenu.open();
    }
}

