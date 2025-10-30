const {colors, wait} = require("../utils")
const {Menu, Option, openMenu} = require("../inputManager")
const showStats = require("./statsMenu");
const huntMenu = require("./huntMenu");
const lzString = require("lz-string");
const playerState = require("../entity/player");


const mainMenu = new Menu("Choose Your Action", [
    new Option("Hunt", async () => {
        await huntMenu();
    }),
    new Option("Stats", async () => {
        await showStats();
    }),
    new Option("Save", async () => {
        const saveStructure = Object.fromEntries(Object.entries(playerState.player))
        saveStructure.moves.map(move=>move.identifier);
        const compressedData = lzString.compressToBase64(JSON.stringify(saveStructure));
        console.log(colors.green + "Game Saved!" + colors.reset);
        console.log(colors.brightBlue + "Save Data:" + colors.yellow);
        console.log(compressedData);
        await wait(6000);
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