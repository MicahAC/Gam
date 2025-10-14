const {Move} = require("./move");
const {colors} = require("./utils")

const statTypes = {
    health: { default: 20, upgrade: 5},
    mana: { default: 10, upgrade: 2},
    magicPower: { default: 5, upgrade: 1},
    strength: { default: 5, upgrade: 1},
    speed: { default: 5, upgrade: 1}
}

const defaultMoves = [
    new Move("Punch", "Deals 0.8x user's strength in damage", (user, target)=>{
        const strength = user.getStat("strength");
        const damage = Math.floor(strength * 0.8);
        target.health -= damage;
        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} punches ${targetName} dealing ${colors.red}${damage}${colors.brightBlue} damage!${colors.reset}`);
    }, false),
    new Move("Tackle", "Deals 1.5x user's strength in damage. 0.5x user's strength in recoil.", (user, target)=>{
        const strength = user.getStat("strength");
        const damage = Math.floor(strength * 1.5);
        const recoil = Math.floor(strength * 0.5);
        target.health -= damage;
        user.health -= recoil;

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} tackles ${targetName} dealing ${colors.red}${damage}${colors.brightBlue} damage!\n${colors.brightBlue}However, they take ${colors.red}${recoil}${colors.brightBlue} recoil damage!${colors.reset}`);
    }, false)
]

module.exports = { statTypes, defaultMoves };