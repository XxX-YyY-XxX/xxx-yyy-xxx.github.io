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

export class RadioButton {
    /** @type {HTMLInputElement} */
    #currentChecked;
    #radioFunctions;
    #radioGroup;

    /** @param {string} name Name of the radio group.
     * @param {{string : function(HTMLInputElement)}} perButton \{radioButton.value : function(radioButton) => void } */
    constructor(name, perButton) {
        this.#currentChecked = Array.from(document.getElementsByName(name)).filter(button => button.checked)[0];
        this.#radioFunctions = perButton;
        this.#radioGroup = name;
    }

    /** Runs if clicked button is different from current checked button.
     * @param {HTMLInputElement} checkedButton Button that was interacted.
     * @throws RadioButtonError if "checkedButton" is from a different radio group. */
    run(checkedButton) {
        //what if no default selected button?
        if (checkedButton.name != this.#radioGroup)
            throw `RadioButtonError: Button is not part of the "${this.#radioGroup}" radio group.`

        if (checkedButton !== this.#currentChecked) {
            this.#radioFunctions[this.#currentChecked.value](this.#currentChecked);
            this.#radioFunctions[checkedButton.value](checkedButton);
            this.#currentChecked = checkedButton;
        }
    }
}

/** For functions that return a Promise. */
export class AsyncFunc {
    /** @param {RequestInfo | URL} jsonFile @returns Promise of JSON object. */
    static async getJSON(jsonFile) {
        return fetch(jsonFile).then(response => response.json());
    }
}

export class Cycle {
    #items;
    #index;
    #length;

    constructor(...items) {
        this.#items = items;
        this.#index = 0;
        this.#length = this.#items.length;
    } 

    next() {
        const item = this.#items[this.#index];
        this.#index += 1;
        if (this.#index == this.#length)
            this.#index = 0;
        return item;
    }

    prev() {
        const item = this.#items[this.#index];
        this.#index -= 1;
        if (this.#index == -1)
            this.#index = this.#length - 1;
        return item;
    }

    reset() {
        const item = this.#items[this.#index];
        this.#index = 0;
        return item;
    }
}

export class Check {
    static typeof(any) {
        const item_type = typeof any;
        switch (true) {
            case item_type !== 'object':
                return item_type;
            case Array.isArray(any):
                return 'array';
            case any instanceof Set:
                return 'set';
            case [HTMLElement, DocumentFragment].some(x => any instanceof x):
                return 'dom';
            default:
                return 'object';
        }
    }

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
//#endregion

//#region Helper Functions
/** @param {Iterable} iterable */
function getIterator(iterable) {
    //if (iterable[Symbol.iterator]() === iterable)
    //Set = iterable[Symbol.iterator]();

    if (!['set'].includes(Check.typeof(iterable)))
        console.log(Check.typeof(iterable), iterable);

    return iterable[Symbol.iterator]();
}
//#endregion

//#region Functions
/** @param {string} htmlString */
export function removeHTMLTag(htmlString) {
    return htmlString.replace(/(<([^>]+)>)/ig, '');
}

//Math.random() = [0...1)
/** @param {number} min Inclusive @param {number} max Exclusive */
export function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/** @param {HTMLIFrameElement} iframeElement*/
export function reloadIFrame(iframeElement) {
    var temp = iframeElement.src;
    iframeElement.src = '';
    iframeElement.src = temp;
}

/** @param {string} path @returns [basename, extension] */
//lastIndexOf+slice > split+replace
export function splitExt(path) {
    //remove base url to prevent false positive
    //(new URL(path)).pathname
    var index = path.lastIndexOf('.');
    return [path.slice(0, index), path.slice(index)]
}

/** For input elements inside label elements.
 * @param {HTMLInputElement} inputElement
 * @returns true if successfully toggled, false otherwise. */
export function checkedLabel(inputElement) {
    var oldClasses = inputElement.parentElement.className;
    inputElement.parentElement.classList.toggle('checked', inputElement.checked);
    return inputElement.parentElement.className != oldClasses;
}
//#endregion

//#region Generators
/** @param {boolean} extend true to extend, false to clip
 * @param {Iterable[]} iterables order of iterables = order of output
 * @returns "Tuple" of values from each array */
export function* zip(extend, ...iterables) {
    const iterator_array = iterables.map(getIterator);
    const extension = extend ? 'some' : 'every';
    const output = [];
    while (iterator_array.map(x => {const {value, done} = x.next(); output.push(value); return !done;})[extension](x => x))
        yield output.splice(0);
}
//#endregion

//#region Trial
function compare(a, b) {
    return {
        string(x, y) {return x.localeCompare(y)},
        number(x, y) {return x - y}
    }[typeof a](a, b);    
}

/** Creates a two-dimensional array.
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
    for (const item of leader)
        base_array.push([item, ...Array(x_len).fill('')]);

    const head_copy = headkey ? header.map(headkey) : header;
    const lead_copy = leadkey ? leader.map(leadkey) : leader;
    for (const item of data) {
        const [x_axis, y_axis] = key(item);
        base_array[lead_copy.indexOf(y_axis) + 1][head_copy.indexOf(x_axis) + 1] = item;
    }

    return base_array;
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