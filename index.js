require("./inputManager");
const {openMenu} = require("./inputManager");
const {colors, wait} = require("./utils");
const mainMenu = require("./mainMenu");
// Import the module object instead of destructuring so we can update shared state
const playerState = require("./entity/player");
const startSequence = require("./mainMenu/startSequence");

(async () => {
    // Set the shared player instance on the exported module object
    playerState.player = await startSequence();

    while(1) {
        await mainMenu.open();
    }
})();