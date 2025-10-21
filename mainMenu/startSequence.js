const { colors, wait } = require("../utils")
const { prompt, openMenu, Menu, Option } = require("../inputManager")
const { Player } = require("../entity/player")
const { classes } = require('../classes')
const lzString = require("lz-string");

async function startSequence() {
    let player;
    console.clear()

    const savePrompt = new Menu("Have I met you before?", [
        new Option("Yes (Load Save)", async () => {
            let saveData = await prompt(colors.brightBlue + "Please enter your save data: " + colors.green)
            try {
                const decompressedData = lzString.decompressFromBase64(saveData);
                const parsedData = JSON.parse(decompressedData);
                player = Object.assign(new Player(), parsedData);
                console.log(colors.green + "Save loaded successfully!" + colors.reset);
                await wait(1000);
            } catch (error) {
                console.log(colors.red + "Failed to load save data." + colors.reset);
                await wait(1000);
                process.exit(1);
            }
        }),
        new Option("No (New Game)", async () => {
            player = await newPlayer(player);
        })
    ])

    await savePrompt.open();

    return player;
}

async function newPlayer(player) {
    console.log(colors.yellow + "Welcome to the 4th Era of Gam" + colors.reset)
    let name = await prompt(colors.brightBlue + "Tell me your name: " + colors.green)
    if (!name) name = "Lattice"

    player = new Player(name)

    const classSelection = new Menu("Choose your class:", classes.map(c => {
        return new Option(c.name + ": " + c.description, async () => {
            player.class = c;
            player.moves = [...player.moves, ...c.moves]
        })
    }))

    await classSelection.open()

    if (name == "Lattice") return player //Dev Bypass

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
}

module.exports = startSequence;
