import {cmp, setattr} from '../../univasset/scripts/basefunctions/index.js';
import {removeHTMLTag, randInt} from '../../univasset/scripts/externaljavascript.js';
import {dTag, cardData} from "./query.js";

const SEARCH_PARAMS = new URLSearchParams(location.search);
const CARDFIELD = document.querySelector("#cards-field");

//#region Tags Field
const TAGS_FIELD = document.querySelector("#Tags div");
/** @type {HTMLInputElement} */ const TAGS_TEXT = document.querySelector('#Tags [input="text"]');
for (const {name, description} of Object.values(dTag).sort(cmp({key: x => x.name}))) {
    const INPUT = setattr(document.createElement("input"), {value: name, type: "checkbox"});
    INPUT.addEventListener("change", function(event) {
        console.log(this.value, this.checked)
        TAGS_TEXT.value = (this.checked ? TAGS_TEXT.value + " " + this.value : TAGS_TEXT.value.replace(this.value, "")).replace("  ", " ").trim();
    });
    const LABEL = setattr(document.createElement("label"), {classList: {add: ["tags", "tooltip"]}, append: [INPUT, name]});
    const SPAN = setattr(document.createElement("span"), {textContent: description, classList: {add: ["tooltiptext"]}});
    TAGS_FIELD.appendChild(setattr(document.createElement("span"), {append: [LABEL, SPAN]}));
}
//#endregion

//#region Tag Buttons
/** @type {HTMLInputElement} */ const KEY_BUTTON = document.querySelector('.tab-button [value="Keywords"]');
/** @type {HTMLInputElement} */ const TAG_BUTTON = document.querySelector('.tab-button [value="Tags"]');
/** @type {HTMLInputElement} */ const BWS_BUTTON = document.querySelector('.tab-button [value="Browse"]');
/** @type {HTMLInputElement} */ var current_checked;

/** @type {HTMLInputElement} */ const TEXT_FIELD = document.querySelector(`#Keywords [type="text"]`);
KEY_BUTTON.addEventListener("change", function(event) {
    current_checked.dispatchEvent(new Event("change"))
    // current_checked.onchange();
    current_checked = this;

    if (!this.checked) TEXT_FIELD.value = "";
});

/** @type {HTMLInputElement[]} */ const TAG_CHECKBOXES = Array.from(document.querySelectorAll("#Tags div input"));
TAG_BUTTON.addEventListener("change", function(event) {
    current_checked.dispatchEvent(new Event("change"))
    // current_checked.onchange();
    current_checked = this;

    if (!this.checked) {
        // TAGS_TEXT.value = "";
        console.log("Clearing:", TAGS_TEXT.value)
        for (const INPUT_TRUE of TAG_CHECKBOXES.filter(input => input.checked))
            INPUT_TRUE.checked = false;
    }
    
});

BWS_BUTTON.addEventListener("change", function(event) {
    current_checked.dispatchEvent(new Event("change"))
    // current_checked.onchange();
    current_checked = this;
});
//#endregion

// CARDFIELD.appendChild(
//     SEARCH_PARAMS.has('search') ? searchCards() :
//     SEARCH_PARAMS.has('tags') ? tagsCards() :
//     SEARCH_PARAMS.has('id') ? idCards() : randomCards()
// )
CARDFIELD.innerHTML =
    SEARCH_PARAMS.has('search') ? searchCards() :
    SEARCH_PARAMS.has('tags') ? tagsCards() :
    SEARCH_PARAMS.has('id') ? idCards() : randomCards();

//#region Private Functions
function searchCards() {
    const searchText = SEARCH_PARAMS.get('search');
    if (!searchText) return 'Empty search.';

    var output = '';
    const KEYWORDS = searchText.replace(/\s+/, " ").toLowerCase().split(" ");

    for (const cards of cardData.filter(({questions, answers}) => KEYWORDS.every(str => removeHTMLTag(questions).toLowerCase().includes(str) || removeHTMLTag(answers).toLowerCase().includes(str))))
        output += setQuestionBoxes(cards);

    return output || 'No matches found.';        
}

function tagsCards() {
    const cardTags = SEARCH_PARAMS.get('tags').split(' ');
    if (!cardTags.length) return 'Empty search.';

    var output = '';

    for (const cards of cardData.filter(({tags}) => cardTags.subsetof(tags.map(x => x.name))))
        output += setQuestionBoxes(cards);

    return output || 'No matches found.';
}

function idCards() {
    const id_list = SEARCH_PARAMS.get('id').split(' ').map(Number);
    var output = '';

    for (const cards of cardData.filter(({id}) => id_list.includes(id)))
        output += setQuestionBoxes(cards);

    return output || 'No matches found.';
}

function randomCards() {
    const maxValue = cardData.length - 1;
    const indices = new Set();
    var output = '';

    do indices.add(randInt(0, maxValue));
    while (indices.size < 3)

    for (const index of indices)
        output += setQuestionBoxes(cardData[index]);

    return output;
}

/** @param {cardData} */
function setQuestionBoxes({questions, answers, tags}) {
    return `<fieldset>
        <legend><h3>${questions}</h3></legend>
        ${answers}
        <hr>
        Tags: ${tags.map(tag => `<span class="tags card-tags">${tag.name}</span>` ).join(' ')}
        </fieldset>`;
}
//#endregion

//#region Browse Field
const MAXPAGE = Math.ceil((cardData.length - 1) / 5)
document.getElementById('maxpage').textContent = MAXPAGE;

const PAGENO = document.getElementById('page-no');
for (const BUTT of Array.from(document.querySelectorAll("'#Button button"))) {
    /** @type {function(): number} */
    const getPage = {
        first: () => 1,
        previous: () => Math.max(1, Number(PAGENO.textContent) - 1),
        next: () => Math.min(MAXPAGE, Number(PAGENO.textContent) + 1),
        last: () => MAXPAGE
    }[BUTT.value];
    BUTT.addEventListener("click", function(event) {
        var output = "";
        const PAGE = getPage();
        PAGENO.textContent = PAGE;
        for (var i = (PAGE * 5) - 5; i < Math.min(PAGE * 5, cardData.length - 1); i++)
            output += setQuestionBoxes(cardData[i]);
        CARDFIELD.innerHTML = output;    
    })
}
//#endregion