import {Check} from '../externaljavascript.js';

/** @param {(string | Node)[]} elements */
function brJoin(elements) {
    const fragment = new DocumentFragment();
    fragment.append(...elements.flatMap(item => [item, document.createElement('br')]).slice(0, -1));    
    return fragment;
}

/** @param {{PropertyOrFunction: string | number | Array | {}}} attributes */
function recursiveAttribute(base, attributes) {
    for (const [attrib, value] of Object.entries(attributes)) {
        switch (Check.typeof(value)) {
            case 'array':
                base[attrib](...value);
                break;
            case 'object':
                recursiveAttribute(base[attrib], value);
                break;
            default:
                base[attrib] = value;
                break;
        }
    }
}

/** Shortcut for createElement and HTML attributes.
 * @param {string} createElement If nested, inner element will be modified and outer element will be returned.
 * @param {{HTMLAttribute: string | number | Array | {}}} attributes String/Number for attribute assigment, Array for function calls, Object for deeper calls. */
export function initializeHTML(createElement, attributes) {
    var outerElem, innerElem;
    if (createElement.includes(' ')) {
        const [outer, inner] = createElement.split(' ');
        outerElem = document.createElement(outer);
        innerElem = document.createElement(inner);
        outerElem.appendChild(innerElem);
    } else {
        outerElem = null;
        innerElem = document.createElement(createElement);
    }

    recursiveAttribute(innerElem, attributes);

    return outerElem ?? innerElem;
}

/** Creates a field for Google Sheets.
 * @param {HTMLElement} grouperElem
 * @param {[str, str][]} nameLinkPair [Name of Google Sheet, Link of Google Sheet ending in alphanumeric] */
export function gdocDropdown(grouperElem, ...nameLinkPair) {
    const selectElem = document.createElement('select');
    const buttonElem = initializeHTML('button', {textContent: 'Source', type: 'button'});
    const iframeElem = initializeHTML('iframe', {loading: 'lazy'});

    selectElem.addEventListener('change', function() {
        iframeElem.src = this.selectedOptions[0].value + '/preview?pli=1';
    });

    buttonElem.addEventListener('click', function() {
        window.open(selectElem.selectedOptions[0].value);
    });

    for (const [name, link] of nameLinkPair) selectElem.appendChild(initializeHTML('option', {textContent: name, value: link}));
    iframeElem.src = selectElem.firstElementChild.value + '/preview?pli=1';

    grouperElem.classList.add('func_googleDoc');
    grouperElem.append(selectElem, buttonElem, document.createElement('br'), iframeElem);
}