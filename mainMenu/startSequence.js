const {colors, wait} = require("../utils")
const {prompt, openMenu, Menu, Option} = require("../inputManager")
const {Player} = require("../entity/player")
const {classes} = require('../classes')

async function startSequence() {
    let player;
    console.clear()
    //Have I met you before? (Save loading)
    console.log(colors.yellow + "Welcome to the 4th Era of Gam" + colors.reset)
    let name = await prompt(colors.brightBlue + "Tell me your name: " + colors.green)
    if(!name) name = "Lattice"

    player = new Player(name)

    const classSelection = new Menu("Choose your class:", classes.map(c=>{
        return new Option(c.name + ": " + c.description, async ()=>{
            player.class = c;
            player.moves = [...player.moves, ...c.moves]
        })
    }))

    await classSelection.open()

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
