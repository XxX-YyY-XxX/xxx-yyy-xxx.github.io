import { setattr } from "../../univasset/scripts/basefunctions.js";
import { template } from "../../univasset/scripts/html/index.js";
//import { STAT_KEYS_TYPENAME } from "../unitstats/typing.js";

[
    {

    }
]

/** @type {Promise<Spirit[]>} */ const SPIRIT_PROMISE = fetch("../spirits.json").then(response => response.json())

/** @type {HTMLDivElement} */ const SPIRITS_DIV = document.querySelector("#spirits");
const spiritButton = template("#spirit-button");
for (const {name, attributes, skills} of await SPIRIT_PROMISE) {
    const CLONE = spiritButton();

    CLONE.querySelector("input").value = name;
    setattr(CLONE.querySelector("img"), {src: `../assets/images/spirits/${name}.png`, alt: name});
    CLONE.querySelector("span").innerText = name;

    //STAT_KEYS_TYPENAME
    //<div></div> <!-- stat bonuses -->

    SPIRITS_DIV.appendChild(CLONE);
}

const SPIRITSKILLSWITCH = new CustomEvent("c_switch");

document.addEventListener(SPIRITSKILLSWITCH.type, x => x)

