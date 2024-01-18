import {Timer, splitTime, setAttr} from '../externaljavascript.js';
import {type, zip, range, cmp} from '../basefunctions/index.js';

/** @param {(string | Node)[]} elements */
export function brJoin(elements) {
    const fragment = new DocumentFragment();
    fragment.append(...elements.flatMap(item => [item, document.createElement("br")]).slice(0, -1));    
    return fragment;
}

/** Shortcut for createElement and HTML attributes. Probably should've been named as initializeElement.
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T} createElement If nested (by space), innermost element will be modified and outermost element will be returned.
 * @param {{[HTMLAttribute: string]: string | number | Array | {}}} attributes See {@link setAttr}.
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

/** Creates an array of nodes that nests rightwards. First element is the main parent.
 * @template {keyof HTMLElementTagNameMap} T0
 * @template {keyof HTMLElementTagNameMap} T1
 * @param {T0} tag0
 * @param {T1} tag1
 * @returns {[HTMLElementTagNameMap[T0], HTMLElementTagNameMap[T1]]} */
export function nestElements(tag0, tag1) {
    const e0 = document.createElement(tag0);
    const e1 = document.createElement(tag1);
    e0.appendChild(e1);
    return [e0, e1];
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
 * @param {HTMLElement} grouper_elem
 * @param {Array[]} tablematrix First row will be used as header.
 * @param {(function(HTMLTableCellElement, any): void)[]} mapping
 * @param {{frzcol: boolean, frzhdr: boolean}} */
export function table(grouper_elem, tablematrix, mapping, {frzcol = false, frzhdr = false} = {}) {
    //Almost always a string
    const [thead_elem, tr_elem] = nestElements("thead", "tr");
    for (const value of tablematrix.shift()) {
        const th = document.createElement("th");
        th.textContent = value;
        tr_elem.appendChild(th);
    }

    const tbodyElem = document.createElement("tbody");
    for (const rows of tablematrix) {
        const tr = document.createElement("tr");
        tr.append(...rows.map((value, index) => {
            const td = document.createElement("td");
            mapping[index](td, value);
            return td;
        }));
        tbodyElem.appendChild(tr);
    }

    const table_elem = document.createElement("table");
    table_elem.append(thead_elem, tbodyElem);

    if (frzcol) table_elem.classList.add("freeze_col");
    if (frzhdr) table_elem.classList.add("freeze_row");

    grouper_elem.classList.add("func_table");
    grouper_elem.appendChild(table_elem);
}

/** Creates a sortable table from a given matrix of data.
 * @param {HTMLElement} grouper_elem
 * @param {Array[]} tablematrix First row will be used as header. Other rows will be used as sorting basis.
 * @param {(function(any): string | number | Node)[]} mapping
 * @param {{frzcol: boolean, frzhdr: boolean}} */
export function tableSort(grouper_elem, tablematrix, mapping, {frzcol = false, frzhdr = false, caption = null} = {}) {
    /** @param {Array} data_array */
    function sortableRow(data_array) {
        const TR = document.createElement("tr");

        for (const [VALUE, FUNC] of zip(data_array, mapping)) {
            const TD = document.createElement("td");
            TD.append(FUNC(VALUE));
            TR.appendChild(TD);
        }

        return {list: data_array, row: TR};
    }

    const HEADER_ROW = tablematrix[0];                          //Almost always a string
    const DATA_ROWS = tablematrix.slice(1).map(sortableRow);

    const [THEAD, HEADER_TR] = nestElements("thead", "tr");

    const TBODY = document.createElement("tbody");
    TBODY.append(...DATA_ROWS.map(x => x.row));

    const TABLE = document.createElement("table");
    if (caption !== null) {
        const CAPTION = document.createElement("caption");
        CAPTION.textContent = caption;
        TABLE.appendChild(CAPTION);
    }
    TABLE.append(THEAD, TBODY);

    /** @this {HTMLTableCellElement} @param {MouseEvent} event */
    function sortMethod(event) {
        const DATA = this.dataset;
        switch (DATA.sort) {
            case "no":
            case "lo":
                DATA.sort = "hi";
                switch (DATA.type) {
                    case "string":
                        DATA_ROWS.sort(cmp({key: ({list}) => list[DATA.index]}));
                        break;
                    case "number":
                        DATA_ROWS.sort(cmp({key: ({list}) => list[DATA.index], reverse: true}));
                        break;
                    case "array":
                        DATA_ROWS.sort(cmp({key: ({list}) => [~list[DATA.index].length, list[DATA.index]]}));
                        break;
                    case "object":
                        DATA_ROWS.sort(cmp({key: ({list}) => {let y = Object.keys(list[DATA.index]); return [~y.length, y]}}));
                        break;
                    default:
                        console.log("Unregistered type:", DATA.type, DATA_ROWS[0].list[DATA.index]);
                        break;
                }
                break;
            case "hi":
                DATA.sort = "lo";
                switch (DATA.type) {
                    case "string":
                        DATA_ROWS.sort(cmp({key: ({list}) => list[DATA.index], reverse: true}));
                        break;
                    case "number":
                        DATA_ROWS.sort(cmp({key: ({list}) => list[DATA.index]}));
                        break;
                    case "array":
                        DATA_ROWS.sort(cmp({key: ({list}) => [list[DATA.index].length, list[DATA.index]]}));
                        break;
                    case "object":
                        DATA_ROWS.sort(cmp({key: ({list}) => {let y = Object.keys(list[DATA.index]); return [y.length, y]}}));
                    default:
                        console.log("Unregistered type:", DATA.type, DATA_ROWS[0].list[DATA.index]);
                        break;
                    }
                break;
        }
        TBODY.replaceChildren(...DATA_ROWS.map(x => x.row));
    }

    for (const [INDEX, NAME, TYPE] of zip(range(), HEADER_ROW, DATA_ROWS[0].list.map(type))) {
        const TH = document.createElement("th");
        TH.textContent = NAME;
        TH.addEventListener("click", sortMethod, true);
        setAttr(TH.dataset, {sort: "no", index: INDEX, type: TYPE});
        HEADER_TR.appendChild(TH);
    }

    if (frzcol) TABLE.classList.add("freeze-col");
    if (frzhdr) TABLE.classList.add("freeze-row");

    grouper_elem.classList.add("func_table");
    grouper_elem.appendChild(TABLE);
}

export class Table {
    normal() {

    }

    sort() {

    }

    filter() {

    }
}

/** Creates a timer for events.
 * @param {HTMLElement} grouper_elem
 * @param {string} date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} eventURL URL of the banner image.
 * @param {{onEnd: function(): void, interval: number}}
 * @param onEnd Event listener for when timer reaches 0.
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
 * @param {...[string | HTMLElement, string, function(HTMLInputElement): void]} buttondata [textContent, value, onclick function] Each function should have code on select and deselect. */
export function radioGroup(grouper_elem, radioname, ...buttondata) {
    /** @type {Map<string, function(HTMLInputElement): void>}*/ const radio_functions = new Map();
    /** @type {HTMLInputElement} */ var current_checked;
    const fragment = new DocumentFragment();

    for (const [index, [text, value, func]] of Object.entries(buttondata)) {
        radio_functions.set(value, func)

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