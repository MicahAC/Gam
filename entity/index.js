const {statTypes} = require("../globals");

class Entity {
    constructor(name, level) {
        this.name = name;
        this.level = level;

        this.stats = Object.fromEntries(
            Object.entries(statTypes).map(([key, value]) => [key, value.default])
        );

        /**
         * @type {number}
         */
        this.health = this.stats.health;
        /**
         * @type {number}
         */
        this.mana = this.stats.mana;
    }

    getStat(stat) {
        return this.stats[stat];
    }
}

module.exports = Entity;