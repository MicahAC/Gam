const {colors, wait} = require("../utils")
const {Menu, Option, openMenu} = require("../inputManager")
const showStats = require("./statsMenu");
// Import the module object to access the latest player instance
const playerState = require("../entity/player");
const huntMenu = require("./huntMenu");

const mainMenu = new Menu("Choose Your Action", [
    new Option("Hunt", async () => {
        await huntMenu();
    }),
    new Option("Stats", async () => {
        await showStats();
    }),
    new Option("Save (Not Implemented)", async () => {
        console.log(colors.red + "Save feature not implemented yet!" + colors.reset);
        await wait(1000);
    }),
    new Option("Exit", async () => {
        console.log(colors.yellow + "Exiting game..." + colors.reset);
        await wait(1000);
        process.exit(0);
    })
])

//mercenaries
//Making jumping fair again

module.exports = mainMenu;