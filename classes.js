const Modifier = require("./entity/modifier");
const {Move} = require('./move');

class Class {
    /**
     * 
     * @param {string} name 
     * @param {string} description 
     * @param {Array.<Move>} moves 
     */
    constructor(name, description, moves) {
        this.name = name;
        this.description = description;
        this.moves = moves;
    }
}

/**
 * @type {Array.<Class>}
 */
const classes = [
    new Class("Militaman", "A brave but untrained soldier who uses basic weapons and knows how to patch a wound", [
        new Move("Basic Swing", "Deals the user's strength in damage", (user, target) => {
            const strength = user.getStat("strength");
            const damage = strength
            target.health -= damage;
            const targetName = colors.yellow + target.name + colors.brightBlue;
            const userName = colors.yellow + user.name + colors.brightBlue;

            console.log(`${userName} swings at ${targetName} dealing ${colors.red}${damage}${colors.brightBlue} damage!${colors.reset}`);
        }),
        new Move("Quick Aid", "Heals the user's speed in health", (user, target) => {
            const speed = user.getStat("speed");
            const heal = speed;
            user.health += heal;
            const userName = colors.yellow + user.name + colors.brightBlue;
            console.log(`${userName} quickly patches themselves up, restoring ${colors.green}${heal}${colors.brightBlue} health!${colors.reset}`);
        }, true)
    ]),
    new Class("Enchanter", "A magic user who specializes in self enhancements and targetted curses", [
        new Move("Weaken", "Reduces the target's strength by 2 for the duration of the battle. Uses 3 mana", (user, target) => {
            const modifier = new Modifier("strength", -2);
            target.modifiers.push(modifier);
            user.mana -= 3;
            const targetName = colors.yellow + target.name + colors.brightBlue;
            const userName = colors.yellow + user.name + colors.brightBlue;

            console.log(`${userName} casts Weaken on ${targetName}, reducing their strength by ${colors.red}2${colors.brightBlue}!${colors.reset}`);
        }, false, (user) => user.mana >= 3),
        new Move("Empower", "Increases the user's strength by 2 for the duration of the battle. Uses 3 mana", (user, target) => {
            const modifier = new Modifier("strength", 2);
            user.modifiers.push(modifier);
            user.mana -= 3;
            const userName = colors.yellow + user.name + colors.brightBlue;

            console.log(`${userName} casts Empower, increasing their strength by ${colors.green}2${colors.brightBlue}!${colors.reset}`);
        })
    ])
]

module.exports = {classes};
