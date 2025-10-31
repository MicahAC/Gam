const {statTypes} = require("../globals");

class Item {
    /**
     * 
     * @param {string} name 
     * @param {string} description 
     * @param {Record<keyof typeof statTypes, number>} modifiers 
     */
    constructor(name, description, modifiers) {
        this.name = name;
        this.identifier = this.name.replace(/\s+/g, '')
        this.description = description;
        this.modifiers = modifiers;
    }
}

module.exports = Item;