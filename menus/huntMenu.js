const battle = require("../battle");
const {Enemy} = require("../entity/enemy");
const playerState = require("../entity/player");
const { random, wait } = require("../utils");

const enemyNames = [
    "Goblin", "Orc", "Troll", "Elf", "Bandit", "Wolf", "Bear", "Boar", "Sprite", "Imp",
    "Ghoul", "Shade", "Harpy", "Satyr", "Minotaur", "Vampire", "Wraith", "Zombie", "Skeleton", "Giant",
    "Ogre", "Pixie", "Faun", "Leech", "Bat", "Spider", "Serpent", "Jackal", "Hyena", "Leopard",
    "Cougar", "Panther", "Griff", "Kelpie", "Dryad", "Nymph", "Sprite", "Shade", "Revenant", "Shade",
    "Bandit", "Thief", "Outlaw", "Mercenary", "Assassin", "Shaman", "Warlock", "Rogue", "Scout", "Beast",
    "Wendigo", "Banshee", "Cyclops", "Manticore", "Basilisk", "Chimera", "Gargoyle", "Lich", "Djinn", "Salamander",
    "Kraken", "Hydra", "Wyvern", "Drake", "Phoenix", "Sphinx", "Golem", "Elemental", "Specter", "Phantom",
    "Direwolf", "Hellhound", "Cerberus", "Harlequin", "Myrmidon", "Centaur", "Yeti", "Tarrasque"
];

module.exports = async function hunt() {
    let enemyCount = random(1, 3);
    if(playerState.player.level < 5 && enemyCount > 2) enemyCount = 2;
    let enemies = [];
    for(let i = 0; i < enemyCount; i++) {
        let enemyName = enemyNames[random(0, enemyNames.length - 1)];
        enemies.push(new Enemy(enemyName, Math.max(1, playerState.player.level + random(-1, 1))));
    }
    await battle(enemies)
}