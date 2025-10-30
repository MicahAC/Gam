const moves = require("./moves");

const statTypes = {
    health: { default: 20, upgrade: 5},
    mana: { default: 10, upgrade: 2},
    magicPower: { default: 5, upgrade: 1},
    strength: { default: 5, upgrade: 1},
    speed: { default: 5, upgrade: 1}
}

const defaultMoves = [moves.Punch, moves.Tackle]

module.exports = { statTypes, defaultMoves };