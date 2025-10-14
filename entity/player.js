const Entity = require("./index");

class Player extends Entity {
    constructor(name) {
        super(name, 1)
        
        this.inventory = [];
        this.equipment = {
            weapon: null,
            head: null,
            body: null,
            legs: null,
            feet: null
        };
    }

    getBonus(stat) {
        let bonus = 0;
        for (const item of Object.values(this.equipment)) {
            if (item && item.modifiers && item.modifiers[stat]) {
                bonus += item.modifiers[stat];
            }
        }
        return bonus;
    }

    getStat(stat) {
        return this.stats[stat] + this.getBonus(stat);
    }
}



/**
 * @type {Player}
 */
let player;
    
module.exports = {Player, player};