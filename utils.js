const arrows = {
    down: '\u001B[B',
    up: '\u001B[A',
    right: '\u001B[C',
    left: '\u001B[D'
}
const enter = '\r'

const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    brightRed: '\x1b[91m',
    brightGreen: '\x1b[92m',
    brightYellow: '\x1b[93m',
    brightBlue: '\x1b[94m',
    brightMagenta: '\x1b[95m',
    brightCyan: '\x1b[96m',
    brightWhite: '\x1b[97m'
}

/**
 * Returns a promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to wait before resolving.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 */
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {colors, arrows, enter, wait, random}