import {STAT_KEYS} from "./typing.js";

// all skills assumed S rank
// skills likely in-battle bonus
// attributes likely pre-battle bonus

/**
 * @typedef {object} SpecificSkill
 * @property {"Passive" | "Auto"} SpecificSkill.type
 * @property {string} SpecificSkill.description
 */

const ATTRIBUTES = Object.freeze({
    atk: -1
});

class Spirit {
    /** @type {{[keyof STAT_KEYS]: number}} */ ATTRIBUTES;
    GENERIC_SKILLS = {
        "": {
            type: "Passive",
            description: ""
        }
    }
    /** @type {{[skillname: string]: SpecificSkill}} */ SPECIFIC_SKILLS;

    /** @type {[string, string, string]} */ skills = []
}

class Love extends Spirit {
    SPECIFIC_SKILLS = {
        "": {
            type: "Auto",
            description: ""
        }
    }
}

class Hope extends Spirit {

}

class Reverence extends Spirit {

}

class Faith extends Spirit {

}

export const SPIRIT_STAT = new (class {
    /** @type {Spirit?} */ #current_spirit = null;
    #changeSpirit() {

    }

    constructor() {

    }

    // statkeys
})();