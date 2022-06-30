import {Compare, removeHTMLTag, randInt, uniqueClassElement, reloadIFrame as reload} from '/univasset/scripts/externaljavascript.js';
import {cardData, dTag} from "./tempcard.js";

//#region Constants
const toggleableTagsField = document.getElementById('tags-list');
const searchTextField = document.getElementById('search-text');
const searchParams = new URLSearchParams(location.search);
//#endregion

//#region Initialize
document.getElementById('version-number').innerHTML = cardData.length;

toggleableTagsField.innerHTML = Object.values(dTag).sort((a, b) => Compare.string(a, b, 'val')).map(tag => 
    `<label class="tags tooltip unselectedTag">
        <input type="checkbox" onclick="toggleTag(this)" value="${tag.val}">${tag.val}
        <span class="tooltiptext">${tag.desc}</span>
    </label>`
).join(' ');

document.getElementById('cards-field').innerHTML = (searchParams.has('search') || searchParams.has('tags')) ? searchCards() : randomCards();
//#endregion

//#region Private Functions
function searchCards() {
    var output = '';
    var matchCheck;

    if (searchParams.has('tags')) {
        const cardTags = searchParams.get('tags').split(' ').filter(Boolean);
        if (cardTags.length > 0) {
            /** @returns {boolean} */
            matchCheck = function(card) {
                return cardTags.subsetOf(card.tags.map(dict => dict.val));
            }
        } else {
            return 'Empty search.';
        }
    } else {
        const searchText = searchParams.get('search');
        if (searchText) {
            const phrase = new RegExp(searchText, 'i');
            matchCheck = function(card) {
                return phrase.test(removeHTMLTag(card.questions)) || phrase.test(removeHTMLTag(card.answers));
            }
        } else {
            return 'Empty search.';
        }
    }

    for (const cards of cardData) {
        if (matchCheck(cards)) {
            output += setQuestionBoxes(cards);
        }
    }

    return output || 'No matches found.';
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
/** @param {HTMLElement} element */
window.ReloadIFrame = function(element) {
    reload(element.parentElement.previousElementSibling);
}

/** @param {HTMLInputElement} radioButton */
window.switchInputMode = function(radioButton) {
    searchTextField.name = radioButton.value;
    searchTextField.value = '';
    uniqueClassElement('flex-checked').className = 'flex-label';
    radioButton.parentElement.className = 'flex-checked';
    switch (radioButton.value) {
        case 'tags':
            searchTextField.style.display = 'none';
            toggleableTagsField.style.display = 'block';
            break;
        case 'search':
            searchTextField.style.display = 'inline';
            toggleableTagsField.style.display = 'none';
            for (const element of Array.from(toggleableTagsField.children)) {
                element.firstElementChild.checked = false
                element.classList.add('unselectedTag');
            }
            break;
        default:
            console.log(radioButton.value);
            break;
    }
}

/** @param {HTMLInputElement} tagCheckbox */
window.toggleTag = function(tagCheckbox) {
    const parentLabel = tagCheckbox.parentElement;
    parentLabel.classList.toggle('unselectedTag');
    const tagName = tagCheckbox.value + ' ';
    searchTextField.value = tagCheckbox.checked ? searchTextField.value + tagName : searchTextField.value.replace(tagName, '');
}
//#endregion