import {removeHTMLTag, randInt, getTemplateCloner} from "../externaljavascript.js";
import {cmp, setattr} from "../basefunctions/index.js";

// /** Checks if the element is interacted by the user. 
//  * @param {Event} event 
//  * @returns
//  */
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

/** @param {Tag} tags_dict @param {Card[]} cards_list */
window.queryFunc = function(tags_dict, cards_list) {
    //#region Tags Field
    const TAGS_FIELD = document.querySelector("#Tags div");
    const _tagsearchCloner = getTemplateCloner("#query-tag");
    /** @type {HTMLInputElement[]} */ const TAG_CHECKBOXES = [];
    /** @type {HTMLInputElement} */ const TAGS_TEXT = document.querySelector('#Tags input[type="text"]');
    for (const {name, description} of Object.values(tags_dict).sort(cmp({key: x => x.name}))) {
        const CLONE = _tagsearchCloner();

        const INPUT = setattr(CLONE.querySelector("input"), {value: name});
        INPUT.addEventListener("change", function(event) {
            TAGS_TEXT.value = (this.checked ? TAGS_TEXT.value + " " + this.value : TAGS_TEXT.value.replace(this.value, "")).replace("  ", " ").trim();
        });
        TAG_CHECKBOXES.push(INPUT);

        CLONE.querySelector("#name").replaceWith(name);
        CLONE.querySelector(".tooltiptext").textContent = description;

        TAGS_FIELD.appendChild(CLONE);
    }
    //#endregion

    //#region Tag Buttons
    const BUTTON = {
        /** @type {HTMLInputElement} */ KEY: document.querySelector('.tab-button [value="Keywords"]'),
        /** @type {HTMLInputElement} */ TAG: document.querySelector('.tab-button [value="Tags"]'),
        /** @type {HTMLInputElement} */ BWS: document.querySelector('.tab-button [value="Browse"]')
    }
    const CHANGE = new Event("change");
    var current_checked = BUTTON.KEY;

    /** @type {HTMLInputElement} */ const TEXT_FIELD = document.querySelector(`#Keywords [type="text"]`);
    BUTTON.KEY.addEventListener("change", function(event) {
        if (event.isTrusted) {  // To check if user input or programmatic
            if (current_checked === this) return;
            current_checked.dispatchEvent(CHANGE);
            current_checked = this;
        }

        if (!this.checked) TEXT_FIELD.value = "";
    });

    BUTTON.TAG.addEventListener("change", function(event) {
        if (event.isTrusted) {
            if (current_checked === this) return;
            current_checked.dispatchEvent(CHANGE);
            current_checked = this;
        }

        if (!this.checked) {
            TAGS_TEXT.value = "";
            for (const INPUT_TRUE of TAG_CHECKBOXES.filter(input => input.checked))
                INPUT_TRUE.checked = false;
        }
    });

    BUTTON.BWS.addEventListener("change", function(event) {
        if (event.isTrusted) {
            if (current_checked === this) return;
            current_checked.dispatchEvent(CHANGE);
            current_checked = this;
        }
    });
    //#endregion

    //#region Card Creation
    /** @param {string} text @returns {DocumentFragment} */ function stringToHTML(text) {
        return setattr(new DocumentFragment(), {append: [...(new DOMParser()).parseFromString(text, "text/html").body.childNodes]});
    }

    const HREF = location.origin + location.pathname;
    const _fieldsetCloner = getTemplateCloner("#faq-card");
    /** @param {Card} */ function setQuestionBoxes({id, question, answer, tags}) {
        const CLONE = _fieldsetCloner();

        // might add button for getting card id
        CLONE.querySelector("h3").appendChild(stringToHTML(question));
        CLONE.querySelector("#answer").replaceWith(stringToHTML(answer));
        CLONE.querySelector("#tags").replaceWith(...tags.map(({name}) => setattr(document.createElement("a"), {classList: {add: ["tags"]}, textContent: name, href: HREF+"?tags="+name})));

        return CLONE;
    }
    //#endregion

    const SEARCH_PARAMS = new URLSearchParams(location.search);
    const CARDFIELD = document.querySelector("#cards-field");
    CARDFIELD.append(
        (() => {
            const FRAGMENT = new DocumentFragment();
            var run = false;
            var key;

            if (key = SEARCH_PARAMS.get("search")) {
                const KEYWORDS = key.replace(/\s+/, " ").toLowerCase().split(" ");
                for (const cards of cards_list.filter(({question, answer}) => KEYWORDS.every(str => [question, answer].some(x => removeHTMLTag(x).toLowerCase().includes(str))))) {
                    FRAGMENT.appendChild(setQuestionBoxes(cards));
                    run = true;
                }
                return run ? FRAGMENT : "No matches found.";
            } else if (key = SEARCH_PARAMS.get("tags")) {
                const TAGS = key.split(" ");
                for (const cards of cards_list.filter(({tags}) => TAGS.subsetof(tags.map(x => x.name)))) {
                    FRAGMENT.appendChild(setQuestionBoxes(cards));
                    run = true;
                }
                return run ? FRAGMENT : "No matches found.";
            } else if (key = SEARCH_PARAMS.get("page")) {
                const PAGE = Number(key);
                document.querySelector('#Browse input[type="number"]').value = PAGE;
                const LIMIT = Math.min(PAGE * 5, cards_list.length);
                for (let INDEX = (PAGE * 5) - 5; INDEX < LIMIT; INDEX++)
                    FRAGMENT.appendChild(setQuestionBoxes(cards_list[INDEX]));
                return FRAGMENT;
            } else if (key = SEARCH_PARAMS.get("id")) {
                const IDS = key.split(" ").map(Number);
                for (const cards of cards_list.filter(({id}) => IDS.includes(id))) {
                    FRAGMENT.appendChild(setQuestionBoxes(cards));
                    run = true;
                }
                return run ? FRAGMENT : "No matches found.";
            } else if (key === "") {
                return "Empty field."
            } else {
                const LENGTH = cards_list.length;
                const INDICES = new Set();
                do INDICES.add(randInt(0, LENGTH));
                while (INDICES.size < 3)
                for (const index of INDICES) FRAGMENT.appendChild(setQuestionBoxes(cards_list[index]));
                return FRAGMENT;
            }
        })()
    );
}

document.querySelector("include").setAttribute("maxpage", Math.ceil((window.cards.length) / 5));
