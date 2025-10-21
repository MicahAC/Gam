const { defaultMoves } = require("../globals");
const { colors, wait } = require("../utils");
const Entity = require("./index");

class Player extends Entity {
    constructor(name) {
        super(name, 1)
        
        this.exp = 0;
        this.statPoints = 2;
        this.inventory = [];
        this.equipment = {
            weapon: null,
            head: null,
            body: null,
            legs: null,
            feet: null
        };

        this.moves = defaultMoves;
    }

    getBonus(stat) {
        let bonus = 0;
        for (const item of Object.values(this.equipment)) {
            if (item && item.modifiers && item.modifiers[stat]) {
                bonus += item.modifiers[stat];
            }
        }
        for(const modifier of this.modifiers) {
            if(modifier.stat === stat) {
                bonus += modifier.value;
            }
        }
        return bonus;
    }

    getStat(stat) {
        if(this.stats[stat] + this.getBonus(stat) < 0) return 0;
        return this.stats[stat] + this.getBonus(stat);
    }

    getLevelUpExp() {
        return Math.round(14 + 0.45*(this.level**1.4));
    }

    async addExp(amount) {
        this.exp += amount;
        while (this.exp >= this.getLevelUpExp()) {
            this.exp -= this.getLevelUpExp();
            this.level += 1;
            this.statPoints += 1;
            console.log(`${colors.yellow}You leveled up! You are now level ${colors.cyan}${this.level}${colors.reset}`);
            await wait(500);
        }
    }
}



/**
 * @type {Player}
 */
let player;
    
module.exports = {Player, player};