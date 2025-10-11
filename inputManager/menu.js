class Menu {
    /**
     * @param {string} title
     * @param {Array.<Option>} options 
     */
    constructor(title, options) {
        this.title = title;
        this.options = options;
        this.selected = 0;
    }
}

class Option {
    /**
     * 
     * @param {string} name 
     * @param {function} run 
     */
    constructor(name, run) {
        this.name = name;
        this.run = run;
    }
}

module.exports = {Menu, Option}