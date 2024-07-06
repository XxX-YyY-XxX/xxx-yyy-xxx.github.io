import {removeHTMLTag, getTemplateCloner} from "../externaljavascript.js";
import {Random, cmp, setattr} from "../basefunctions/index.js";
import {anchor, fragment} from "../html/index.js";

// /** Checks if the element is interacted by the user. 
//  * @param {Event} event */
// function isUserInput(event) {
//     if (event instanceof MouseEvent)
//         return Boolean(event.screenX && event.screenY);
//     else if (!event.isTrusted)  // dispatchEvent
//         return false;
//     else    // Keyboard, other script calls?
//         return true;
// }

/** @typedef {{[TagKey: string]: {name: string, description: string}}} Tag */

/**
 * @typedef Card
 * @property {number} Card.id
 * @property {string} Card.question
 * @property {string} Card.answer
 * @property {Tag[keyof Tag][]} Card.tags
 */

/** @type {function(): DocumentFragment} */ var _fieldsetCloner;
/** @type {HTMLInputElement} */ var RANGE;
const HISTORY_DATA = {
    /** Mostly used for twitter embeds. */
    reload: false
}
window.queryFunc = function() {
    _fieldsetCloner = getTemplateCloner("#faq-card");

    /** @type {Tag} */ const TAG_DICT = window.tags;
    const TAGS_FIELD = document.querySelector("#Tags div");
    const _tagsearchCloner = getTemplateCloner("#query-tag");
    for (const {name, description} of Object.values(TAG_DICT).sort(cmp({key: x => x.name}))) {
        const FRAGMENT = _tagsearchCloner();

        FRAGMENT.querySelector("input").value = name;
        FRAGMENT.querySelector("#name").replaceWith(name);
        FRAGMENT.querySelector(".tooltiptext").textContent = description;

        TAGS_FIELD.appendChild(FRAGMENT);
    }

    RANGE = document.querySelector('#Browse input[type="range"]');
    RANGE.setAttribute("max", Math.ceil((window.cards.length) / 5));

    for (const FORM of document.forms) {
        switch (FORM.id) {
            case "Tags":
                FORM.addEventListener("submit", function(event) {
                    console.log("Action:", this.action)
                    const PARAMS = new URLSearchParams(new FormData(this));
                    console.log("Params:", PARAMS)
                    history.pushState(HISTORY_DATA, "", `?tags=${[...PARAMS.values()].sort().join("+")}`);
                    window.dispatchEvent(new PopStateEvent("popstate", {state: HISTORY_DATA}));
                    event.preventDefault();
                })
                break;
            case "cards-field":
                FORM.addEventListener("submit", function(event) {
                    console.log("Action:", this.action)
                    const PARAMS = new URLSearchParams(new FormData(this));
                    console.log("Params:", PARAMS)
                    // history.pushState(HISTORY_DATA, "", `?tags=${[...PARAMS.values()].sort().join("+")}`);
                    // window.dispatchEvent(new PopStateEvent("popstate", {state: HISTORY_DATA}));
                    event.preventDefault();
                })
                break;
            default:
                FORM.addEventListener("submit", function(event) {
                    console.log("Action:", this.action)
                    const PARAMS = new URLSearchParams(new FormData(this));
    
                    // initialize history data first by searching values
                    history.pushState(HISTORY_DATA, "", `?${PARAMS}`);
                    window.dispatchEvent(new PopStateEvent("popstate", {state: HISTORY_DATA}));
    
                    event.preventDefault();
                })
                break;
        }
    }

    history.replaceState(HISTORY_DATA, "", location.search);
    window.dispatchEvent(new PopStateEvent("popstate", {state: HISTORY_DATA}));
}

window.addEventListener("popstate", function(event) {
    const OUTPUT = getBoxes();

    // if (OUTPUT instanceof DocumentFragment && OUTPUT.querySelector(".twitter-tweet")) {
    //     history.go();
    //     return;
    // }

    // Inputs reset.
    document.querySelector(`#Keywords [name="search"]`).value = "";
    for (const INPUT of document.querySelectorAll(`#Tags :checked`))
        INPUT.checked = false;

    document.querySelector("#cards-field").replaceChildren(OUTPUT);
})

//#region Card Creation
/** @param {string} text */ function stringToHTML(text) {
    return setattr(new DocumentFragment(), {append: [...(new DOMParser()).parseFromString(text, "text/html").body.childNodes]});
}

// const HREF = location.origin + location.pathname;
/** @param {Card} */ function setQuestionBoxes({id, question, answer, tags}) {
    const CLONE = _fieldsetCloner();

    // CLONE.querySelector("fieldset").id = id;
    CLONE.querySelector("label").append(id);
    CLONE.querySelector("input").value = id;
    CLONE.querySelector("h3").appendChild(stringToHTML(question));
    CLONE.querySelector("#answer").replaceWith(stringToHTML(answer));
    CLONE.querySelector("#tags").replaceWith(...tags.map(x => setattr(anchor(x.name, `./?tags=${x.name}`, {mode: "history", data: HISTORY_DATA}), {classList: {add: ["tags"]}})));

    return CLONE;
}

/** @param {Card[]} card_array */
function boxFrag(card_array) {
    return card_array.length ? fragment(...card_array.map(setQuestionBoxes)) : "No matches found.";
    // if (!card_array.length) return "No matches found.";
    // return fragment(...card_array.map(setQuestionBoxes));
}

function getBoxes() {
    /** @type {Card[]} */ const CARDS = window.cards;
    HISTORY_DATA.reload = false;

    for (const [KEY, VALUE] of new URLSearchParams(location.search)) {
        if (!VALUE) return "Empty field.";

        switch (KEY) {
            case "search":
                const KEYWORDS = VALUE.replace(/\s+/, " ").toLowerCase().split(" ");
                return boxFrag(CARDS.filter(x => KEYWORDS.every(str => [x.question, x.answer].some(y => removeHTMLTag(y).toLowerCase().includes(str)))));
            case "tags":
                const TAGS = VALUE.split(" ");
                return boxFrag(CARDS.filter(x => TAGS.subsetof(x.tags.map(y => y.name))));
            case "page":
                const PAGE = Number(VALUE), COUNT = PAGE * 5;
                setattr(RANGE, {value: PAGE, onchange: []});
                return boxFrag(CARDS.slice(COUNT - 5, Math.min(COUNT, CARDS.length)));
            case "id":
                const IDS = VALUE.split(" ").map(Number);
                return boxFrag(CARDS.filter(x => IDS.includes(x.id)));
        }
    }

    return boxFrag(Array.from(Random.iterpop(CARDS, 5)));    
}
//#endregion
