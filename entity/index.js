const { statTypes } = require("../globals");
const Modifier = require("./modifier");

class Entity {
    constructor(name, level) {
        this.name = name;
        this.level = level;

        /**
         * @type {Record<keyof typeof statTypes, number>}
         */
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

        /**
         * @type {Array.<Modifier>}
         */
        this.modifiers = [];
    }

    getStat(stat) {
        let totalModifier = 0;
        for (const modifier of this.modifiers) {
            if (modifier.stat === stat) {
                totalModifier += modifier.value;
            }
        }
        if (this.stats[stat] + totalModifier < 0) return 0;
        return this.stats[stat] + totalModifier;
    }
}

module.exports = Entity;