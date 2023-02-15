import {iter} from './basefunctions/basefunctions.js';

//#region Constants
/** Close to zero value. */
const epsilon = 10 ** -10;
/** Reusable element for offscreen DOM. */
const dummyHTML = new DOMParser().parseFromString('', 'text/html').body;
/** URL of current page. */
export const pageURL = window.location.origin + window.location.pathname;
//#endregion

//#region Enumerators
//#endregion

//#region Class
/** (a, b) for ascending, (b, a) for descending. */
export class Compare {
    /** @param {string} a @param {string} b */
    static string(a, b) {
        return a.localeCompare(b);
    }

    /** @param {number} a @param {number} b */
    static number(a, b) {
        return a - b;
    }
}

/** @template T */
export class Cycle {
    #items = [];
    #index = 0;
    #length = 0;

    /** @param {T[]} items */
    constructor(...items) {
        this.#items = items.length === 1 && items[0] === iter(items[0]) ? Array.from(items[0]) : items;
        this.#length = items.length;
    } 

    next() {
        const output = this.#items[this.#index];
        this.#index += 1;
        if (this.#index == this.#length)
            this.#index = 0;
        return output;
    }

    prev() {
        const output = this.#items[this.#index];
        this.#index -= 1;
        if (this.#index == -1)
            this.#index = this.#length - 1;
        return output;
    }

    reset() {
        const output = this.#items[this.#index];
        this.#index = 0;
        return output;
    }
}

export class Check {
    /** @param {string} url */
    static isImage(url) {
        /* const img = new Image();
        img.onerror = function() {globalVariable = false};
        img.onload = function() {globalVariable = true};
        img.onerror = () => {console.log(url, 'failed.')};
        img.onload = () => {console.log(url, 'success.')};

        try {
            img.src = url;
        } catch {
            console.log(url, 'is epic lol.');
        }
        return globalVariable; */

        /* return new Promise(function (resolve, reject) {
            var timeout = 5000;
            var timer, img = new Image();
            img.onerror = img.onabort = function () {
                clearTimeout(timer);
                reject("error");
            };
            img.onload = function () {
                clearTimeout(timer);
                resolve("success");
            };
            timer = setTimeout(function () {
                // reset .src to invalid URL so it stops previous
                // loading, but doesn't trigger new load
                img.src = "//!!!!/test.jpg";
                reject("timeout");
            }, timeout);
            img.src = url;
        }); */

        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
}

/** Returns Promise. */
export class Async {
    /** @param {RequestInfo | URL} jsonFile @returns JSON object. */
    static async getJSON(jsonFile) {
        return fetch(jsonFile).then(response => response.json());
    }
}
//#endregion

//#region Functions
/** @param {string} htmlString */
export function removeHTMLTag(htmlString) {
    return htmlString.replace(/<([^>]+)>/ig, '');
}

/** @param {number} min Inclusive @param {number} max Exclusive */
export function randInt(min, max) {
    //Math.random() = [0...1)
    return Math.floor(Math.random() * (max - min)) + min;
}

/** @param {HTMLIFrameElement} iframeElement*/
export function reloadIFrame(iframeElement) {
    const temp = iframeElement.src;
    iframeElement.src = '';
    iframeElement.src = temp;
}

/** @param {string} path @returns [basename, extension] */
export function splitExt(path) {
    //remove base url to prevent false positive
    //(new URL(path)).pathname
    
    //lastIndexOf+slice > split+replace
    var index = path.lastIndexOf('.');
    return [path.slice(0, index), path.slice(index)]
}

/** For input elements inside label elements.
 * @param {HTMLInputElement} inputElement
 * @returns true if successfully toggled, false otherwise. */
export function checkedLabel(inputElement) {
    const old_check = inputElement.parentElement.classList.contains('checked');
    const new_check = inputElement.parentElement.classList.toggle('checked', inputElement.checked);
    return old_check != new_check;
}

/** Returns days, hours, minutes, seconds.
 * @param {number} milliseconds
 * @returns {[number, number, number, number]}*/
export function splitTime(milliseconds) {
    var [min, sec] = Math.intdiv(Math.trunc(milliseconds / 1000), 60)
    var [hr, min] = Math.intdiv(min, 60)
    return [...Math.intdiv(hr, 24), min, sec]
}
//#endregion

//#region Trial
function compare() {
    var current_func = function(a, b) {
        current_func = {
            string(x, y) {return x.localeCompare(y)},
            number(x, y) {return x - y}
        }[typeof a];
    
        return current_func(a, b);
    }

    /** (a, b) for ascending, (b, a) for descending.
     * @returns {int} */
    return function(a, b) {
        return current_func(a, b);
    }
}

/** Creates a two-dimensional array.
 * @param {Object} title Occupies index (0, 0) of the table.
 * @param {Array} header Ordered from left to right.
 * @param {Array} leader Ordered from top to bottom.
 * @param {Array} data Objects to populate the matrix.
 * @param {function(Object): [Object, Object]} key Return [x_key(same as in headers), y_key(same as in leaders)].
 * @param {function(Object): Object} headkey Return object that would be used for population reference.
 * @param {function(Object): Object} leadkey Return object that would be used for population reference.
 */
function matrix(title, header, leader, data, key, headkey = null, leadkey = null) {
    const base_array = [[title, ...header]];

    const x_len = header.length;
    for (const item of leader) base_array.push([item, ...Array(x_len).fill('')]);

    const head_copy = header.map(headkey ?? (x => x));
    const lead_copy = leader.map(leadkey ?? (x => x));
    for (const item of data) {
        const [x_axis, y_axis] = key(item);
        base_array[lead_copy.indexOf(y_axis) + 1][head_copy.indexOf(x_axis) + 1] = item;
    }

    return base_array;
}

/** Adds memoization to function.
 * @param {function} func */
function memoize(func) {
    const bank = new Map();
    return function(...args) {
        if (!bank.has(args)) bank.set(args, func(...args));
        return bank.get(args);
    }
}
//#endregion

/*const oXHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
oXHR.onreadystatechange = function() {
    if (oXHR.readyState === 4 && oXHR.status == 200)
        questionCards = JSON.parse(this.responseText);
};
oXHR.overrideMimeType("application/json");
oXHR.open("GET", "/GFL/cards.json", true);          // true = ASYNCHRONOUS REQUEST (DESIRABLE), false = SYNCHRONOUS REQUEST.
oXHR.send(); */

//sessionStorage.outputCards = typeof(Storage) !== null ? boxes : "Sorry, your browser does not support web storage...";
//iframe.contentWindow.location.reload();

//<th rowspan="3" colspan="2">Algorithm Stats</th>
//<td colspan="2" align="center">2 Slot</td>