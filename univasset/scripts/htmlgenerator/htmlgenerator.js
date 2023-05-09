import {Timer, splitTime, setAttr, compare} from '../externaljavascript.js';
import {type, zip} from '../basefunctions/index.js';

/** @param {(string | Node)[]} elements */
export function brJoin(elements) {
    const fragment = new DocumentFragment();
    fragment.append(...elements.flatMap(item => [item, document.createElement("br")]).slice(0, -1));    
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
        [outerElem, ...restElems] = createElement.split(' ').map(x => document.createElement(x));   //Illegal invocation
        
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
 * @param {HTMLElement} grouper_elem
 * @param {[string, string][]} namelinkpair [Name of Google Sheet, Link of Google Sheet ending in alphanumeric] */
export function gdocDropdown(grouper_elem, ...namelinkpair) {
    const embedtext = "/preview?pli=1";
    const select_elem = document.createElement("select");
    const button_elem = document.createElement("button");
    setAttr(button_elem, {textContent: "Source", type: "button"});
    const iframe_elem = document.createElement("iframe");
    iframe_elem.loading = "lazy";

    select_elem.addEventListener("change", function() {iframe_elem.src = this.selectedOptions[0].value + embedtext});
    button_elem.addEventListener("click", () => window.open(select_elem.selectedOptions[0].value));

    for (const [name, link] of namelinkpair) {
        const option = document.createElement("option");
        setAttr(option, {textContent: name, value: link});
        select_elem.appendChild(option);
    }

    iframe_elem.src = select_elem.firstElementChild.value + embedtext;

    grouper_elem.classList.add("func_googleDoc");
    grouper_elem.append(select_elem, button_elem, document.createElement("br"), iframe_elem);
}

/** Creates a table from a given matrix of data.
 * @param {HTMLElement} grouperElem
 * @param {Array[]} tableMatrix First row will be used as header.
 * @param {{sort: boolean|function(HTMLElement), filter: boolean, frzcol: boolean, frzhdr: boolean}} */
export function table(grouperElem, tableMatrix, {sort = false, filter = false, frzcol = false, frzhdr = false} = {}) {
    alert("Use 'tableWithSort' for sorted tables.");

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

/** Creates a sortable table from a given matrix of data.
 * @param {HTMLElement} grouper_elem
 * @param {Array[]} tablematrix First row will be used as header.
 * @param {(function(any): HTMLTableCellElement)[]} mapping
 * @param {{frzcol: boolean, frzhdr: boolean}} */
export function tableSort(grouper_elem, tablematrix, mapping, {frzcol = false, frzhdr = false} = {}) {
    //Almost always a string
    const header_elems = tablematrix.shift().map(value => {
        const th = document.createElement("th");
        th.textContent = value;
        return th;
    });
    const tr_elem = document.createElement("tr");
    tr_elem.append(...header_elems);
    const thead_elem = document.createElement("thead");
    thead_elem.appendChild(tr_elem);

    const tbodyElem = document.createElement("tbody");
    for (const rows of tablematrix) {
        const rowElems = rows.map((value, index) => mapping[index](value));
        tbodyElem.appendChild(setAttr(document.createElement("tr"), {append: rowElems}));
    }

    const tableElem = initializeHTML("table", {append: [thead_elem, tbodyElem]});

    const samplerow = tablematrix[0];

    /** @type {function(HTMLTableRowElement): string | number | null} */
    const leadkey = {
        string: x => x.firstElementChild.textContent,
        number: x => Number(x.firstElementChild.textContent),
        array: x => null,
        dom: x => null
    }[type(samplerow[0])];

    /** @param {MouseEvent} event */
    function sortMethod(event) {
        /** @type {HTMLTableCellElement} */ const cell = this;
        /** @type {Array} */
        const sorted_array = {
            no: function() {return this.lo()},
            hi() {
                const index = cell.dataset.index;
                cell.dataset.sort = "lo";

                return {
                    string: () => tablematrix.sort(compare({key: x => x[index], reverse: true})),
                    number: () => tablematrix.sort(compare({key: x => x[index]})),
                    array: () => tablematrix.sort(compare({key: x => [x[index].length, x[index]]})),
                    object: () => tablematrix.sort(compare({key: x => {let y = Object.keys(x[index]); return [y.length, y]}}))
                }[cell.dataset.type]()
            },
            lo() {
                const index = cell.dataset.index;
                cell.dataset.sort = "hi";

                return {
                    string: () => tablematrix.sort(compare({key: x => x[index]})),
                    number: () => tablematrix.sort(compare({key: x => x[index], reverse: true})),
                    array: () => tablematrix.sort(compare({key: x => [~x[index].length, x[index]]})),
                    object: () => tablematrix.sort(compare({key: x => {let y = Object.keys(x[index]); return [~y.length, y]}}))
                }[cell.dataset.type]()
            }
        }[cell.dataset.sort]();

        const new_sort = Array.from(tbodyElem.children).sort(compare({key: leadkey, array: sorted_array.map(x => x[0])}));
        tbodyElem.replaceChildren(...new_sort);
    }

    for (const [index, headerCell] of Object.entries(header_elems)) {
        setAttr(headerCell.dataset, {sort: "no", index: index, type: type(samplerow[index])});
        headerCell.addEventListener("click", sortMethod, true);
    }

    if (frzcol) tableElem.classList.add("freeze_col");
    if (frzhdr) tableElem.classList.add("freeze_row");

    grouper_elem.classList.add("func_table");
    grouper_elem.appendChild(tableElem);
}

/** Creates a timer for events.
 * @param {HTMLElement} grouper_elem
 * @param {string} date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} eventURL URL of the banner image.
 * @param {{onEnd: function(): void, interval: number}} onEnd Event listener for when timer reaches 0.
 * @param interval Time it takes to update the timer, in milliseconds. Default 1000. */
export function timer(grouper_elem, date, eventURL = '', {onEnd = null, interval = 1000} = {}) {
    const classtext = "func_timer";
    const time = new Timer(date);
    if (time.done) {onEnd?.(); return};

    const span = document.createElement("span");
    const countdown = setInterval(function() {
        span.textContent = splitTime(time.remaining).slice(0, -1).map(num => String(num).padStart(2, '0')).join(' : ');
        if (time.done) {
            clearInterval(countdown);
            grouper_elem.replaceChildren();
            grouper_elem.classList.remove(classtext);
            onEnd?.();
        }
    }, interval);

    grouper_elem.classList.add(classtext);
    const img = document.createElement("img");
    setAttr(img, {src: eventURL, alt: "Image error.", loading: "lazy"});    // Will change
    grouper_elem.append(img, span);
}

/** Creates a radio group. Clicked button only runs when it's unchecked. First button is the default checked.
 * @param {HTMLElement} grouper_elem
 * @param {string} radioname Name of the radio group. Most useful on form submissions.
 * @param {[string | HTMLElement, string, function(HTMLInputElement): void][]} buttondata [textContent, value, onclick function] Each function should have code on select and deselect. */
export function radioGroup(grouper_elem, radioname, ...buttondata) {
    const radio_functions = new Map(buttondata.map(([, value, func]) => [value, func]));
    /** @type {HTMLInputElement} */ var current_checked;

    const fragment = new DocumentFragment();
    for (const [index, [text, value, func]] of Object.entries(buttondata)) {
        const input_elem = document.createElement("input");
        setAttr(input_elem, {value: value, type: "radio", name: radioname, checked: !Number(index)});
        input_elem.addEventListener("click", function() {
            if (current_checked === this) return;
            radio_functions.get(current_checked.value)(current_checked);
            current_checked = this;
            func(this);
        });
        func(input_elem);

        const label_elem = document.createElement("label");
        label_elem.append(input_elem, text);
        fragment.appendChild(label_elem);
    }

    current_checked = fragment.firstElementChild.firstElementChild;

    grouper_elem.classList.add('func_radioGroup');
    grouper_elem.appendChild(fragment);
}