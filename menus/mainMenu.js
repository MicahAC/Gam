const {colors, wait} = require("../utils")
const {Menu, Option, openMenu} = require("../inputManager")
const showStats = require("./stats");
// Import the module object to access the latest player instance
const playerState = require("../player");

const mainMenu = new Menu("Choose Your Action", [
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

module.exports = mainMenu;