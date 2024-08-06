import {STAT_KEYS, STAT_KEYS_TYPE, UNITSTATUPDATE, STAT_KEYS_TYPENAME} from "./typing.js";
import {getTemplateCloner} from "../../univasset/scripts/externaljavascript.js"
import {setattr} from "../../univasset/scripts/basefunctions/pseudobuiltin.js";
import {brJoin} from "../../univasset/scripts/htmlgenerator/htmlgenerator.js"


// all skills assumed S rank
// skills likely in-battle bonus
// attributes likely pre-battle bonus

/**
 * @typedef {object} SpecificSkill
 * @property {"Passive" | "Auto"} SpecificSkill.type
 * @property {[string, number]} SpecificSkill.value
 * @property {string} SpecificSkill.description
 */

/**
 * @typedef {object} GenericSkill
 * @property {"Passive"} GenericSkill.type
 * @property {[STAT_KEYS_TYPE[keyof STAT_KEYS_TYPE], number][]} GenericSkill.value
 * @property {string} GenericSkill.description
 */

const GENERIC_SKILLS = {
    /** @type {GenericSkill} */ Macrocosms: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.HEALTH_P, 6]],
        description: "All Dolls gain 6% HP."
    },
    /** @type {GenericSkill} */ Castigation: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.ATTACK_P, 6], [STAT_KEYS_TYPE.HASHRATE_P, 6]],
        description: "All Dolls gain 6% Attack and Hashrate."
    },
    /** @type {GenericSkill} */ Alacrity: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.ATKSPD_F, 15]],
        description: "All Dolls gain 15 Attack Speed."
    },
    /** @type {GenericSkill} */ Carnage: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.CRITRATE_P, 6]],
        description: "All Dolls gain 6% Crit Rate."
    },
    /** @type {GenericSkill} */ Exorcise: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.CRITDMG_P, 12]],
        description: "All Dolls gain 12% Crit Damage."
    },
    /** @type {GenericSkill} */ Umbrage: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.DODGE_P, 12]],
        description: "All Dolls gain 12% Dodge Rate."
    },
    /** @type {GenericSkill} */ Insight: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.HASTE_P, 10]],
        description: "All Dolls gain 10% Skill Haste."
    },
    /** @type {GenericSkill} */ Might: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.DMGBOOST_P, 5]],
        description: "All Dolls deal 5% more damage."
    },
    /** @type {GenericSkill} */ Sanctification: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.DMGREDUCE_P, 5]],
        description: "All Dolls receive 5% less damage."
    },
    /** @type {GenericSkill} */ Shelter: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.PDEFENSE_P, 6], [STAT_KEYS_TYPE.ODEFENSE_P, 6]],
        description: "All Dolls gain 6% Physical and Operand Defense."
    },
    /** @type {GenericSkill} */ Rejuvenation: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.HEALBOOST_P, 12]],
        description: "All Dolls heal 12% more."
    },
    /** @type {GenericSkill} */ Substinence: {
        type: "Passive",
        value: [],
        description: "All Dolls gain 10% Normal Attack Life Steal."
    },
    /** @type {GenericSkill} */ Judgement: {
        type: "Passive",
        value: [],
        description: "Normal Attacks deal 3.6% more damage."
    },
    /** @type {GenericSkill} */ Fury: {
        type: "Passive",
        value: [],
        description: "Ultimates deal 3.6% more damage."
    },
    /** @type {GenericSkill} */ Sunchaser: {
        type: "Passive",
        value: [],
        description: "Auto Skills deal 3.6% more damage."
    },
    /** @type {GenericSkill} */ Breakthrough: {
        type: "Passive",
        value: [[STAT_KEYS_TYPE.PPENETRATE_P, 10], [STAT_KEYS_TYPE.OPENETRATE_P, 10]],
        description: "All Dolls gain 10% Physical and Operand Penetration."
    }
}

const _dialogButtons = getTemplateCloner("#spirits-template");
class Spirit {
    // https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
    /** @type {{[x in STAT_KEYS_TYPE[keyof STAT_KEYS_TYPE]]: number?}} */ ATTRIBUTES;

    get spirit_select() {
        const FRAGMENT = _dialogButtons();
        const NAME = this.constructor.name;

        FRAGMENT.querySelector("button").value = NAME;
        setattr(FRAGMENT.querySelector("img"), {src: `../assets/images/spirits/${NAME}.png`, alt: NAME});
        FRAGMENT.querySelector("span").textContent = NAME;
        FRAGMENT.querySelector("div").appendChild(brJoin(Object.keys(this.ATTRIBUTES).map(x => STAT_KEYS_TYPENAME[x])));

        return FRAGMENT;
    }

    /** @type {{[skillname: string]: SpiritSkill}} */ SPECIFIC_SKILLS;

    /** @type {[string, string, string]} */ SETS = [];
    // /** @type {[string, string, string]} */ skills = []
}

const SPIRITS = {
    Love: new (class Love extends Spirit {
        ATTRIBUTES = {
            [STAT_KEYS_TYPE.HEALTH_F]: 4000,
            [STAT_KEYS_TYPE.ATTACK_F]: 120,
            [STAT_KEYS_TYPE.HASHRATE_F]: 120,
            [STAT_KEYS_TYPE.ATKSPD_F]: 50,
            [STAT_KEYS_TYPE.DODGE_P]: 12.5
        }

        SPECIFIC_SKILLS = {
            "Love's Blessing - Affection": {
                type: "Passive",
                value: [],
                description: "For every 5% Dodge Rate a Doll has, they gain 1% Attack and Hashrate, max 10%."
            },
            "Love's Blessing - Benison": {
                type: "Passive",
                value: [],
                description: "Dodging 5 cumulative times deals 1 instance of Physical and Operand Damage equal to 150% to the enemy with the current lowest HP."
            },
            "Love's Blessing - Avoidance": {
                type: "Passive",
                value: [],
                description: "When dolls take damage greater than 30% of their Max HP, reduce that damage to 1 at a 1% chance, which can be increased with Dodge Rate, max 60%. Each doll can activate this effect a max of 4 times per battle."
            },
            "Rapid Charge - Reversal": {
                type: "Auto",
                value: [],
                description: "Reduces enemy skill charge by 60%, and allows their next ability to be dodged using character's own Dodge Rate. Does not apply to duration-based skills."
            },
        }
    })(),
    Hope: new (class Hope extends Spirit {
        ATTRIBUTES = {
            [STAT_KEYS_TYPE.HEALTH_F]: 4000,
            [STAT_KEYS_TYPE.ATTACK_F]: 120,
            [STAT_KEYS_TYPE.HASHRATE_F]: 120,
            [STAT_KEYS_TYPE.CRITDMG_P]: 15,
            [STAT_KEYS_TYPE.HASTE_P]: 7.5
        }
    })(),
    Reverence: new (class Reverence extends Spirit {
        ATTRIBUTES = {
            [STAT_KEYS_TYPE.ATTACK_F]: 120,
            [STAT_KEYS_TYPE.HASHRATE_F]: 120,
            [STAT_KEYS_TYPE.CRITRATE_P]: 10,
            [STAT_KEYS_TYPE.PPENETRATE_F]: 50,
            [STAT_KEYS_TYPE.OPENETRATE_F]: 50
        }
    })(),
    Faith: new (class Faith extends Spirit {
        ATTRIBUTES = {
            [STAT_KEYS_TYPE.ATTACK_F]: 120,
            [STAT_KEYS_TYPE.HASHRATE_F]: 120,
            [STAT_KEYS_TYPE.PDEFENSE_F]: 125,
            [STAT_KEYS_TYPE.ODEFENSE_F]: 125,
            [STAT_KEYS_TYPE.HASTE_P]: 10
        }
    })()
}

export const SPIRIT_STAT = new (class {
    /** @type {HTMLInputElement} */ #CHECKBOX = document.querySelector(`#pre-battle [value="Sprt"]`);
    /** @type {HTMLButtonElement} */ #BUTTON = document.querySelector("#spirits > button");
    /** @type {HTMLImageElement} */ #IMAGE = this.#BUTTON.querySelector("img");

    /** @type {Spirit} */ #current_spirit = SPIRITS.Faith;
    /** @param {string} spirit_name */
    #changeSpirit(spirit_name) {
        this.#IMAGE.src = `../assets/images/spirits/${spirit_name}.png`;
        this.#IMAGE.alt = spirit_name;
        this.#current_spirit = SPIRITS[spirit_name];
        if (this.#CHECKBOX.checked)
            document.dispatchEvent(UNITSTATUPDATE);
    }

    constructor() {
        document.querySelector("#fairy-select form").append(...Object.values(SPIRITS).map(x => x.spirit_select))

        /** @type {HTMLDialogElement} */ const SPIRIT_DIALOG = document.querySelector("#spirit-select");
        SPIRIT_DIALOG.addEventListener("close", event => {
            // what if closed by main button
            const OUTPUT = SPIRIT_DIALOG.returnValue || "Faith";
            this.#changeSpirit(OUTPUT);
        })

        this.#BUTTON.addEventListener("click", event => {
            if (SPIRIT_DIALOG.open)
                SPIRIT_DIALOG.close();
            else
                SPIRIT_DIALOG.showModal();
        })
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.HEALTH]() {
        return [this.#current_spirit.ATTRIBUTES.hpflat ?? 0, 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.ATTACK]() {
        return [this.#current_spirit.ATTRIBUTES.atkflat ?? 0, 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.HASHRATE]() {
        return [this.#current_spirit.ATTRIBUTES.hashflat ?? 0, 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.PDEFENSE]() {
        return [this.#current_spirit.ATTRIBUTES.pdefflat ?? 0, 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.ODEFENSE]() {
        return [this.#current_spirit.ATTRIBUTES.odefflat ?? 0, 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.ATKSPD]() {
        return [this.#current_spirit.ATTRIBUTES.aspdflat ?? 0, 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.CRITRATE]() {
        return [0, this.#current_spirit.ATTRIBUTES.crateperc ?? 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.CRITDMG]() {
        return [0, this.#current_spirit.ATTRIBUTES.cdmgperc ?? 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.PPENETRATE]() {
        return [this.#current_spirit.ATTRIBUTES.ppenflat ?? 0, 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.OPENETRATE]() {
        return [this.#current_spirit.ATTRIBUTES.openflat ?? 0, 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.DODGE]() {
        return [0, this.#current_spirit.ATTRIBUTES.dodgeperc ?? 0];
    }

    /** @returns {[number, number]} */
    get [STAT_KEYS.HASTE]() {
        return [0, this.#current_spirit.ATTRIBUTES.hasteperc ?? 0];
    }
})();