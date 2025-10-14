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
        target.stats.health -= damage;

        console.log(`${colors.brightBlue} ${user.name} punches ${target.name} dealing ${colors.red}${damage}${colors.brightBlue} damage!${colors.reset}`);
    }),
    new Move("Tackle", "Deals 1.5x user's strength in damage. 0.5x user's strength in recoil.", (user, target)=>{
        const strength = user.getStat("strength");
        const damage = Math.floor(strength * 1.5);
        const recoil = Math.floor(strength * 0.5);
        target.stats.health -= damage;
        user.stats.health -= recoil;

        console.log(`${colors.brightBlue} ${user.name} tackles ${target.name} dealing ${colors.red}${damage}${colors.brightBlue} damage\nHowever, they take ${colors.red}${recoil}${colors.brightBlue} recoil damage!${colors.reset}`);
    })
]

module.exports = { statTypes, defaultMoves };