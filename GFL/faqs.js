import '../univasset/scripts/basefunctions/basefunctions.js';
import {removeHTMLTag, randInt, checkedLabel, compare} from '../univasset/scripts/externaljavascript.js';
import {initializeHTML, radioGroup} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {dTag, cardData, newCards} from "./querycards.js";

//#region Constants
const searchTextField = document.getElementById('search-text');
const searchParams = new URLSearchParams(location.search);
//#endregion

//#region Tags Field
const toggleableTagsField = document.getElementById('tags-list');
for (const {name, description} of Object.values(dTag).sort(compare({key: x => x.name}))) {    
    const inputElem = initializeHTML('input', {type: 'checkbox', value: name});
    inputElem.addEventListener('click', function() {
        checkedLabel(this);             //Will delete if CSS :has is ok
        searchTextField.value = this.checked ?
            (searchTextField.value + ' ' + this.value).trim() :
            searchTextField.value.replace(this.value, '').replace('  ', ' ').trim();
    });
    
    const spanElem = initializeHTML('span', {textContent: description, classList: {add: ['tooltiptext']}});
    toggleableTagsField.appendChild(initializeHTML('label', {classList: {add: ['tags', 'tooltip']}, append: [inputElem, name, spanElem]}));
}
//#endregion

//#region Initialize
/** @type {HTMLInputElement[]} */ const tag_label_inputs = Array.from(toggleableTagsField.children).map(label => label.firstElementChild);
const cardsForm = document.getElementById('submission-form'), browseField = document.getElementById('browse-page');
radioGroup(document.querySelector('#input-type-container'), 'input-type',
    [initializeHTML('h2', {textContent: 'Keyword'}), 'search', function(button) {
        if (button.checked) {
            searchTextField.style.display = 'inline';
            searchTextField.name = button.value;
        } else {
            searchTextField.style.display = 'none';
            searchTextField.value = '';
        }
    }],
    [initializeHTML('h2', {textContent: 'Tags'}), 'tags', function(button) {
        if (button.checked) {
            toggleableTagsField.style.display = 'block';
            searchTextField.name = button.value;
        } else {
            toggleableTagsField.style.display = 'none';
            searchTextField.value = '';
            for (const input_true of tag_label_inputs.filter(input => input.checked)) {
                input_true.checked = false;
                checkedLabel(input_true);   //remove if :has is supported
            }
        }
    }],
    [initializeHTML('h2', {textContent: 'Browse'}), 'browse', function(button) {
        browseField.style.display = button.checked ? 'block' : 'none';
        cardsForm.style.display = button.checked ? 'none' : 'block';
    }]
)

document.getElementById('cards-field').innerHTML =
    searchParams.has('search') ? searchCards() :
    searchParams.has('tags') ? tagsCards() :
    searchParams.has('id') ? idCards() :
    (newCards.length >= 3) ? addedCards() : randomCards();
//#endregion

//#region Private Functions
function searchCards() {
    const searchText = searchParams.get('search');
    var output = '';

    if (searchText) {
        const phrase = new RegExp(searchText, 'i');

        for (const cards of cardData.filter(({questions, answers}) => phrase.test(removeHTMLTag(questions)) || phrase.test(removeHTMLTag(answers))))
            output += setQuestionBoxes(cards);

        return output || 'No matches found.';
    } else
        return 'Empty search.';
}

function tagsCards() {
    const cardTags = searchParams.get('tags').split(' ');
    var output = '';

    if (cardTags.length) {
        for (const cards of cardData.filter(({tags}) => cardTags.subsetOf(tags.map(x => x.name))))
            output += setQuestionBoxes(cards);

        return output || 'No matches found.';
    } else {
        return 'Empty search.';
    }
}

function idCards() {
    const id_list = searchParams.get('id').split(' ');
    var output = '';

    for (const cards of cardData.filter(({id}) => id_list.includes(id)))
        output += setQuestionBoxes(cards);

    return output || 'No matches found.';
}

function addedCards() {
    var output = '';

    for (const cards of cardData.filter(({id}) => newCards.includes(id)))
        output += setQuestionBoxes(cards);

    return output;
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
const maxPage = Math.ceil((cardData.length - 1) / 5)
document.getElementById('maxpage').textContent = maxPage;
const pageNo = document.getElementById('page-no');

/** @param {HTMLButtonElement} pageButton*/
window.changePage = function(pageButton) {
    const page = {
        'first'     : 1,
        'previous'  : Math.max(1, Number(pageNo.textContent) - 1),
        'next'      : Math.min(maxPage, Number(pageNo.textContent) + 1),
        'last'      : maxPage
    }[pageButton.value];
    var output = '';

    pageNo.textContent = page;

    for (var i = (page * 5) - 5; i < Math.min(page * 5, cardData.length - 1); i++)
        output += setQuestionBoxes(cardData[i]);
    document.getElementById('cards-field').innerHTML = output;
}
//#endregion