const Entity = require("./index");
const {statTypes, defaultMoves} = require("../globals");
const { random } = require("../utils");

class Enemy extends Entity {
    constructor(name, level) {
        super(name, level);

        const statPoints = level+1;
        
        // Distribute stat points
        for(let i = 0; i < statPoints; i++) {
            const statKeys = Object.keys(this.stats);
            const chosenStat = statKeys[random(0, statKeys.length - 1)];
            this.stats[chosenStat] += statTypes[chosenStat].upgrade;
        }

        this.moves = defaultMoves
    }
}

module.exports = {Enemy};