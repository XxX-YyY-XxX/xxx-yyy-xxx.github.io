import {Compare, Check} from '../externaljavascript.js';

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

/** Creates a table from a given matrix of data.
 * @param {HTMLElement} grouperElem
 * @param {Array[]} tableMatrix */
export function table(grouperElem, tableMatrix, {sort = false, filter = false, frzcol = false, frzhdr = false} = {}) {
    const tableElem = document.createElement('table');
    const theadElem = document.createElement('thead');
    const tbodyElem = document.createElement('tbody');

    tableElem.append(theadElem, tbodyElem)

    const headertr = document.createElement('tr');
    for (const header of tableMatrix.shift())
        headertr.appendChild(initializeHTML('th', Check.typeof(header) === 'dom' ? {appendChild: [header]} : {textContent: header}));
    theadElem.appendChild(headertr);

    /** @param {Array[]} nestedArray */
    function printDataRows(nestedArray) {
        tbodyElem.textContent = '';
        for (const rows of nestedArray) {
            const trElem = document.createElement('tr');
            for (const items of rows)
                trElem.appendChild(initializeHTML('td', Check.typeof(items) === 'dom' ? {appendChild: [items]} : {textContent: items}));
            tbodyElem.appendChild(trElem);
        }
    }

    printDataRows(tableMatrix);

    //------------------------------------------------------------------------------------------------------------

    switch (true) {
        case sort && filter:
            alert('Sort and Filter are both activated.');
            break;
        case sort:
            //multi sort
            //multiple option sort
            const samplerow = tableMatrix[0];
            headertr.dataset.onsort = 0;
            const string_sort = {
                no(cell) {
                    const index = cell.dataset.index;
                    cell.dataset.sort = 'hi';

                    if (index != headertr.dataset.onsort) {
                        headertr.children.item(headertr.dataset.onsort).dataset.sort = 'no';
                        headertr.dataset.onsort = index;
                    }

                    return tableMatrix.slice().sort((a, b) => Compare.string(a[index], b[index]));
                },
                hi(cell) {
                    const index = cell.dataset.index;
                    cell.dataset.sort = 'lo';

                    return tableMatrix.slice().sort((a, b) => Compare.string(b[index], a[index]));
                },
                lo(cell) {
                    cell.dataset.sort = 'no';

                    return tableMatrix;
                }                                           
            };
            const number_sort = {
                no(cell) {
                    const index = cell.dataset.index;
                    cell.dataset.sort = 'hi';

                    if (index != headertr.dataset.onsort) {
                        headertr.children.item(headertr.dataset.onsort).dataset.sort = 'no';
                        headertr.dataset.onsort = index;
                    }

                    return tableMatrix.slice().sort((a, b) => Compare.number(b[index], a[index]));
                },
                hi(cell) {
                    const index = cell.dataset.index;
                    cell.dataset.sort = 'lo';

                    return tableMatrix.slice().sort((a, b) => Compare.number(a[index], b[index]));
                },
                lo(cell) {
                    cell.dataset.sort = 'no';

                    return tableMatrix;
                }                                           
            };

            for (const [index, headerCell] of Object.entries(headertr.children)) {
                headerCell.dataset.index = index;
                headerCell.dataset.sort = 'no';
                
                switch (typeof samplerow[index]) {
                    case 'string':
                        headerCell.addEventListener('click', function() {
                            printDataRows(string_sort[this.dataset.sort](this));
                        }, true);
                        break;
                    case 'number':
                        headerCell.addEventListener('click', function() {
                            printDataRows(number_sort[this.dataset.sort](this));
                        }, true);
                        break;
                    default:
                        const item = samplerow[index];
                        alert(item, typeof item)
                        break;
                }
            }
            break;
        case filter:
            //unfilter
            //multifilter
            //change to CSS display: 'none';
            //filter for header and first column
            for (const [index, headerCell] of Object.entries(headertr.children)) {
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

    if (frzcol) {
        for (const trElem of [headertr, ...Array.from(tbodyElem.children)])
            trElem.firstElementChild.classList.add('freeze_col');

        if (sort) {
            for (const thElem of Array.from(headertr.children)) {
                thElem.addEventListener('click', function() {
                    for (const trElem of Array.from(tbodyElem.children))
                        trElem.firstElementChild.classList.add('freeze_col');
                }, true);
            }
        }
    }

    if (frzhdr) {
        for (const thElem of Array.from(headertr.children))
            thElem.classList.add('freeze_row')
    }

    //------------------------------------------------------------------------------------------------------------

    grouperElem.classList.add('func_table');
    grouperElem.appendChild(tableElem);
}