const {colors, wait} = require("../utils")
const {Menu, Option} = require("../inputManager")

const mainMenu = new Menu("Choose Your Action", [
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