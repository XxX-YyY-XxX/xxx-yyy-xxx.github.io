import {setattr, zip} from "../../univasset/scripts/basefunctions/index.js";
import {template} from "../../univasset/scripts/html/index.js";
import {STAT_KEYS_TYPENAME} from "../unitstats/typing.js";
import {brJoin} from "../../univasset/scripts/htmlgenerator/htmlgenerator.js";

/** @type {Promise<Spirit[]>} */ const SPIRIT_PROMISE = fetch("../spirits.json").then(response => response.json());
/** @type {Promise<GenericSkill[]>} */ const SKILLS_PROMISE = fetch("genericskills.json").then(response => response.json());

/** @type {HTMLDivElement} */ const SPIRITS_DIV = document.querySelector("#spirits");
const spiritButton = template("#spirit-button");
const SPIRIT_DATA = await SPIRIT_PROMISE;
for (const {name, attributes} of SPIRIT_DATA) {
    const CLONE = spiritButton();

    CLONE.querySelector("input").value = name;
    setattr(CLONE.querySelector("img"), {src: `../assets/images/spirits/${name}.png`, alt: name});
    CLONE.querySelector("span").innerText = name;
    CLONE.querySelector("div").appendChild(brJoin(Object.keys(attributes).map(x => STAT_KEYS_TYPENAME[x])));

    SPIRITS_DIV.appendChild(CLONE);
}
SPIRITS_DIV.querySelector(":first-child input").checked = true;

/** @type {HTMLDivElement} */ const SKILLS_DIV = document.querySelector("#skills");
const skillButton = template("#skill-block");
const GENERICSKILLS = await SKILLS_PROMISE;
/** @param {CustomEvent} event */
function loadSkills(event) {
    //check fairy and set number

    //load viable skills - remove first 4 -> add first 4
    SKILLS_DIV.replaceChildren();

    for (const [SKILL, ALT] of zip(SPIRIT_DATA.filter(x => x.name == SPIRITS_DIV.querySelector("input:checked").value)[0].skills, ["P1", "P2", "P3", "A"])) {
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