import {removeHTMLTag, getTemplateCloner} from "../externaljavascript.js";
import {Random, cmp, range, setattr} from "../basefunctions/index.js";

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

window.queryFunc = function() {
    //#region Tags Field
    /** @type {Tag} */ const TAG_DICT = window.tags;
    const TAGS_FIELD = document.querySelector("#Tags div");
    const _tagsearchCloner = getTemplateCloner("#query-tag");
    /** @type {HTMLInputElement[]} */ const TAG_CHECKBOXES = [];
    /** @type {HTMLInputElement} */ const TAGS_TEXT = document.querySelector('#Tags input[type="text"]');
    for (const {name, description} of Object.values(TAG_DICT).sort(cmp({key: x => x.name}))) {
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
        if (event.isTrusted) {
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
        CLONE.querySelector("fieldset").id = id;
        CLONE.querySelector("h3").appendChild(stringToHTML(question));
        CLONE.querySelector("#answer").replaceWith(stringToHTML(answer));
        CLONE.querySelector("#tags").replaceWith(...tags.map(({name}) => setattr(document.createElement("a"), {classList: {add: ["tags"]}, textContent: name, href: HREF+"?tags="+name})));

        return CLONE;
    }

    /** @param {Card[]} card_array */
    function boxFrag(card_array) {
        if (!card_array.length) return "No matches found.";
        const FRAGMENT = new DocumentFragment();
        for (const CARD of card_array) FRAGMENT.appendChild(setQuestionBoxes(CARD))
        return FRAGMENT;
    }
    //#endregion

    document.querySelector("#cards-field").append(
        (() => {
            /** @type {Card[]} */ const CARD_ARRAY = window.cards;

            for (const [KEY, VALUE] of new URLSearchParams(location.search)) {
                if (!VALUE) return "Empty field.";

                switch (KEY) {
                    case "search":
                        const KEYWORDS = VALUE.replace(/\s+/, " ").toLowerCase().split(" ");
                        return boxFrag(CARD_ARRAY.filter(x => KEYWORDS.every(str => [x.question, x.answer].some(y => removeHTMLTag(y).toLowerCase().includes(str)))));
                    case "tags":
                        const TAGS = VALUE.split(" ");
                        return boxFrag(CARD_ARRAY.filter(x => TAGS.subsetof(x.tags.map(y => y.name))));
                    case "page":
                        const PAGE = Number(VALUE), COUNT = PAGE * 5;
                        document.querySelector('#Browse input[type="number"]').value = PAGE;
                        return boxFrag(Array.from(range({start: COUNT - 5, stop: Math.min(COUNT, CARD_ARRAY.length)})).map(x => CARD_ARRAY[x]));
                    case "id":
                        const IDS = VALUE.split(" ").map(Number);
                        return boxFrag(CARD_ARRAY.filter(x => IDS.includes(x.id)));
                }
            }

            {
                const LENGTH = CARD_ARRAY.length, /** @type {Set<number>} */ INDICES = new Set();
                do INDICES.add(Random.integer(0, LENGTH));
                while (INDICES.size < 5);
                return boxFrag(Array.from(INDICES).map(x => CARD_ARRAY[x]));
            }
        })()
    );
}

document.querySelector("include").setAttribute("maxpage", Math.ceil((window.cards.length) / 5));
