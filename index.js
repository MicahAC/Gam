require("./inputManager");
const {openMenu} = require("./inputManager");
const {colors, wait} = require("./utils");
const mainMenu = require("./menus/mainMenu");
const Player = require("./player");
const startSequence = require("./menus/startSequence");

(async () => {
    const player = await startSequence();

    
})();