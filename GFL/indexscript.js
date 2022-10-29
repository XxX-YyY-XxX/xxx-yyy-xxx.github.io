import {Compare, RadioButton, removeHTMLTag, randInt, checkedLabel} from '/univasset/scripts/externaljavascript.js';
import {cardData, dTag, newCards} from "./tempcard.js";

//#region Constants
const toggleableTagsField = document.getElementById('tags-list');
const searchTextField = document.getElementById('search-text');
const browseField = document.getElementById('browse-page');
const cardsForm = document.getElementById('submission-form');
const searchParams = new URLSearchParams(location.search);
const inputButtons = new RadioButton('input-type',
    {
        search(button) {
            checkedLabel(button);
            searchTextField.style.display = button.checked ? 'inline' : 'none';
        },
        tags(button) {
            checkedLabel(button);
            toggleableTagsField.style.display = button.checked ? 'block' : 'none';
            if (!button.checked) {
                for (const labeltrue of Array.from(toggleableTagsField.children).filter(label => label.firstElementChild.checked)) {
                    labeltrue.firstElementChild.checked = false
                    labeltrue.classList.remove('checked');
                }
            }
        },
        browse(button) {
            checkedLabel(button);
            browseField.style.display = button.checked ? 'block' : 'none';
            cardsForm.style.display = button.checked ? 'none' : 'block';
        }
    }, function(button) {
        searchTextField.value = '';
        searchTextField.name = button.value;
    }
);
//#endregion

//#region Initialize
//tooltip is only visible when tag is hovered over. 
toggleableTagsField.innerHTML = Object.values(dTag).sort((a, b) => Compare.string(a.val, b.val)).map(tag => 
    `<label class="tags tooltip">
        <input type="checkbox" onclick="toggleTag(this)" value="${tag.val}">${tag.val}
        <span class="tooltiptext">${tag.desc}</span>
    </label>`
).join(' ');

document.getElementById('cards-field').innerHTML = (searchParams.has('search') || searchParams.has('tags')) ? searchCards() :
                                                   (newCards.length >= 3) ? addedCards() : randomCards();
//#endregion

//#region Private Functions
function searchCards() {
    var output = '', matchCheck;

    if (searchParams.has('tags')) {
        const cardTags = searchParams.get('tags').split(' ').filter(Boolean);
        if (cardTags.length > 0) {
            /** @returns {boolean} */
            matchCheck = (card) => cardTags.subsetOf(card.tags.map(tag => tag.val));
        } else {
            return 'Empty search.';
        }
    } else {
        const searchText = searchParams.get('search');
        if (searchText) {
            const phrase = new RegExp(searchText, 'i');
            matchCheck = (card) => phrase.test(removeHTMLTag(card.questions)) || phrase.test(removeHTMLTag(card.answers));
        } else {
            return 'Empty search.';
        }
    }

    for (const cards of cardData) {
        if (matchCheck(cards))
            output += setQuestionBoxes(cards);
    }

    return output || 'No matches found.';
}

function addedCards() {
    var output = '';

    for (const cards of cardData) {
        if (newCards.includes(cards.id))
            output += setQuestionBoxes(cards);
    }

    return output;
}

function randomCards() {
    const maxValue = cardData.length - 1;
    const indices = new Set();
    var output = '';

    do {
        indices.add(randInt(0, maxValue));
    } while (indices.size < 3)

    for (const index of indices) {
        output += setQuestionBoxes(cardData[index]);
    }

    return output;
}

function setQuestionBoxes(cards) {
    return `<fieldset>
        <legend><h3>${cards.questions}</h3></legend>
        ${cards.answers}
        <hr>
        Tags: ${cards.tags.map(tag => `<span class="tags card-tags">${tag.val}</span>` ).join(' ')}
        </fieldset>`;
}
//#endregion

//#region Public Functions
/** @param {HTMLInputElement} radioButton */
window.toggleInput = function(radioButton) {
    inputButtons.run(radioButton);
}

/** @param {HTMLInputElement} tagCheckbox */
window.toggleTag = function(tagCheckbox) {
    checkedLabel(tagCheckbox);
    const tagName = tagCheckbox.value + ' ';
    searchTextField.value = tagCheckbox.checked ? searchTextField.value + tagName : searchTextField.value.replace(tagName, '');
}
//#endregion