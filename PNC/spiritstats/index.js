import {setattr, zip} from "../../univasset/scripts/basefunctions/index.js";
import {brJoin, clickedOutside} from "../../univasset/scripts/html/helper.js";
import {template} from "../../univasset/scripts/html/index.js";
import {STAT_KEYS_TYPENAME} from "../unitstats/typing.js";
import {KEY} from "../general.js";
import {retrieve, store} from "../../main.js";

//#region Promises
/** @type {Promise<Spirit[]>} */ const SPIRIT_PROMISE = fetch("../spirits.json").then(response => response.json());
/** @type {Promise<GenericSkill[]>} */ const SKILLS_PROMISE = fetch("genericskills.json").then(response => response.json());
//#endregion

/** @typedef {[[string, string, string], [string, string, string], [string, string, string]]} SpiritSets */

const SPIRIT_SAVE = new (class {
    #TEST = {}

    /** @returns {{[SpiritName: string]: SpiritSets | undefined}} */
    get #savedata() {
        //return retrieve(KEY.spirit) ?? {};
        return this.#TEST
    }

    set #savedata(value) {
        //store(KEY.spirit, value);
        this.#TEST = value
    }
    
    /** @returns {SpiritSets} */
    get #emptyarray() {return [["", "", ""], ["", "", ""], ["", "", ""]]}

    /** @param {string} name @param {0 | 1 | 2} set */
    get(name, set) {
        const OUTPUT = (this.#savedata[name] ?? this.#emptyarray)[set]

        console.log("Saved skills:", OUTPUT)

        return {
            /** Empty slots represented by empty strings.
             * @type {[string, string, string]} */
            skills: [...OUTPUT, "", "", ""].slice(0, 3),
            /** True if all 3 skill slots are filled. */
            full: OUTPUT.length === 3
        };
    }
    
    /** @param {string} name @param {0 | 1 | 2} set @param {string[]} skills Maximum 3. */
    set(name, set, skills) {
        if (skills.length > 3) throw new Error("Too many skills.");

        const DATA = this.#savedata;
        DATA[name] ??= this.#emptyarray;
        DATA[name][set] = skills;
        this.#savedata = DATA;

        console.log(this.#savedata)
    }
})();

//#region Spirits
/** @param {string} name */
function getSpirit(name) {
    for (const SPIRIT of SPIRIT_DATA)
        if (SPIRIT.name === name)
            return SPIRIT;
}

/** @param {string} spirit_name */
function spiritImage(spirit_name) {
    return `../assets/images/spirits/${spirit_name}.png`;
}

const SPIRIT_DIALOG = (() => {
    /** @type {HTMLDialogElement} */ const DIALOG = document.querySelector("#spirit-option");

    DIALOG.addEventListener("click", function(event) {
        if (clickedOutside(this.firstElementChild, event)) this.close(SPIRIT_BUTTON.value);
    })

    DIALOG.addEventListener("close", function(event) {
        if (SPIRIT_BUTTON.value === this.returnValue) return;
        const SPIRIT = getSpirit(this.returnValue);
        SPIRIT_BUTTON.value = SPIRIT.name;
        setattr(SPIRIT_BUTTON.querySelector("img"), {src: spiritImage(SPIRIT.name), alt: SPIRIT.name});
        SPIRIT_BUTTON.querySelector("span").innerText = SPIRIT.name;
        SPIRIT_BUTTON.querySelector("div").replaceChildren(brJoin(Object.keys(SPIRIT.attributes).map(x => STAT_KEYS_TYPENAME[x])));
        SKILLS_LIST.load({spirit: SPIRIT.name});
    });

    return DIALOG;
})();

const SPIRIT_DATA = await SPIRIT_PROMISE;
const SPIRIT_BUTTON = (() => {
    const spiritButton = template("#spirit-button-template");

    /** @this {HTMLButtonElement} @param {MouseEvent} event*/
    function spiritOptionModal(event) {
        for (const {name, attributes} of SPIRIT_DATA) {
            const CLONE = spiritButton();

            CLONE.querySelector("button").value = name;
            setattr(CLONE.querySelector("img"), {src: spiritImage(name), alt: name});
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

    const {name, attributes} = SPIRIT_DATA[0];
    const CLONE = spiritButton();

    const BUTTON = CLONE.querySelector("button");
    BUTTON.value = name;
    BUTTON.type = "button";
    BUTTON.addEventListener("click", spiritOptionModal);

    setattr(CLONE.querySelector("img"), {src: spiritImage(name), alt: name});
    CLONE.querySelector("span").innerText = name;
    CLONE.querySelector("div").appendChild(brJoin(Object.keys(attributes).map(x => STAT_KEYS_TYPENAME[x])));

    document.querySelector("#spirit-a").replaceWith(CLONE);
    return BUTTON;
})();
//#endregion

//#region Sets
for (const RADIO of document.querySelectorAll(`[name="set"]`)) {
    RADIO.addEventListener("change", /** @this {HTMLInputElement} @param {MouseEvent} event */ function(event) {
        SKILLS_LIST.load({set: Number.parseInt(this.value)});
    })
}
//#endregion

const SKILLS_LIST = new (class {
    /** @type {HTMLDivElement} */ DIV = document.querySelector("#skills");
    #skillButton = template("#skill-block");

    /**
     * @param {GenericSkill[]} generic */
    constructor(generic) {
        this.DIV.append(...this.#specificSkills());
        for (const {name, description} of generic) {
            const CLONE = this.#skillButton();

            const INPUT = CLONE.querySelector("input");
            INPUT.value = name;
            INPUT.addEventListener("change", this.#handleCheckbox);

            CLONE.querySelector("span").innerText = name;
            CLONE.querySelector("div").innerText = description;

            this.DIV.appendChild(CLONE);
        }

        const {skills, full} = SPIRIT_SAVE.get(this.#spirit, this.#set);
        for (const SKILL of this.DIV.children) {
            const INPUT = SKILL.querySelector("input");
            if (skills.includes(INPUT.value)) INPUT.checked = true;
            else INPUT.disabled = full;
        }
    }

    /** @this {HTMLInputElement} @param {MouseEvent} event */
    #handleCheckbox(event) {
        if (this.checked) {
            if (SKILLS_LIST.DIV.querySelectorAll("input:checked").length === 3)
                for (const SKILL of SKILLS_LIST.DIV.querySelectorAll("input:not(:checked)"))
                    SKILL.disabled = true;
            //else console.error("Too many checked skills.");
        } else
            for (const SKILL of SKILLS_LIST.DIV.querySelectorAll("input:disabled"))
                SKILL.disabled = false;
        SPIRIT_SAVE.set(SKILLS_LIST.#spirit, SKILLS_LIST.#set, Array.from(document.querySelectorAll("input:checked")).map(x => x.value));
    }

    /** @type {{[SpiritNames: string]: [HTMLLabelElement, HTMLLabelElement, HTMLLabelElement, HTMLLabelElement]?}} */ #SPECIFIC_SKILLS = {}
    /** @this {this} */
    #specificSkills = function*() {
        for (const [{name, description}, CODE] of zip(getSpirit(this.#spirit).skills, ["P1", "P2", "P3", "A"])) {
            const CLONE = this.#skillButton();
            if (CLONE === null) throw new Error("Skill button template missing.");

            const INPUT = CLONE.querySelector("input");
            INPUT.value = CODE;
            INPUT.addEventListener("change", this.#handleCheckbox);

            CLONE.querySelector("span").innerText = name;
            CLONE.querySelector("div").innerText = description;
            yield CLONE;
        }
    }

    #spirit = SPIRIT_BUTTON.value;
    #set = 0;
    /**
     * @param {object} param0 
     * @param {string?} param0.spirit
     * @param {0 | 1 | 2?} param0.set */
    load({spirit = null, set = null}) {
        if (spirit !== null) {
            const PREVIOUS = this.#spirit;
            this.#spirit = spirit;

            const LOADED_SKILLS = [];
            for (const [OLD, NEW] of zip(this.DIV.children, (this.#SPECIFIC_SKILLS[this.#spirit] ?? this.#specificSkills()))) {
                LOADED_SKILLS.push(OLD);
                OLD.replaceWith(NEW);
            }
            this.#SPECIFIC_SKILLS[PREVIOUS] ??= LOADED_SKILLS;
        }
        if (set !== null) this.#set = set;

        const {skills, full} = SPIRIT_SAVE.get(this.#spirit, this.#set);
        for (const SKILL of this.DIV.children) {
            const INPUT = SKILL.querySelector("input");
            INPUT.checked = false;  //Reset
            INPUT.disabled = false;

            if (skills.includes(INPUT.value)) INPUT.checked = true;
            else INPUT.disabled = full;
        }
    }
})(await SKILLS_PROMISE);

//might make into preload image function
(async function() {
    for (const {name} of SPIRIT_DATA.slice(1)) {
        const IMAGE = new Image();
        IMAGE.src = spiritImage(name);
    }
})()
