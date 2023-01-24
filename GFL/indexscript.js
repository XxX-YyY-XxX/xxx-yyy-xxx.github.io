import {Compare, RadioButton, removeHTMLTag, randInt, checkedLabel} from '/univasset/scripts/externaljavascript.js';
import {initializeHTML} from '/univasset/scripts/htmlgenerator/htmlgenerator.js';
import {cardData, dTag, newCards} from "./tempcard.js";
import '/univasset/scripts/prototype.js';

//#region Constants
const toggleableTagsField = document.getElementById('tags-list');
const searchTextField = document.getElementById('search-text');
const cardsForm = document.getElementById('submission-form');
const browseField = document.getElementById('browse-page');
const searchParams = new URLSearchParams(location.search);
const maxPage = Math.ceil((cardData.length - 1) / 5)
const pageNo = document.getElementById('page-no');
const inputButtons = new RadioButton('input-type',
    {
        search(button) {
            if (button.checked) {
                searchTextField.style.display = 'inline';
                searchTextField.name = button.value;
                searchTextField.value = '';
            } else {
                searchTextField.style.display = 'none'
            }
        },
        tags(button) {
            if (button.checked) {
                toggleableTagsField.style.display = 'block';
                searchTextField.name = button.value;
                searchTextField.value = '';
            } else {
                toggleableTagsField.style.display = 'none';
                for (const labeltrue of Array.from(toggleableTagsField.children).filter(label => label.firstElementChild.checked)) {
                    labeltrue.firstElementChild.checked = false
                    labeltrue.classList.remove('checked');
                }
            }
        },
        browse(button) {
            browseField.style.display = button.checked ? 'block' : 'none';
            cardsForm.style.display = button.checked ? 'none' : 'block';
        }
    }
);
//#endregion

//#region Initialize
//tooltip is only visible when tag is hovered over.
const fragment = new DocumentFragment();
for (const {val, desc} of Object.values(dTag).sort((a, b) => Compare.string(a.val, b.val))) {
    const labelElem = document.createElement('label');
    labelElem.classList.add('tags', 'tooltip');
    
    /** @type {HTMLInputElement} */
    const inputElem = initializeHTML('input', {type: 'checkbox', value: val});
    inputElem.addEventListener('click', function() {
        checkedLabel(this);             //Will delete if CSS :has is ok
        searchTextField.value = this.checked ? searchTextField.value + ' ' + this.value : searchTextField.value.replace(this.value, '');
        searchTextField.value = searchTextField.value.replace('  ', ' ').slice(Number(searchTextField.value[0] === ' '));
        if (searchTextField.value.slice(-1) === ' ')
            searchTextField.value = searchTextField.value.slice(0, -1);
    });
    
    /** @type {HTMLSpanElement} */
    const spanElem = initializeHTML('span', {textContent: desc});
    spanElem.classList.add('tooltiptext');
    
    labelElem.append(inputElem, val, spanElem);
    fragment.appendChild(labelElem);
}
toggleableTagsField.appendChild(fragment);

document.getElementById('cards-field').innerHTML =
    (searchParams.has('search') || searchParams.has('tags') || searchParams.has('id')) ? searchCards() :
    (newCards.length >= 3) ? addedCards() : randomCards();

document.getElementById('maxpage').textContent = maxPage;
//#endregion

//#region Private Functions
function searchCards() {
    var output = '', matchCheck;

    if (searchParams.has('tags')) {
        const cardTags = searchParams.get('tags').split(' ').filter(Boolean);
        if (cardTags.length > 0) {
            /** @returns {boolean} */
            matchCheck = ({tags}) => cardTags.subsetOf(tags.map(tag => tag.val));
        } else {
            return 'Empty search.';
        }
    } else if (searchParams.has('search')) {
        const searchText = searchParams.get('search');
        if (searchText) {
            const phrase = new RegExp(searchText, 'i');
            matchCheck = ({questions, answers}) => phrase.test(removeHTMLTag(questions)) || phrase.test(removeHTMLTag(answers));
        } else {
            return 'Empty search.';
        }
    } else if (searchParams.has('id')) {
        const cardTags = searchParams.get('id').split(' ');
        matchCheck = ({id}) => cardTags.includes(id);
    } //else none

    for (const cards of cardData) {
        if (matchCheck(cards))
            output += setQuestionBoxes(cards);
    }

    return output || 'No matches found.';
}

function addedCards() {
    var output = '';

    for (const cards of cardData)
        if (newCards.includes(cards.id))
            output += setQuestionBoxes(cards);

    return output;
}

function randomCards() {
    const maxValue = cardData.length - 1;
    const indices = new Set();
    var output = '';

    do {
        indices.add(randInt(0, maxValue));
    } while (indices.size < 3)

    for (const index of indices)
        output += setQuestionBoxes(cardData[index]);

    return output;
}

function setQuestionBoxes({questions, answers, tags}) {
    return `<fieldset>
        <legend><h3>${questions}</h3></legend>
        ${answers}
        <hr>
        Tags: ${tags.map(tag => `<span class="tags card-tags">${tag.val}</span>` ).join(' ')}
        </fieldset>`;
}
//#endregion

//#region Public Functions
/** @param {HTMLInputElement} radioButton */
window.toggleInput = function(radioButton) {
    inputButtons.run(radioButton);
}

/** @param {HTMLButtonElement} pageButton*/
window.changePage = function(pageButton) {
    const page = {
        'first'     : 1,
        'previous'  : Math.max(1, Number(pageNo.innerText) - 1),
        'next'      : Math.min(maxPage, Number(pageNo.innerText) + 1),
        'last'      : maxPage
    }[pageButton.value];
    var output = '';

    pageNo.innerText = String(page);

    for (var i = (page * 5) - 5; i < Math.min(page * 5, cardData.length - 1); i++)
        output += setQuestionBoxes(cardData[i]);
    document.getElementById('cards-field').innerHTML = output;
}
//#endregion