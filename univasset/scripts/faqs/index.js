// uses history

import {removeHTMLTag, getTemplateCloner} from "../externaljavascript.js";
import {Random, cmp, setattr} from "../basefunctions/index.js";
import {anchor, fragment, slider} from "../html/index.js";

window.addEventListener("popstate", event => {
    // Inputs reset.
    document.querySelector("#Keywords [name]").value = "";
    for (const INPUT of document.querySelectorAll("#Tags :checked"))
        INPUT.checked = false;

    const CARDFIELD = document.querySelector("#Cards > div");
    CARDFIELD.replaceChildren(getBoxes());
    (async () => twttr.widgets.load(CARDFIELD))();
})

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

/** @param {string} text @param {number[]} ids */
export function getID(text, ...ids) {
    return anchor(text, `./?id=${ids.join("+")}`, {mode: "history"})
}

export function queryFunc() {
    const SLIDER = slider(1, 1, Math.ceil(window.cards.length / 5));
    document.querySelector("#Browse span").replaceWith(SLIDER);
    SLIDER.querySelector("input").name = "page";

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

    // HTMLFormElement.action = value is previous URL
    document.forms["Keywords"].addEventListener("submit", /** @this {HTMLFormElement} */ function(event) {
        const PARAMS = new URLSearchParams(new FormData(this));
        pushPopstate(`./?${PARAMS}`, {});
        event.preventDefault();    
    })
    document.forms["Tags"].addEventListener("submit", /** @this {HTMLFormElement} */ function(event) {
        const PARAMS = new URLSearchParams(new FormData(this));
        pushPopstate(`./?tags=${[...PARAMS.values()].sort(cmp()).join("+")}`, {});
        event.preventDefault();    
    })
    document.forms["Browse"].addEventListener("submit", /** @this {HTMLFormElement} */ function(event) {
        const PARAMS = new URLSearchParams(new FormData(this));
        const QUERY = PARAMS.toString()
        pushPopstate(`./?${QUERY}`, {});
        event.preventDefault();
    })
    document.forms["Cards"].addEventListener("submit", /** @this {HTMLFormElement} */ function(event) {
        const PARAMS = new URLSearchParams(new FormData(this));
        pushPopstate(`./?id=${[...PARAMS.values()].map(Number).sort(cmp()).join("+")}`, {})
        event.preventDefault();    
    })

    history.replaceState({}, "", location.search);
    window.dispatchEvent(new PopStateEvent("popstate", {state: {}}));
}
window.queryFunc = queryFunc;

/** @param {string} url @param {{}} state */
function pushPopstate(url, state) {
    history.pushState(state, "", url);
    window.dispatchEvent(new PopStateEvent("popstate", {state: state}));
}

//#region Card Creation
/** @param {string} text */ function stringToHTML(text) {
    return fragment(...(new DOMParser()).parseFromString(text, "text/html").body.childNodes);
}

/** @type {function(): DocumentFragment} */ var _fieldsetCloner;
/** @param {Card} */ function setQuestionBoxes({id, question, answer, tags}) {
    const CLONE = (_fieldsetCloner ??= getTemplateCloner("#faq-card"))();

    CLONE.querySelector("label").append(id);
    CLONE.querySelector("input").value = id;
    CLONE.querySelector("h3").appendChild(stringToHTML(question));
    CLONE.querySelector("#answer").replaceWith(stringToHTML(answer));
    CLONE.querySelector("#tags").replaceWith(...tags.map(x => setattr(anchor(x.name, `./?tags=${x.name}`, {mode: "history"}), {classList: {add: ["tags"]}})));

    return CLONE;
}

/** @param {Card[]} card_array */
function boxFrag(card_array) {
    return card_array.length ? fragment(...card_array.map(setQuestionBoxes)) : "No matches found.";
}

function getBoxes() {
    /** @type {Card[]} */ const CARDS = window.cards;

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
                return boxFrag(CARDS.slice(COUNT - 5, Math.min(COUNT, CARDS.length)));
            case "id":
                const IDS = VALUE.split(" ").map(Number);
                return boxFrag(CARDS.filter(x => IDS.includes(x.id)));
        }
    }

    return boxFrag(Array.from(Random.iterpop(CARDS, 5)));    
}
//#endregion
