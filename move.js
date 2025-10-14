/**
 * @callback ActionCallback
 * @param {import("./entity")} user
 * @param {import("./entity")} target
 * @returns {null}
 */
/**
 * @callback RequirementsCallback
 * @param {import("./entity")} user
 * @returns {boolean}
 */

class Move {
    /**
     * 
     * @param {string} name 
     * @param {string} description
     * @param {ActionCallback} use 
     * @param {boolean} selfMove
     * @param {RequirementsCallback | null} requirements
     */
    constructor(name, description, use, selfMove, requirements = null) {
        this.name = name;
        this.description = description;
        this.use = use;
        this.selfMove = selfMove;
        this.requirements = requirements;
    }
}

module.exports = {Move};