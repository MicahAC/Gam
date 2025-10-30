const {Move} = require('./move');
const moves = require('./moves');

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
        moves.BasicSwing,
        moves.QuickAid
    ]),
    new Class("Enchanter", "A magic user who specializes in self enhancements and targetted curses", [
        moves.Weaken,
        moves.Empower
    ]),
    new Class("Berserker", "A fierce warrior who attacks with great power but runs out of stamina quickly", [
        moves.RagingStrike,
        moves.FullForce
    ]),
    new Class("Rogue", "A fighter who leverages speed and agility to outmaneuver opponents", [
        moves.MultiStrike,
        moves.Evasion
    ]),
    new Class("Mage", "A spellcaster who uses mana to cast powerful spells", [
        moves.Fireball,
        moves.Voltage
    ]),
    new Class("Dark Mage", "A sinister spellcaster who uses magic that drains the enemy and empowers themselves", [
        moves.LifeSiphon,
        moves.ManaDrain
    ]),
    new Class("Pheonix Knight", "A warrior with the ability to completely rejuvenate themselves once per battle", [
        moves.Rejuvenate
    ])

]

module.exports = {classes};
