/**
 * @callback ActionCallback
 * @param {import("./entity")} user
 * @param {import("./entity")} target
 * @returns {null}
 */

class Move {
    /**
     * 
     * @param {string} name 
     * @param {string} description
     * @param {ActionCallback} use 
     */
    constructor(name, description, use) {
        this.name = name;
        this.description = description;
        this.use = use;
    }
}

module.exports = {Move};