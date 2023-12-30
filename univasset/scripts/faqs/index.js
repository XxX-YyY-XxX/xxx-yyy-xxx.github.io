import {removeHTMLTag, randInt} from '../externaljavascript.js';
import {cmp, setattr} from '../basefunctions/index.js';
import {nestElements} from "../htmlgenerator/htmlgenerator.js";

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
    const SEARCH_PARAMS = new URLSearchParams(location.search);
    const CARDFIELD = document.querySelector("#cards-field");

    //#region Tags Field
    const TAGS_FIELD = document.querySelector("#Tags div");
    /** @type {HTMLInputElement[]} */ const TAG_CHECKBOXES = [];
    /** @type {HTMLInputElement} */ const TAGS_TEXT = document.querySelector('#Tags input[type="text"]');
    for (const {name, description} of Object.values(tags_dict).sort(cmp({key: x => x.name}))) {
        const INPUT = setattr(document.createElement("input"), {value: name, type: "checkbox"});
        INPUT.addEventListener("change", function(event) {
            TAGS_TEXT.value = (this.checked ? TAGS_TEXT.value + " " + this.value : TAGS_TEXT.value.replace(this.value, "")).replace("  ", " ").trim();
        });
        const LABEL = setattr(document.createElement("label"), {classList: {add: ["tags", "tooltip"]}, append: [INPUT, name]});
        const SPAN = setattr(document.createElement("span"), {textContent: description, classList: {add: ["tooltiptext"]}});
        TAGS_FIELD.appendChild(setattr(document.createElement("span"), {append: [LABEL, SPAN]}));
        TAG_CHECKBOXES.push(INPUT);
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

    CARDFIELD.appendChild(
        (() => {
            switch (true) {
                case SEARCH_PARAMS.has('search'):   return searchCards();
                case SEARCH_PARAMS.has('tags'):     return tagsCards();
                case SEARCH_PARAMS.has('id'):       return idCards();
                default:                            return randomCards();
            }
        })()
    );

    //#region Private Functions
    function searchCards() {
        const FRAGMENT = new DocumentFragment();

        const searchText = SEARCH_PARAMS.get("search");
        if (!searchText) return FRAGMENT;//'Empty search.';

        const KEYWORDS = searchText.replace(/\s+/, " ").toLowerCase().split(" ");

        for (const cards of cards_list.filter(({question, answer}) => KEYWORDS.every(str => [question, answer].some(x => removeHTMLTag(x).toLowerCase().includes(str)))))
            FRAGMENT.appendChild(setQuestionBoxes(cards));

        return FRAGMENT;// || 'No matches found.';        
    }

    function tagsCards() {
        const FRAGMENT = new DocumentFragment();

        const cardTags = SEARCH_PARAMS.get("tags").split(" ");
        if (!cardTags.length) return FRAGMENT;//'Empty search.';


        for (const cards of cards_list.filter(({tags}) => cardTags.subsetof(tags.map(x => x.name))))
            FRAGMENT.appendChild(setQuestionBoxes(cards))

        return FRAGMENT;// || 'No matches found.';
    }

    function idCards() {
        const FRAGMENT = new DocumentFragment();
        const IDS = SEARCH_PARAMS.get("id").split(" ").map(Number);

        for (const cards of cards_list.filter(({id}) => IDS.includes(id)))
            FRAGMENT.appendChild(setQuestionBoxes(cards))

        return FRAGMENT;// || 'No matches found.';
    }

    function randomCards() {
        const FRAGMENT = new DocumentFragment();

        const LENGTH = cards_list.length;
        const indices = new Set();

        do indices.add(randInt(0, LENGTH));
        while (indices.size < 3)

        for (const index of indices) FRAGMENT.appendChild(setQuestionBoxes(cards_list[index]));

        return FRAGMENT;
    }

    /** @param {string} text @returns {DocumentFragment} */
    function stringToHTML(text) {
        return setattr(new DocumentFragment(), {append: [...(new DOMParser()).parseFromString(text, "text/html").body.childNodes]});
    }

    const HREF = location.href;
    /** @param {Card} */ function setQuestionBoxes({question, answer, tags}) {
        const FIELDSET = document.createElement("fieldset");

        const [LEGEND, H3] = nestElements("legend", "h3");
        H3.appendChild(stringToHTML(question));
        
        FIELDSET.append(
            LEGEND,
            stringToHTML(answer),
            document.createElement("hr"),
            "Tags: ",
            ...tags.map(({name}) => setattr(document.createElement("a"), {classList: {add: ["tags"]}, textContent: name, href: HREF+"?tags="+name}))
        );
        return FIELDSET;
    }
    //#endregion

    //#region Browse Field
    const MAXPAGE = Math.ceil((cards_list.length) / 5)
    document.getElementById('maxpage').textContent = MAXPAGE;

    const PAGENO = document.getElementById('page-no');
    for (const BUTT of Array.from(document.querySelectorAll("#Browse button"))) {
        /** @type {function(): number} */ const getPage = {
            first: () => 1,
            previous: () => Math.max(1, Number(PAGENO.textContent) - 1),
            next: () => Math.min(MAXPAGE, Number(PAGENO.textContent) + 1),
            last: () => MAXPAGE
        }[BUTT.value];

        BUTT.addEventListener("click", function(event) {
            const FRAGMENT = new DocumentFragment();
            const PAGE = getPage();
            PAGENO.textContent = PAGE;
            for (var i = (PAGE * 5) - 5; i < Math.min(PAGE * 5, cards_list.length); i++)
                FRAGMENT.appendChild(setQuestionBoxes(cards_list[i]));
            CARDFIELD.replaceChildren(FRAGMENT);
        })
    }
    //#endregion
}