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

            switch (true) {
                case SEARCH_PARAMS.has("search"):
                    const SEARCH = SEARCH_PARAMS.get("search");
                    if (!SEARCH) return "Empty field.";
            
                    const KEYWORDS = SEARCH.replace(/\s+/, " ").toLowerCase().split(" ");
            
                    for (const cards of cards_list.filter(({question, answer}) => KEYWORDS.every(str => [question, answer].some(x => removeHTMLTag(x).toLowerCase().includes(str))))) {
                        FRAGMENT.appendChild(setQuestionBoxes(cards));
                        run = true;
                    }
            
                    return run ? FRAGMENT : "No matches found.";
                case SEARCH_PARAMS.has("tags"):
                    const TAGS = SEARCH_PARAMS.get("tags").split(" ");
                    if (!TAGS.length) return "Empty field.";
            
                    for (const cards of cards_list.filter(({tags}) => TAGS.subsetof(tags.map(x => x.name)))) {
                        FRAGMENT.appendChild(setQuestionBoxes(cards));
                        run = true;
                    }
                        
                    return run ? FRAGMENT : "No matches found.";
                case SEARCH_PARAMS.has("page"):
                    const PAGE = Number(SEARCH_PARAMS.get("page"));
                    const LIMIT = Math.min(PAGE * 5, cards_list.length);

                    for (let INDEX = (PAGE * 5) - 5; INDEX < LIMIT; INDEX++)
                        FRAGMENT.appendChild(setQuestionBoxes(cards_list[INDEX]));
                    
                    return FRAGMENT;

                    // const MAXPAGE = Math.ceil((cards_list.length) / 5);
                    // document.getElementById('maxpage').textContent = MAXPAGE;
                
                    // const PAGENO = document.getElementById('page-no');
                    // for (const BUTTON of document.querySelectorAll("#Browse button")) {
                    //     /** @type {function(): number} */ const getPage = {
                    //         first: () => 1,
                    //         previous: () => Math.max(1, Number(PAGENO.textContent) - 1),
                    //         next: () => Math.min(MAXPAGE, Number(PAGENO.textContent) + 1),
                    //         last: () => MAXPAGE
                    //     }[BUTTON.value];
                
                    //     BUTTON.addEventListener("click", function(event) {
                    //         const FRAGMENT = new DocumentFragment();
                    //         const PAGE = getPage();
                    //         PAGENO.textContent = PAGE;
                    //         for (var i = (PAGE * 5) - 5; i < Math.min(PAGE * 5, cards_list.length); i++)
                    //             FRAGMENT.appendChild(setQuestionBoxes(cards_list[i]));
                    //         CARDFIELD.replaceChildren(FRAGMENT);
                    //     })
                    // }
                
                    // return "None";
                case SEARCH_PARAMS.has("id"):
                    const IDS = SEARCH_PARAMS.get("id").split(" ").map(Number);
            
                    for (const cards of cards_list.filter(({id}) => IDS.includes(id))) {
                        FRAGMENT.appendChild(setQuestionBoxes(cards));
                        run = true;
                    }
                    
                    return run ? FRAGMENT : "No matches found.";
                default:
                    const LENGTH = cards_list.length;
                    const INDICES = new Set();
            
                    do INDICES.add(randInt(0, LENGTH));
                    while (INDICES.size < 3)
            
                    for (const index of INDICES) FRAGMENT.appendChild(setQuestionBoxes(cards_list[index]));
            
                    return FRAGMENT;
            }
        })()
    );

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

try {
    document.querySelector("include").setAttribute("maxpage", Math.ceil((window.cards.length) / 5));
    console.log("Setup OK.")
} catch (e) {
    console.warn(e)
}
