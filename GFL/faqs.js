import {cmp, setattr} from '../univasset/scripts/basefunctions/index.js';
import {removeHTMLTag, randInt} from '../univasset/scripts/externaljavascript.js';
import {radioGroup} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {dTag, cardData} from "./querycards.js";

//#region Constants
const TEXT_FIELD = document.querySelector("#search-text");
const SEARCH_PARAMS = new URLSearchParams(location.search);
const CARDFIELD = document.querySelector("#cards-field");
//#endregion

//#region Tags Field
const toggleableTagsField = document.getElementById('tags-list');
for (const {name, description} of Object.values(dTag).sort(cmp({key: x => x.name}))) {
    const INPUT = setattr(document.createElement("input"), {value: name, type: "checkbox"});
    INPUT.addEventListener("change", function() {
        TEXT_FIELD.value = this.checked ?
            (TEXT_FIELD.value + " " + this.value).trim() :
            TEXT_FIELD.value.replace(this.value, "").replace("  ", " ").trim();
    });
    const LABEL = setattr(document.createElement("label"), {classList: {add: ["tags", "tooltip"]}, append: [INPUT, name]});
    const SPAN = setattr(document.createElement("span"), {textContent: description, classList: {add: ["tooltiptext"]}});
    toggleableTagsField.appendChild(setattr(document.createElement("span"), {append: [LABEL, SPAN]}));
}
//#endregion

//#region Initialize
/** @type {HTMLInputElement[]} */ const tag_label_inputs = Array.from(toggleableTagsField.children).map(label => label.firstElementChild);
const cardsForm = document.getElementById('submission-form'), browseField = document.getElementById('browse-page');
radioGroup(document.querySelector('#input-type-container'), 'input-type',
    [setattr(document.createElement("h2"), {textContent: 'Keyword'}), 'search', function(button) {
        if (button.checked) {
            TEXT_FIELD.style.display = 'inline';
            TEXT_FIELD.name = button.value;
        } else {
            TEXT_FIELD.style.display = 'none';
            TEXT_FIELD.value = '';
        }
    }],
    [setattr(document.createElement("h2"), {textContent: 'Tags'}), 'tags', function(button) {
        if (button.checked) {
            toggleableTagsField.style.display = 'block';
            TEXT_FIELD.name = button.value;
        } else {
            toggleableTagsField.style.display = 'none';
            TEXT_FIELD.value = '';
            for (const input_true of tag_label_inputs.filter(input => input.checked))
                input_true.checked = false;
        }
    }],
    [setattr(document.createElement("h2"), {textContent: 'Browse'}), 'browse', function(button) {
        browseField.style.display = button.checked ? 'block' : 'none';
        cardsForm.style.display = button.checked ? 'none' : 'block';
    }]
)

CARDFIELD.innerHTML =
    SEARCH_PARAMS.has('search') ? searchCards() :
    SEARCH_PARAMS.has('tags') ? tagsCards() :
    SEARCH_PARAMS.has('id') ? idCards() : randomCards();
//#endregion

//#region Private Functions
function searchCards() {
    const searchText = SEARCH_PARAMS.get('search');
    if (!searchText) return 'Empty search.';

    var output = '';
    const KEYWORDS = searchText.toLowerCase().split(" ");

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
    const id_list = SEARCH_PARAMS.get('id').split(' ');
    var output = '';

    for (const cards of cardData.filter(({id}) => id_list.includes(id)))
        output += setQuestionBoxes(cards);

    return output || 'No matches found.';
}

function randomCards() {
    const indices = new Set();
    var output = '';

    do indices.add(randInt(0, cardData.length));
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
const maxPage = Math.ceil((cardData.length) / 5)
document.getElementById('maxpage').textContent = maxPage;
const pageNo = document.getElementById('page-no');
for (const BUTT of Array.from(document.querySelectorAll("button"))) {
    /** @type {function(): number} */
    const getPage = {
        first: () => 1,
        previous: () => Math.max(1, Number(pageNo.textContent) - 1),
        next: () => Math.min(maxPage, Number(pageNo.textContent) + 1),
        last: () => maxPage
    }[BUTT.value];
    BUTT.addEventListener("click", function(event) {
        var output = "";
        const PAGE = getPage();
        pageNo.textContent = PAGE;
        for (var i = (PAGE * 5) - 5; i < Math.min(PAGE * 5, cardData.length); i++)
            output += setQuestionBoxes(cardData[i]);
        CARDFIELD.innerHTML = output;    
    })
}
//#endregion