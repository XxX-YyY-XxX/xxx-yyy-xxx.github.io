import {STAT_KEYS, STAT_KEYS_TYPE, UNITSTATUPDATE, STAT_KEYS_TYPENAME} from "./typing.js";
import {getTemplateCloner} from "../../univasset/scripts/externaljavascript.js"
import {setattr} from "../../univasset/scripts/basefunctions/pseudobuiltin.js";
import {brJoin} from "../../univasset/scripts/htmlgenerator/htmlgenerator.js"

const _dialogButtons = getTemplateCloner("#spirits-template");

// all skills assumed S rank
// skills likely in-battle bonus
// attributes likely pre-battle bonus

// /**
//  * @typedef {object} SpecificSkill
//  * @property {"Passive" | "Auto"} SpecificSkill.type
//  * @property {string} SpecificSkill.description
//  */

class Spirit {
    // https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
    /** @type {{[x in STAT_KEYS_TYPE[keyof STAT_KEYS_TYPE]]: number?>}} */ ATTRIBUTES;

    /** @type {DocumentFragment} */ #html;
    get html() {
        return this.#html ??= (() => {
            const FRAGMENT = _dialogButtons();
            const NAME = this.constructor.name;

            FRAGMENT.querySelector("button").value = NAME;
            setattr(FRAGMENT.querySelector("img"), {src: `../assets/images/spirits/${NAME}.png`, alt: NAME});
            FRAGMENT.querySelector("span").textContent = NAME;
            FRAGMENT.querySelector("div").appendChild(brJoin(Object.keys(this.ATTRIBUTES).map(x => STAT_KEYS_TYPENAME[x])));

            return FRAGMENT;
        })();
    }

    // GENERIC_SKILLS = {
    //     "": {
    //         type: "Passive",
    //         description: ""
    //     }
    // }
    // /** @type {{[skillname: string]: SpecificSkill}} */ SPECIFIC_SKILLS;

    // /** @type {[string, string, string]} */ skills = []
}

// SPECIFIC_SKILLS = {
//     "": {
//         type: "Auto",
//         description: ""
//     }
// }

// const SPIRIT_ATTRIBUTES = Object.freeze({

// });

const SPIRITS = {
    Love: new (class Love extends Spirit {
        ATTRIBUTES = {
            [STAT_KEYS_TYPE.HEALTH_F]: 4000,
            [STAT_KEYS_TYPE.ATTACK_F]: 120,
            [STAT_KEYS_TYPE.HASHRATE_F]: 120,
            [STAT_KEYS_TYPE.ATKSPD_F]: 50,
            [STAT_KEYS_TYPE.DODGE_P]: 12.5
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
    /** @type {HTMLInputElement} */ #CHECKBOX = document.querySelector(`#bonus [value="Sprt"]`);
    /** @type {HTMLButtonElement} */ #BUTTON = document.querySelector("#team #spirits > button");
    /** @type {HTMLImageElement} */ #IMAGE = this.#BUTTON.querySelector("img");
    /** @type {HTMLDialogElement} */ #DIALOG = document.querySelector("#team #spirits dialog");

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
        document.querySelector("#spirits form").append(...Object.values(SPIRITS).map(x => x.html))

        this.#BUTTON.addEventListener("click", event => {
            if (this.#DIALOG.open)
                this.#DIALOG.close();
            else
                this.#DIALOG.show();
        })

        this.#DIALOG.addEventListener("close", event => {
            // what if closed by main button
            const OUTPUT = this.#DIALOG.returnValue || "Faith";
            this.#changeSpirit(OUTPUT);
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