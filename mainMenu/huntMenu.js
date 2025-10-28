const battle = require("../battle");
const {Enemy} = require("../entity/enemy");
const playerState = require("../entity/player");
const { Menu, Option } = require("../inputManager");
const { random, wait, colors } = require("../utils");

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
    let confirmed = false;
    const question = new Menu("Are you sure you want to hunt?",
        [
            new Option("Yes", () => confirmed = true),
            new Option("No", () => confirmed = false)
        ]
    );

    await question.open();
    if(!confirmed) {
        console.log(colors.red + "You decide not to hunt");
        await wait(750);
        return;
    }

    let enemyCount = random(1, 3);
    if(playerState.player.level < 5 && enemyCount > 2) enemyCount = 2;
    let enemies = [];
    for(let i = 0; i < enemyCount; i++) {
        let enemyName = enemyNames[random(0, enemyNames.length - 1)];
        enemies.push(new Enemy(enemyName, Math.max(1, playerState.player.level + random(-1, 1))));
    }
    await battle(enemies)
}