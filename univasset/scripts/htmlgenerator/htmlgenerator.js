/** Shortcut for createElement, HTML attributes, and styles.
 * @param {string} createElement If nested, inner element will be modified and outer element will be returned.
 * @param {{string: string}} attributes
 * @param {{string: string}} styles */
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

    for (const [attrib, value] of Object.entries(attributes)) innerElem[attrib] = value;

    return outerElem ?? innerElem;
}

/** Creates a field for Google Sheets.
 * @param {HTMLElement} grouperElem
 * @param {[str, str][]} nameLinkPair [Name of Google Sheet, Link of Google Sheet ending in alphanumeric] */
export function gdocDropdown(grouperElem, ...nameLinkPair) {
    const selectElem = document.createElement('select');
    const buttonElem = initializeHTML('button', {textContent: 'Source', type: 'button'});
    const iframeElem = document.createElement('iframe');

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