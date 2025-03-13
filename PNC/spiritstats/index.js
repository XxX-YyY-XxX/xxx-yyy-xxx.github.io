import {setattr, zip} from "../../univasset/scripts/basefunctions/index.js";
import {brJoin, clickedOutside} from "../../univasset/scripts/html/helper.js";
import {template} from "../../univasset/scripts/html/index.js";
import {STAT_KEYS_TYPENAME} from "../unitstats/typing.js";
import {KEY} from "../general.js";

//#region Promises
/** @type {Promise<Spirit[]>} */ const SPIRIT_PROMISE = fetch("../spirits.json").then(response => response.json());
/** @type {Promise<GenericSkill[]>} */ const SKILLS_PROMISE = fetch("genericskills.json").then(response => response.json());
//#endregion

/** @typedef {[[string, string, string], [string, string, string], [string, string, string]]} SpiritSets */

const SPIRIT_SAVE = new (class {
    #KEY = KEY.spirit;

    #TEST = {}

    /** @returns {{[SpiritName: string]: SpiritSets | undefined}} */
    get #savedata() {
        //return JSON.parse(localStorage.getItem(this.#KEY) ?? "{}");
        return this.#TEST
    }

    set #savedata(value) {
        //localStorage.setItem(this.#KEY, JSON.stringify(value))
        this.#TEST = value
    }
    
    /** @returns {SpiritSets} */
    get #emptyarray() {return [["", "", ""], ["", "", ""], ["", "", ""]]}

    /** @param {string} name @param {0 | 1 | 2} set */
    get(name, set) {
        return (this.#savedata[name] ?? this.#emptyarray)[set];
    }
    
    /** @param {string} name @param {0 | 1 | 2} set @param {[string, string, string]} skills */
    set(name, set, skills) {
        if (skills.length > 3) throw new Error("Too many skills");

        const DATA = this.#savedata;
        DATA[name] ??= this.#emptyarray;
        DATA[name][set] = skills;
        this.#savedata = DATA;
    }
})();

//#region Spirits
/** @param {string} name */
function getSpirit(name) {
    for (const SPIRIT of SPIRIT_DATA)
        if (SPIRIT.name === name)
            return SPIRIT;
}    

const SPIRIT_DATA = await SPIRIT_PROMISE;
const SPIRIT_DIALOG = (() => {
    /** @type {HTMLDialogElement} */ const DIALOG = document.querySelector("#spirit-option");

    DIALOG.addEventListener("click", function(event) {
        if (clickedOutside(this.firstElementChild, event)) this.close(SPIRIT_BUTTON.value);
    })

    DIALOG.addEventListener("close", function(event) {
        if (SPIRIT_BUTTON.value === this.returnValue) return;
        const SPIRIT = getSpirit(this.returnValue);
        SPIRIT_BUTTON.value = SPIRIT.name;
        setattr(SPIRIT_BUTTON.querySelector("img"), {src: `../assets/images/spirits/${SPIRIT.name}.png`, alt: SPIRIT.name});
        SPIRIT_BUTTON.querySelector("span").innerText = SPIRIT.name;
        SPIRIT_BUTTON.querySelector("div").replaceChildren(brJoin(Object.keys(SPIRIT.attributes).map(x => STAT_KEYS_TYPENAME[x])));
        SKILLS_OBJECT.load({spirit: SPIRIT.name});
    });

    return DIALOG;
})();

const spiritButton = template("#spirit-button-template");
const SPIRIT_BUTTON = (() => {
    const {name, attributes} = SPIRIT_DATA[0];
    const CLONE = spiritButton();

    /** @this {HTMLButtonElement} @param {MouseEvent} event*/
    function spiritOptionModal(event) {
        for (const {name, attributes} of SPIRIT_DATA) {
            const CLONE = spiritButton();

            CLONE.querySelector("button").value = name;
            setattr(CLONE.querySelector("img"), {src: `../assets/images/spirits/${name}.png`, alt: name});
            CLONE.querySelector("span").innerText = name;
            CLONE.querySelector("div").appendChild(brJoin(Object.keys(attributes).map(x => STAT_KEYS_TYPENAME[x])));

            SPIRIT_DIALOG.firstElementChild.appendChild(CLONE);
        }

        SPIRIT_DIALOG.showModal();

        BUTTON.removeEventListener("click", spiritOptionModal);
        BUTTON.addEventListener("click", function(event) {
            SPIRIT_DIALOG.showModal();
        });
    }

    const BUTTON = CLONE.querySelector("button");
    BUTTON.value = name;
    BUTTON.type = "button";
    BUTTON.addEventListener("click", spiritOptionModal);

    setattr(CLONE.querySelector("img"), {src: `../assets/images/spirits/${name}.png`, alt: name});
    CLONE.querySelector("span").innerText = name;
    CLONE.querySelector("div").appendChild(brJoin(Object.keys(attributes).map(x => STAT_KEYS_TYPENAME[x])));

    document.querySelector("#spirit-a").replaceWith(CLONE);
    return BUTTON;
})();
//#endregion

//#region Sets
for (const RADIO of document.querySelectorAll(`[name="set"]`)) {
    RADIO.addEventListener("change", /** @this {HTMLInputElement} @param {MouseEvent} event */ function(event) {
        SKILLS_OBJECT.load({set: Number.parseInt(this.value)});
    })
}
//#endregion

const SKILLS_OBJECT = new (class {
    /** @type {HTMLDivElement} */ DIV = document.querySelector("#skills");
    #skillButton = template("#skill-block");
    #GENERIC;

    /**
     * @param {GenericSkill[]} generic */
    constructor(generic) {
        this.#GENERIC = generic;
        this.load({spirit: SPIRIT_BUTTON.value, set: 0});
    }

    /** @this {HTMLInputElement} @param {MouseEvent} event */
    #handleCheckbox(event) {
        if (this.checked)
            if (SKILLS_OBJECT.DIV.querySelectorAll("input:checked").length === 3)
                for (const SKILL of SKILLS_OBJECT.DIV.querySelectorAll("input:not(:checked)"))
                    SKILL.disabled = true;
            //else console.error("Too many checked skills.");
        else
            for (const SKILL of SKILLS_OBJECT.DIV.querySelectorAll("input:disabled"))
                SKILL.disabled = false;
        const CHECKED = Array.from(document.querySelectorAll("input:checked")).map(x => x.value);
        SPIRIT_SAVE.set(SKILLS_OBJECT.#spirit, SKILLS_OBJECT.#set, CHECKED.fill("", CHECKED.length, 2))
    }

    /** @type {{[SpiritNames: string]: [HTMLLabelElement, HTMLLabelElement, HTMLLabelElement, HTMLLabelElement]?}} */ #SPECIFIC_SKILLS = {}
    /** @this {this} */
    #specificSkills = function*() {
        const SKILLS = this.#SPECIFIC_SKILLS[this.#spirit];
        if (SKILLS) yield* SKILLS;
        else {
            this.#SPECIFIC_SKILLS[this.#spirit] = new Array(4);
            for (const [{name, description}, CODE] of zip(getSpirit(this.#spirit).skills, ["P1", "P2", "P3", "A"])) {
                const CLONE = this.#skillButton();
                const INPUT = CLONE.querySelector("input");
                INPUT.value = CODE;
                INPUT.addEventListener("change", this.#handleCheckbox);
                CLONE.querySelector("span").innerText = name;
                CLONE.querySelector("div").innerText = description;
    
                this.#SPECIFIC_SKILLS[this.#spirit].push(CLONE.querySelector("label"));
                yield CLONE;
            }
        }
    }

    /** @this {this} */
    #genericSkills = function*() {
        this.#genericSkills = function*() {
            yield* Array.from(this.DIV.children).slice(4);
        }

        for (const {name, description} of this.#GENERIC) {
            const CLONE = this.#skillButton();
            const INPUT = CLONE.querySelector("input");
            INPUT.value = name;
            INPUT.addEventListener("change", this.#handleCheckbox);
            CLONE.querySelector("span").innerText = name;
            CLONE.querySelector("div").innerText = description;
            yield CLONE.querySelector("label");
        }
    }

    /** @type {string} */ #spirit;
    /** @type {number} */ #set;
    /**
     * @param {object} param0 
     * @param {string?} param0.spirit
     * @param {number?} param0.set */
    load({spirit = null, set = null}) {
        if (spirit !== null) this.#spirit = spirit;
        if (set !== null) this.#set = set;

        const SKILLS = [...this.#specificSkills(), ...this.#genericSkills()];
        for (const SKILL of SKILLS) {   //Reset
            const INPUT = SKILL.querySelector("input");
            INPUT.checked = false;
            INPUT.disabled = false;
        }
        const SAVED_SKILLS = SPIRIT_SAVE.get(this.#spirit, this.#set);
        const DISABLE = SAVED_SKILLS.every(x => x);
        for (const SKILL of SKILLS) {
            const INPUT = SKILL.querySelector("input");
            if (SAVED_SKILLS.includes(INPUT.value)) INPUT.checked = true;
            else INPUT.disabled = DISABLE;
        }
        this.DIV.replaceChildren(...SKILLS);
    }
})(await SKILLS_PROMISE);