const { Menu, Option } = require("./menu")
const { colors, arrows, enter } = require("../utils")
const readline = require("readline");
rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.stdin.setEncoding('utf-8')
process.stdin.setRawMode(true)
process.stdin.resume();


let currentMenu = null;

process.stdin.on('data', (key) => {
    if (key === '\u0003') process.exit();
    if (!currentMenu) return
    if (key === arrows.up) currentMenu.selected = (currentMenu.selected - 1 + currentMenu.options.length) % currentMenu.options.length;
    if (key === arrows.down) currentMenu.selected = (currentMenu.selected + 1) % currentMenu.options.length;
    if (key === enter) {
        const selectedOption = currentMenu.options[currentMenu.selected];
        currentMenu = null;
        console.clear();
        selectedOption.run();
        return
    }
    renderMenu();
});

/**
 * Opens the specified menu, sets it as the current menu, resets the selected item, and renders the menu.
 * @export
 * @param {Menu} menu - The menu object to open.
 */
function openMenu(menu) {
    currentMenu = menu;
    currentMenu.selected = 0;
    renderMenu();
}

function renderMenu() {
    console.clear();
    console.log(colors.brightBlue + currentMenu.title + colors.reset);
    currentMenu.options.forEach((option, index) => {
        console.log((index === currentMenu.selected ? colors.brightGreen + '>' : ' ') + ' ' + option.name + colors.reset);
    })
}

/**
 * Prompts the user for input and returns their response.
 * @param {string} question - The question to ask the user.
 * @returns {Promise<string>} - A promise that resolves to the user's answer.
 * @export
 */
async function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

module.exports = { Menu, Option, openMenu, prompt }