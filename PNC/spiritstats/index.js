import {setattr, zip} from "../../univasset/scripts/basefunctions/index.js";
import {brJoin, clickedOutside} from "../../univasset/scripts/html/helper.js";
import {template} from "../../univasset/scripts/html/index.js";
import {STAT_KEYS_TYPENAME} from "../unitstats/typing.js";

//#region Promises
/** @type {Promise<Spirit[]>} */ const SPIRIT_PROMISE = fetch("../spirits.json").then(response => response.json());
/** @type {Promise<GenericSkill[]>} */ const SKILLS_PROMISE = fetch("genericskills.json").then(response => response.json());
//#endregion

const SPIRIT_SAVE = new (class {
    #KEY = "spirit";
    
    /** @type {{[SpiritName: string]: [[string, string, string], [string, string, string], [string, string, string]]?}} */
    #DATA = JSON.parse(localStorage.getItem(this.#KEY) ?? "{}");

    // /** @type {{[UnitName: string]: (keyof ALGO_SETS["Offense"] | keyof ALGO_SETS["Stability"] | keyof ALGO_SETS["Special"])[][]}} */
    // #SETS = (() => {this.#DATA})();

    constructor() {}

    init() {

    }

    /** @param {string} name */
    get(name) {
        return this.#DATA[name] ?? [[], [], []];
    }

    /** @param {string} name @param {0 | 1 | 2} set @param {[string, string, string]} skills */
    set(name, set, skills) {
        if (this.#DATA[name])
            this.#DATA[name][set] = skills;
        else {
            const NEW = [["", "", ""], ["", "", ""], ["", "", ""]];
            NEW[set] = skills;
            this.#DATA[name] = NEW;
        }
    }

    /** @param {string} name */
    del(name) {
        delete this.#DATA[name];
    }

    save() {
        localStorage.setItem(this.#KEY, JSON.stringify(this.#DATA))
    }
})();

//#region Spirits
const SPIRIT_DATA = await SPIRIT_PROMISE;

/** @type {HTMLDialogElement} */ const SPIRIT_OPTION = document.querySelector("#spirit-option");
/** @param {string} name */
function getSpirit(name) {
    for (const SPIRIT of SPIRIT_DATA)
        if (SPIRIT.name === name)
            return SPIRIT;
}
SPIRIT_OPTION.addEventListener("click", function(event) {
    if (clickedOutside(this.firstElementChild, event)) this.close(SPIRIT_BUTTON.value);
})
SPIRIT_OPTION.addEventListener("close", function(event) {
    if (SPIRIT_BUTTON.value === this.returnValue) return;
    const SPIRIT = getSpirit(this.returnValue);
    SPIRIT_BUTTON.value = SPIRIT.name;
    setattr(SPIRIT_BUTTON.querySelector("img"), {src: `../assets/images/spirits/${SPIRIT.name}.png`, alt: SPIRIT.name});
    SPIRIT_BUTTON.querySelector("span").innerText = SPIRIT.name;
    SPIRIT_BUTTON.querySelector("div").replaceChildren(brJoin(Object.keys(SPIRIT.attributes).map(x => STAT_KEYS_TYPENAME[x])));
    SKILLS_OBJECT.load({spirit: SPIRIT.name});
});

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

            SPIRIT_OPTION.firstElementChild.appendChild(CLONE);
        }

        SPIRIT_OPTION.showModal();

        BUTTON.removeEventListener("click", spiritOptionModal);
        BUTTON.addEventListener("click", function(event) {
            SPIRIT_OPTION.showModal();
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

    /** @type {{[SpiritNames: string]: HTMLLabelElement[]}} */ #SPECIFIC_SKILLS = {}
    /** @this {this} */
    #specificSkills = function*() {
        if (spirit in this.#SPECIFIC_SKILLS) {
            yield* this.#SPECIFIC_SKILLS[this.#spirit];
        } else {
            this.#SPECIFIC_SKILLS[this.#spirit] = new Array(4);
            for (const [SKILL, CODE] of zip(getSpirit(this.#spirit).skills, ["P1", "P2", "P3", "A"])) {
                const CLONE = this.#skillButton();
                const INPUT = CLONE.querySelector("input");
                INPUT.value = CODE;
                INPUT.addEventListener("change", function(event) {
                    if (this.checked)
                        if (SKILLS_OBJECT.DIV.querySelectorAll("input:checked").length === 3)
                            for (const SKILL of SKILLS_OBJECT.DIV.querySelectorAll("input:not(:checked)"))
                                SKILL.disabled = true;
                    else
                        for (const SKILL of SKILLS_OBJECT.DIV.querySelectorAll("input:disabled"))
                            SKILL.disabled = false;
                });
                CLONE.querySelector("span").innerText = SKILL.name;
                CLONE.querySelector("div").innerText = SKILL.description;

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
            INPUT.addEventListener("change", (event) => {
                if (INPUT.checked) {
                    const CHECK_COUNT = this.DIV.querySelectorAll("input:checked").length;
                    //if (CHECK_COUNT < 3) {}
                    if (CHECK_COUNT === 3)
                        for (const SKILL of this.DIV.querySelectorAll("input:not(:checked)"))
                            SKILL.disabled = true;
                    //else console.error("Too many checked skills.");
                }
                else
                    for (const SKILL of this.DIV.querySelectorAll("input:disabled"))
                        SKILL.disabled = false;
            });
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

        //check if 3 or less
        //what if 4?
        for (const SKILL of SKILLS) {
            if ([].includes(SKILL.querySelector("input").value)) {

            } else {

            }
            
            //localstorage saved checked skills
        }
        SKILLS_OBJECT.DIV.replaceChildren(...SKILLS);

        //load checked skills
        //disable other checkboxes if 3 boxes are checked


    }
})(await SKILLS_PROMISE);