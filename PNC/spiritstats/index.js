import {setattr, zip} from "../../univasset/scripts/basefunctions/index.js";
import {template} from "../../univasset/scripts/html/index.js";
import {STAT_KEYS_TYPENAME} from "../unitstats/typing.js";
import {brJoin} from "../../univasset/scripts/htmlgenerator/htmlgenerator.js";

//#region Promises
/** @type {Promise<Spirit[]>} */ const SPIRIT_PROMISE = fetch("../spirits.json").then(response => response.json());
/** @type {Promise<GenericSkill[]>} */ const SKILLS_PROMISE = fetch("genericskills.json").then(response => response.json());
//#endregion

//#region Initialize
/** @type {HTMLDialogElement} */ const SPIRIT_OPTION = document.querySelector("#spirit-option");
/** @param {string} name */
function getSpirit(name) {
    for (const SPIRIT of SPIRIT_DATA)
        if (SPIRIT.name === name)
            return SPIRIT;
}
/**
 * @param {HTMLElement} element 
 * @param {MouseEvent} event */
function clickedOutside(element, event) {
    const DIM = element.getBoundingClientRect();
    return event.clientX < DIM.left || event.clientX > DIM.right || event.clientY < DIM.top || event.clientY > DIM.bottom;
}
SPIRIT_OPTION.addEventListener("click", function(event) {
    if (clickedOutside(this, event)) this.close();
})
SPIRIT_OPTION.addEventListener("close", function(event) {
    const SPIRIT = getSpirit(this.returnValue);
    if (SPIRIT_BUTTON.value === SPIRIT.name) return;
    SPIRIT_BUTTON.value = SPIRIT.name;
    setattr(SPIRIT_BUTTON.querySelector("img"), {src: `../assets/images/spirits/${SPIRIT.name}.png`, alt: SPIRIT.name});
    SPIRIT_BUTTON.querySelector("span").innerText = SPIRIT.name;
    SPIRIT_BUTTON.querySelector("div").appendChild(brJoin(Object.keys(SPIRIT.attributes).map(x => STAT_KEYS_TYPENAME[x])));
});

const spiritButton = template("#spirit-button");
const SPIRIT_DATA = await SPIRIT_PROMISE;
const SPIRIT_BUTTON = (() => {
    const {name, attributes} = SPIRIT_DATA[0];
    const CLONE = spiritButton();

    /** @this {HTMLButtonElement} @param {MouseEvent} event*/
    function spiritOptionModal(event) {
        console.log("spiritOptionModal first load.")

        for (const {name, attributes} of SPIRIT_DATA) {
            const CLONE = spiritButton();

            CLONE.querySelector("button").value = name;
            setattr(CLONE.querySelector("img"), {src: `../assets/images/spirits/${name}.png`, alt: name});
            CLONE.querySelector("span").innerText = name;
            CLONE.querySelector("div").appendChild(brJoin(Object.keys(attributes).map(x => STAT_KEYS_TYPENAME[x])));

            SPIRIT_OPTION.firstElementChild.appendChild(CLONE);
        }

        SPIRIT_OPTION.showModal();
        spiritOptionModal = function(event) {
            SPIRIT_OPTION.showModal();
        }
    }

    const BUTTON = CLONE.querySelector("button");
    BUTTON.value = name;
    BUTTON.type = "button";
    BUTTON.addEventListener("click", spiritOptionModal)

    setattr(CLONE.querySelector("img"), {src: `../assets/images/spirits/${name}.png`, alt: name});
    CLONE.querySelector("span").innerText = name;
    CLONE.querySelector("div").appendChild(brJoin(Object.keys(attributes).map(x => STAT_KEYS_TYPENAME[x])));

    document.querySelector("#spirit-a").replaceWith(CLONE);
    return BUTTON;
})();
//#endregion

//#region Skills
/** @type {HTMLDivElement} */ const SKILLS_DIV = document.querySelector("#skills");
const skillButton = template("#skill-block");
const GENERICSKILLS = await SKILLS_PROMISE;
/** @param {CustomEvent} event */
function loadSkills(event) {
    //check fairy and set number

    //load viable skills - remove first 4 -> add first 4
    SKILLS_DIV.replaceChildren();

    document.querySelector("#main_content > button")
    
    for (const [SKILL, ALT] of zip(getSpirit(SPIRIT_BUTTON.value).skills, ["P1", "P2", "P3", "A"])) {
        const CLONE = skillButton();
    
        CLONE.querySelector("input").value = ALT;
        CLONE.querySelector("span").innerText = SKILL.name;
        CLONE.querySelector("div").innerText = SKILL.description;
    
        SKILLS_DIV.appendChild(CLONE);
    }
    for (const SKILL of GENERICSKILLS) {
        const CLONE = skillButton();
    
        CLONE.querySelector("input").value = SKILL.name;
        CLONE.querySelector("span").innerText = SKILL.name;
        CLONE.querySelector("div").innerText = SKILL.description;
    
        SKILLS_DIV.appendChild(CLONE);
    }

    //SKILLS_DIV.before()
    //Number(document.querySelector("[name='set']:checked").value) - 1

    //load checked skills
    //disable other checkboxes if 3 boxes are checked

}

const SKILLSETSWITCH = new CustomEvent("c_switch");
document.addEventListener(SKILLSETSWITCH.type, loadSkills, true);
loadSkills();
//#endregion

