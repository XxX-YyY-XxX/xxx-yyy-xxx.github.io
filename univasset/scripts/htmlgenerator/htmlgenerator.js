import {Compare, splitTime} from '../externaljavascript.js';
import {type} from '../basefunctions/basefunctions.js';

/** @param {(string | Node)[]} elements */
function brJoin(elements) {
    const fragment = new DocumentFragment();
    fragment.append(...elements.flatMap(item => [item, document.createElement('br')]).slice(0, -1));    
    return fragment;
}

/** @param {{PropertyOrFunction: string | number | Array | {}}} attributes */
function recursiveAttribute(base, attributes) {
    for (const [attrib, value] of Object.entries(attributes)) {
        switch (type(value)) {
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

/** Shortcut for createElement and HTML attributes. Probably should've been named as initializeElement.
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T} createElement If nested (by space), innermost element will be modified and outermost element will be returned.
 * @param {{HTMLAttribute: string | number | Array | {}}} attributes String/Number for attribute assigment, Array for function calls, Object for deeper calls.
 * @returns {HTMLElementTagNameMap[T]} */
export function initializeHTML(createElement, attributes) {
    var outerElem, innerElem;
    if (createElement.includes(' ')) {
        let restElems, parentElem;
        [outerElem, ...restElems] = createElement.split(' ').map(x => document.createElement(x));
        
        parentElem = outerElem;
        for (innerElem of restElems) {
            parentElem.appendChild(innerElem);
            parentElem = innerElem;
        }
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

/** Creates a table from a given matrix of data.
 * @param {HTMLElement} grouperElem
 * @param {Array[]} tableMatrix First row will be used as header.
 * ```
 *  sort: boolean | keyfunction(matrixData: HTMLElement) => any
 * ``` */
export function table(grouperElem, tableMatrix, {sort = false, filter = false, frzcol = false, frzhdr = false} = {}) {
    const headerElems = tableMatrix.shift().map(header => initializeHTML("th", type(header) === "dom" ? {appendChild: [header]} : {textContent: header}));
    /** @type {HTMLTableSectionElement} */ const theadElem = initializeHTML("thead tr", {append: headerElems});

    const tbodyElem = document.createElement('tbody');
    for (const rows of tableMatrix) {
        const rowElems = rows.map(item => initializeHTML("td", type(item) === "dom" ? {appendChild: [item]} : {textContent: item}));
        tbodyElem.appendChild(initializeHTML("tr", {append: rowElems}));
    }

    const tableElem = initializeHTML("table", {append: [theadElem, tbodyElem]});
    //------------------------------------------------------------------------------------------------------------
    switch (true) {
        case sort && filter:
            alert('Sort and Filter are both activated.');
            break;
        case Boolean(sort):
            //multi sort - 2+ sortings
            //multiple option sort - multiple keys per cell

            /* const key = {
                function: x => sort(x),
                boolean: x => x
            }[type(sort)] */
            /** @type {DOMStringMap} */ const header_data = theadElem.dataset;

            /** @param {HTMLTableCellElement} cell @param {string} type @returns {Array[]} */
            function sortMethod(cell, type) {
                const sorted_array = {
                    no() {
                        const index = cell.dataset.index;
                        cell.dataset.sort = 'hi';
    
                        if (index != header_data.onsort) {
                            headerElems[header_data.onsort].dataset.sort = 'no';
                            header_data.onsort = index;
                        }
    
                        return {
                            string: () => tableMatrix.slice().sort((a, b) => Compare.string(a[index], b[index])),
                            number: () => tableMatrix.slice().sort((a, b) => Compare.number(b[index], a[index]))
                        }[type]()
                    },
                    hi() {
                        const index = cell.dataset.index;
                        cell.dataset.sort = 'lo';
    
                        return {
                            string: () => tableMatrix.slice().sort((a, b) => Compare.string(b[index], a[index])),
                            number: () => tableMatrix.slice().sort((a, b) => Compare.number(a[index], b[index]))
                        }[type]()
                    },
                    lo() {
                        cell.dataset.sort = 'no';
    
                        return tableMatrix;
                    }
                }[cell.dataset.sort]();

                tbodyElem.textContent = '';
                for (const rows of sorted_array) {
                    const rowElems = rows.map(item => initializeHTML("td", type(item) === "dom" ? {appendChild: [item]} : {textContent: item}));
                    tbodyElem.appendChild(initializeHTML("tr", {append: rowElems}));
                }
            }

            header_data.onsort = 0;
            const samplerow = tableMatrix[0];
            for (const [index, headerCell] of Object.entries(headerElems)) {
                const itemtype = type(samplerow[index]);

                headerCell.dataset.sort = 'no';     //Cycles between no, hi, lo
                headerCell.dataset.index = index;   //Constant
                headerCell.addEventListener('click', function() {sortMethod(this, itemtype)}, true);
            }
            break;
        case filter:
            //unfilter
            //multifilter
            //change to CSS display: 'none';
            //filter for header and first column
            for (const [index, headerCell] of Object.entries(headerElems)) {
                headerCell.dataset.index = index;
                if (index) {
                    headerCell.addEventListener('click', function() {
                        //const index = this.dataset.index;
                        //printDataRows(tablerows.filter(x => x[index]));
                    });
                } else {
                    headerCell.addEventListener('click', function() {
                        //printDataRows(tablerows);
                    });
                }
            }

            for (const [index, trElem] of Object.entries(tbodyElem.children)) {
                trElem.dataset.index = index;
                trElem.firstElementChild.addEventListener('click', function() {

                });
            }
            break;
        //default: Simple af table.
    }

    if (frzcol) tableElem.classList.add('freeze_col');
    if (frzhdr) tableElem.classList.add('freeze_row');
    //------------------------------------------------------------------------------------------------------------
    grouperElem.classList.add('func_table');
    grouperElem.appendChild(tableElem);
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Creates a timer for events.
 * @param {HTMLElement} grouperElem
 * @param {string} date Mon dy, year hr:mn (UTC|GMT)±offs */
export function timer(grouperElem, date, eventURL = '') {
    const [mo, ...rest] = date.replace(/,|(UTC)|(GMT)/g, '').replace(':', ' ').split(' ');
    const [day, yr, hr, min, off] = rest.map(Number);
    const [hroff, minoff] = Math.intdiv(off, 100);
    const endtime = Date.UTC(yr, months.indexOf(mo), day, hr - hroff, min - minoff);

    const spanElem = document.createElement('span');
    const countdown = setInterval(function() {
        const count = endtime - Date.now();
        spanElem.textContent = splitTime(count).map(num => String(num).padStart(2, '0')).join(' : ');
        if (count < 0) {
            clearInterval(countdown);
            grouperElem.style.display = 'none';
        }
    }, 1000);

    grouperElem.classList.add('func_timer');
    grouperElem.append(initializeHTML('img', {src: eventURL, alt: 'Image error.', loading: 'lazy'}), spanElem);
}

/** Creates a radio group. Clicked button only runs when it's unchecked. First button is the default checked.
 * @param {HTMLElement} grouperElem
 * @param {string} radioName Name of the radio group. Most useful on form submissions.
 * @param {[string | HTMLElement, string, function(HTMLInputElement): null][]} perButtonFunc [textContent, value, onclick function] */
export function radioGroup(grouperElem, radioName, ...perButtonFunc) {
    const radioFunctions = new Map(perButtonFunc.map(([, value, func]) => [value, func]));
    var currentChecked;

    const fragment = new DocumentFragment();
    for (const [text, value, func] of perButtonFunc) {
        const inputElem = initializeHTML('input', {value: value, type: 'radio', name: radioName});
        inputElem.addEventListener('click', function() {
            if (currentChecked !== this) {
                radioFunctions.get(currentChecked.value)(currentChecked);
                func(this);
                currentChecked = this;
            }
        });
        fragment.appendChild(initializeHTML('label', {append: [inputElem, text]}));
    }

    currentChecked = fragment.firstElementChild.firstElementChild;
    currentChecked.checked = true;
    radioFunctions.get(currentChecked.value)(currentChecked);

    grouperElem.classList.add('func_radioGroup');
    grouperElem.appendChild(fragment);
}