const {colors, wait} = require("../utils")
const {prompt, openMenu, Menu} = require("../inputManager")
const {Player} = require("../player")

async function startSequence() {
    let player;
    console.clear()
    //Have I met you before? (Save loading)
    console.log(colors.yellow + "Welcome to the 4th Era of Gam" + colors.reset)
    const name = await prompt(colors.brightBlue + "Tell me your name: " + colors.green)
    player = new Player(name)

    if(name == "Lattice") return player //Dev Bypass

    await wait(100);
    console.clear();
    console.log(colors.brightBlue + "You have a great lineage, " + colors.brightGreen + player.name + colors.reset);
    await wait(1500);
    console.log(colors.brightBlue + "Your parents were heroes" + colors.reset);
    await wait(1500);
    console.log(colors.brightBlue + "Your grandparents were beast slayers" + colors.reset);
    await wait(1500);
    console.log(colors.brightBlue + "And the one's before them were those who brought us here now" + colors.reset);
    await wait(1500);
    console.log(colors.brightBlue + "You know your destiny..." + colors.reset);
    await wait(3000);
    console.log(colors.brightBlue + "You must slay the " + colors.yellow + "Divine" + colors.reset)
    await wait(3000);
    console.clear();

    return player;
}

module.exports = startSequence;
