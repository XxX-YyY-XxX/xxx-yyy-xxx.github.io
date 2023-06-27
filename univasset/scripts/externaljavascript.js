import {cmp, type} from './basefunctions/index.js';
export {cmp as compare};

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
/** @template T */
export class Cycle {
    #items = [];
    #index = 0;
    #length = 0;

    /** @param {Iterable<T>} items */
    constructor(items) {
        this.#items = Array.from(items);
        this.#length = items.length;
    } 

    /** @returns {T} */
    next() {
        const output = this.#items[this.#index];
        this.#index = (this.#index + 1) % this.#length
        return output;
    }

    /** @returns {T} */
    prev() {
        const output = this.#items[this.#index];
        this.#index = (this.#index || this.#length) - 1;
        return output;
    }

    /** @returns {T} */
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

/** Class for countdown timers. */
export class Timer {
    #months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    #endtime;

    /** @param {string} date Apr 03, 2023 23:59 UTC-0800 */
    constructor(date) {
        const [mo, ...rest] = date.replace(/,|(UTC)|(GMT)/g, "").replace(":", " ").split(" ");
        const [day, yr, hr, min, off] = rest.map(Number);
        const [hroff, minoff] = Math.intdiv(off, 100);
        this.#endtime = Date.UTC(yr, this.#months.indexOf(mo), day, hr - hroff, min - minoff);
    }

    get done() {return this.#endtime < Date.now()}

    /** @returns Time remaining in milliseconds. */
    get remaining() {return this.#endtime - Date.now()}
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

/** @param {string} path @returns {[string, string]} basename, extension */
export function splitExt(path) {
    //remove base url to prevent false positive
    //(new URL(path)).pathname
    
    //lastIndexOf+slice > split+replace
    var index = path.lastIndexOf('.');
    return [path.slice(0, index), path.slice(index)]
}

/**
 * @param {number} milliseconds
 * @returns {[number, number, number, number, number]} days, hours, minutes, seconds, milliseconds */
export function splitTime(milliseconds) {
    var [sec, milli] = Math.intdiv(milliseconds, 1000);
    var [min, sec] = Math.intdiv(sec, 60);
    var [hr, min] = Math.intdiv(min, 60);
    return [...Math.intdiv(hr, 24), min, sec, milli];
}

/**
 * @template T
 * @param {T} base 
 * @param {{[ObjectAttribute: string]: any}} attributes arguments[] for function calls, {attribute: ???} for property calls, everything else for attribute assigment. */
export function setAttr(base, attributes) {
    for (const [attrib, value] of Object.entries(attributes)) {
        switch (type(value)) {
            case "string":
            case "number":
            case "boolean":
                base[attrib] = value;
                break;
            case "array":
                base[attrib](...value);
                break;
            case "object":
                setAttr(base[attrib], value);
                break;
            default:
                console.warn(`Unknown data type of ${attrib}: ${type(value)}`);
                break;
        }
    }
}
//#endregion

//#region Trial
/** Creates a two-dimensional array.
 * @param {Object} title Occupies index (0, 0) of the table.
 * @param {Array} header Ordered from left to right.
 * @param {Array} leader Ordered from top to bottom.
 * @param {Array} data Objects to populate the matrix.
 * @param {function(Object): [Object, Object]} key Return [x_key(same as in headers), y_key(same as in leaders)].
 * @param {function(Object): Object} headkey Return object that would be used for population reference.
 * @param {function(Object): Object} leadkey Return object that would be used for population reference. */
function matrix(title, header, leader, data, key, headkey = x => x, leadkey = x => x) {
    const base_array = [[title, ...header]];

    const x_len = header.length;
    for (const item of leader) base_array.push([item, ...Array(x_len).fill('')]);

    const head_copy = header.map(headkey);
    const lead_copy = leader.map(leadkey);
    for (const item of data) {
        const [x_axis, y_axis] = key(item);
        base_array[lead_copy.indexOf(y_axis) + 1][head_copy.indexOf(x_axis) + 1] = item;
    }

    return base_array;
}

/** Adds memoization to function.
 * @template {function} T
 * @param {T} func
 * @returns {T} */
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