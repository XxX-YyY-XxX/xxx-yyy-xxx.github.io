//import {IsSubsetOf, RemoveHTMLTag, RandomInteger, UniqueClassElement} from '/univasset/scripts/externaljavascript.js'

//#region Constants and Variables
const toggleableTagsField = document.getElementById('tags-list');
const searchTextField = document.getElementById('search-text');
const searchParams = new URLSearchParams(location.search);
const questionCards = cardData;
//#endregion

document.getElementById('version-number').innerHTML = questionCards.length;

toggleableTagsField.innerHTML = Object.values(dataTags).sort().map(val => 
    `<label class="tags unselectedTag">
        <input type="checkbox" onclick="toggleTag(this)">${val}
    </label>`
).join(' ');

document.getElementById('cards-field').innerHTML = (searchParams.has('search') || searchParams.has('tags')) ? searchCards() : randomCards();

/** @param {HTMLElement} radioButton */
function switchInputMode(radioButton) {
    searchTextField.name = radioButton.value;
    searchTextField.value = '';
    UniqueClassElement('flex-checked').className = 'flex-label';
    radioButton.parentElement.className = 'flex-checked';
    switch (radioButton.value) {
        case 'tags':
            searchTextField.style.display = 'none';
            toggleableTagsField.style.display = 'block';
            break;
        case 'search':
            searchTextField.style.display = 'inline';
            toggleableTagsField.style.display = 'none';
            for (const element of Array.from(document.getElementsByClassName('selectedTag'))) {
                element.firstElementChild.checked = false
                element.className = 'tags unselectedTag';
            }
            break;
        default:
            console.log(radioButton.value);
            break;
    }
}

/** @param {HTMLElement} tagCheckbox */
function toggleTag(tagCheckbox) {
    const parentLabel = tagCheckbox.parentElement;
    const tagName = parentLabel.innerText + ' ';
    if (tagCheckbox.checked) {
        parentLabel.className = 'tags selectedTag';
        searchTextField.value += tagName;
    } else {
        parentLabel.className = 'tags unselectedTag';
        searchTextField.value = searchTextField.value.replace(tagName, '');
    }
}

function searchCards() {
    var output = '';
    var matchCheck;

    if (searchParams.has('tags')) {
        const cardTags = searchParams.get('tags').split(' ').filter(Boolean);
        if (cardTags.length > 0) {
            matchCheck = function(card) {
                return IsSubsetOf(cardTags, card.tags);
            }
        } else {
            return 'Empty search.';
        }
    } else {
        const searchText = searchParams.get('search');
        if (searchText) {
            const phrase = new RegExp(searchText, 'i');
            matchCheck = function(card) {
                return phrase.test(RemoveHTMLTag(card.questions)) || phrase.test(RemoveHTMLTag(card.answers));
            }
        } else {
            return 'Empty search.';
        }
    }

    for (const cards of questionCards) {
        if (matchCheck(cards)) {
            output += setQuestionBoxes(cards);
        }
    }

    return output || 'No matches found.';
}

function randomCards() {
    const maxValue = questionCards.length - 1;
    const indices = new Set();
    var output = '';

    do {
        indices.add(RandomInteger(0, maxValue));
    } while (indices.size < 3)

    for (const index of indices) {
        output += setQuestionBoxes(questionCards[index]);
    }

    return output;
}

function setQuestionBoxes(cards) {
    return `<fieldset>
        <legend><h3>${cards.questions}</h3></legend>
        ${cards.answers}
        <hr>
        Tags: ${cards.tags.map(val => `<span class="tags card-tags">${val}</span>` ).join(' ')}
        </fieldset>`;
}