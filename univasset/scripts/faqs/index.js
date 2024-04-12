import {removeHTMLTag, getTemplateCloner} from "../externaljavascript.js";
import {Random, cmp, range, setattr} from "../basefunctions/index.js";

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

    /** Uses "change" event. */
    class RadioSwitch {
        static #EVENT = new Event("change");
        #CURRENT;

        /** @param {HTMLInputElement} current_checked */
        constructor(current_checked) {
            this.#CURRENT = current_checked;
        }

        /**
         * @param {HTMLInputElement} input
         * @param {function(this: HTMLInputElement, Event): void} func */
        apply(input, func = () => {}) {
            input.addEventListener("change", event => {
                if (event.isTrusted) {  // To check if user input or programmatic
                    if (this.#CURRENT === input) return;
                    this.#CURRENT.dispatchEvent(RadioSwitch.#EVENT);
                    this.#CURRENT = input;
                }
        
                func.call(input, event);
            })
        }
    }

    const CHANGE = new RadioSwitch(BUTTON.KEY);

    /** @type {HTMLInputElement} */ const TEXT_FIELD = document.querySelector(`#Keywords [type="text"]`);
    CHANGE.apply(BUTTON.KEY, function(event) {
        if (!this.checked) TEXT_FIELD.value = "";
    });

    CHANGE.apply(BUTTON.TAG, function(event) {
        if (!this.checked) {
            TAGS_TEXT.value = "";
            for (const INPUT_TRUE of TAG_CHECKBOXES.filter(x => x.checked))
                INPUT_TRUE.checked = false;
        }
    });

    CHANGE.apply(BUTTON.BWS);
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

    /** @type {HTMLInputElement} */ const RANGE = document.querySelector('#Browse input[type="range"]');
    RANGE.setAttribute("max", Math.ceil((window.cards.length) / 5));
    document.querySelector("#cards-field").append(
        (() => {
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
                        setattr(RANGE, {value: PAGE, onchange: []});
                        return boxFrag(CARDS.slice(COUNT - 5, Math.min(COUNT, CARDS.length)));
                    case "id":
                        const IDS = VALUE.split(" ").map(Number);
                        return boxFrag(CARDS.filter(x => IDS.includes(x.id)));
                }
            }

            return boxFrag(Array.from(Random.iterpop(CARDS, 5)));            
        })()
    );
}