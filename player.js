class Player {
    constructor(name) {
        this.name = name;
        this.stats = {
            level: 1,
            health: 20,
            mana: 10,
            strength: 5,
            speed: 5
        }
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

    get health() {
        return this.stats.health + this.getBonus('health');
    }
    get mana() {
        return this.stats.mana + this.getBonus('mana');
    }
    get strength() {
        return this.stats.strength + this.getBonus('strength');
    }
    get speed() {
        return this.stats.speed + this.getBonus('speed');
    }
}



/**
 * @type {Player}
 */
let player;
    
module.exports = {Player, player};