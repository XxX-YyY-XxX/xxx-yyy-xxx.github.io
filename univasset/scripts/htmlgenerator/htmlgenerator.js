import {splitTime, setAttr, compare} from '../externaljavascript.js';
import {type} from '../basefunctions/index.js';

/** @param {(string | Node)[]} elements */
function brJoin(elements) {
    const fragment = new DocumentFragment();
    fragment.append(...elements.flatMap(item => [item, document.createElement('br')]).slice(0, -1));    
    return fragment;
}

/** Shortcut for createElement and HTML attributes. Probably should've been named as initializeElement.
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T} createElement If nested (by space), innermost element will be modified and outermost element will be returned.
 * @param {{HTMLAttribute: string | number | Array | {}}} attributes See {@link setAttr}.
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

    setAttr(innerElem, attributes);

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

    selectElem.append(...nameLinkPair.map(([name, link]) => initializeHTML('option', {textContent: name, value: link})));
    iframeElem.src = selectElem.firstElementChild.value + '/preview?pli=1';

    grouperElem.classList.add('func_googleDoc');
    grouperElem.append(selectElem, buttonElem, document.createElement('br'), iframeElem);
}

/** Creates a table from a given matrix of data.
 * @param {HTMLElement} grouperElem
 * @param {Array[]} tableMatrix First row will be used as header.
 * @param {{sort: boolean|function(HTMLElement), filter: boolean, frzcol: boolean, frzhdr: boolean}} */
export function table(grouperElem, tableMatrix, {sort = false, filter = false, frzcol = false, frzhdr = false} = {}) {
    const headerElems = tableMatrix.shift().map(value => {
        const th = document.createElement("th");
        switch (type(value)) {
            case "string":
            case "number":
                th.textContent = value;
                break;
            case "array":
                th.appendChild(brJoin(value));
                break;
            case "dom":
                th.appendChild(value);
                break;
            default:
                console.log(type(value), value);
                th.textContent = value;
                break;
        }
        return th;
    });
    /** @type {HTMLTableSectionElement} */ const theadElem = initializeHTML("thead tr", {append: headerElems});

    const tbodyElem = document.createElement('tbody');
    for (const rows of tableMatrix) {
        const rowElems = rows.map(value => {
            const td = document.createElement("td");
            switch (type(value)) {
                case "string":
                case "number":
                    td.textContent = value;
                    break;
                case "array":
                    td.appendChild(brJoin(value))
                    break;
                case "dom":
                    th.appendChild(value);
                    break;        
                default:
                    console.log(type(value), value);
                    td.textContent = value;
            }
            return td;
        });
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
            header_data.onsort = 0;

            const samplerow = tableMatrix[0];
            /** @type {function(HTMLTableRowElement): string|number} */ const leadkey = {
                string: x => x.firstElementChild.textContent,
                number: x => Number(x.firstElementChild.textContent),
                array: x => null,
                dom: x => null
            }[type(samplerow[0])];

            /** @param {MouseEvent} event */
            function sortMethod(event) {
                /** @type {HTMLTableCellElement} */ const cell = this;
                const basis_array = {
                    no() {
                        const index = cell.dataset.index;
                        cell.dataset.sort = 'hi';
    
                        if (index != header_data.onsort) {
                            headerElems[header_data.onsort].dataset.sort = 'no';
                            header_data.onsort = index;
                        }
    
                        return {
                            string: () => tableMatrix.slice().sort(compare({key: x => x[index]})),
                            number: () => tableMatrix.slice().sort(compare({key: x => x[index], reverse: true})),
                            array: () => tableMatrix.slice().sort(compare({key: x => [~x[index].length, x[index]]})),
                            dom: () => null
                        }[cell.dataset.type]()
                    },
                    hi() {
                        const index = cell.dataset.index;
                        cell.dataset.sort = 'lo';
    
                        return {
                            string: () => tableMatrix.slice().sort(compare({key: x => x[index], reverse: true})),
                            number: () => tableMatrix.slice().sort(compare({key: x => x[index]})),
                            array: () => tableMatrix.slice().sort(compare({key: x => [x[index].length, x[index]]})),
                            dom: () => null
                        }[cell.dataset.type]()
                    },
                    lo() {
                        cell.dataset.sort = 'no';
    
                        return tableMatrix;
                    }
                }[cell.dataset.sort]().map(row => row[0]);

                const new_sort = Array.from(tbodyElem.children).sort(compare({key: leadkey, array: basis_array}));
                tbodyElem.replaceChildren(...new_sort);                                                                     
            }

            for (const [index, headerCell] of Object.entries(headerElems)) {
                setAttr(headerCell.dataset, {sort: 'no', index: index, type: type(samplerow[index])});
                headerCell.addEventListener('click', sortMethod, true);
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

/** Creates a timer for events.
 * @param {HTMLElement} grouperElem
 * @param {string} date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} eventURL URL of the banner image.
 * @param {{onEnd: function(): void, interval: number}} onEnd Event listener for when timer reaches 0.
 * @param interval Time it takes to update the timer, in milliseconds. Default 1000. */
export function timer(grouperElem, date, eventURL = '', {onEnd = null, interval = 1000} = {}) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [mo, ...rest] = date.replace(/,|(UTC)|(GMT)/g, '').replace(':', ' ').split(' ');
    const [day, yr, hr, min, off] = rest.map(Number);
    const [hroff, minoff] = Math.intdiv(off, 100);
    const endtime = Date.UTC(yr, months.indexOf(mo), day, hr - hroff, min - minoff);

    if (endtime < Date.now()) {
        onEnd?.();
        return;
    }

    const spanElem = document.createElement('span');
    const countdown = setInterval(function() {
        const count = endtime - Date.now();
        spanElem.textContent = splitTime(count).slice(0, -1).map(num => String(num).padStart(2, '0')).join(' : ');
        if (count < 0) {
            clearInterval(countdown);
            grouperElem.replaceChildren();
            grouperElem.classList.remove('func_timer');
            onEnd?.();
        }
    }, interval);

    grouperElem.classList.add('func_timer');
    grouperElem.append(initializeHTML('img', {src: eventURL, alt: 'Image error.', loading: 'lazy'}), spanElem);    
}

/** Creates a radio group. Clicked button only runs when it's unchecked. First button is the default checked.
 * @param {HTMLElement} grouperElem
 * @param {string} radioName Name of the radio group. Most useful on form submissions.
 * @param {[string | HTMLElement, string, function(HTMLInputElement): void][]} perButtonFunc [textContent, value, onclick function] Each function should have code on select and deselect. */
export function radioGroup(grouperElem, radioName, ...perButtonFunc) {
    const radioFunctions = new Map(perButtonFunc.map(([, value, func]) => [value, func]));
    var currentChecked;

    const fragment = new DocumentFragment();
    for (const [text, value, func] of perButtonFunc) {
        const inputElem = initializeHTML('input', {value: value, type: 'radio', name: radioName});
        inputElem.addEventListener('click', function() {
            if (currentChecked === this) return
            radioFunctions.get(currentChecked.value)(currentChecked);
            func(this);
            currentChecked = this;
        });
        fragment.appendChild(initializeHTML('label', {append: [inputElem, text]}));
    }

    currentChecked = fragment.firstElementChild.firstElementChild;
    currentChecked.checked = true;
    radioFunctions.get(currentChecked.value)(currentChecked);

    grouperElem.classList.add('func_radioGroup');
    grouperElem.appendChild(fragment);
}