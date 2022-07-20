//#region Prototypes
/** @param {Array} mainArray */
Array.prototype.subsetOf = function(mainArray) {
    //What if duplicate on subset?
    return this.every(val => mainArray.includes(val));
}
//#endregion

//#region Constants
/** Close to zero value. */
const epsilon = 10 ** -10;
/** Reusable element for offscreen DOM. */
const dummyHTML = new DOMParser().parseFromString('', 'text/html').body;
//#endregion

//#region Enumerators
/** For HTML tag removal. */
export class HTMLSearch {
    /** @property Uses regex for quick and dirty searches. */
    static QUICK = 0;
    /** @property Uses HTML parsing for precise element matching. */
    static PRECISE = 1;
}
//#endregion

//#region Class
/** (a, b) for ascending, (b, a) for descending */
//dynamic output through input types
export class Compare {
    /** @param {function(any) : string} key @returns {number} */
    static string(a, b, key = null) {
        if (key !== null)
            [a, b] = [key(a), key(b)];
        return a.localeCompare(b);
    }

    /** @param {function(any) : number} key @returns {number} */
    static number(a, b, key = null) {
        if (key !== null)
            [a, b] = [key(a), key(b)];
        return a - b;
    }
}

export class RadioButton {
    #currentChecked;
    #radioFunctions;
    #univFunction;
    #radioGroup;

    /** @param {String} name Name of the radio group.
     * @param perButton \{radioButton.value : function(radioButton) => void }
     * @param {function(HTMLInputElement) : void} universal Argument is clicked button. */
    constructor(name, perButton, universal = function() {}) {
        for (const buttons of Array.from(document.getElementsByName(name)))
            if (buttons.checked)
                this.#currentChecked = buttons;
        this.#radioFunctions = perButton;
        this.#univFunction = universal;
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
            this.#univFunction(checkedButton);
            this.#radioFunctions[this.#currentChecked.value](this.#currentChecked);
            this.#radioFunctions[checkedButton.value](checkedButton);
            this.#currentChecked = checkedButton;
        }
    }
}
//#endregion

//#region Functions
/** @param {string} htmlString @param {HTMLSearch} removalMethod */
export function removeHTMLTag(htmlString, removalMethod = HTMLSearch.QUICK) {
    switch (removalMethod) {
        case HTMLSearch.PRECISE:
            dummyHTML.innerHTML = htmlString;
            return dummyHTML.textContent ?? '';
        case HTMLSearch.QUICK:
            return htmlString.replace(/(<([^>]+)>)/ig, '');
        default:
            console.warn('HTMLSearch unknown value.')
            return '';
    }
}

/** @param {number} min @param {number} max */
export function randInt(min, max) {                                          //Math.random() = [0...1)
    return Math.floor(Math.random() * (max - min)) + min;
}

/** @param {string} className @returns Null if no or multiple elements found. */
export function uniqueClassElement(className) {
    const output = Array.from(document.getElementsByClassName(className));
    return output.length == 1 ? output[0] : null;
}

/** @param {HTMLIFrameElement} iframeElement*/
export function reloadIFrame(iframeElement) {
    var temp = iframeElement.src;
    iframeElement.src = '';
    iframeElement.src = temp;
}

/** @param {string} path @returns [Path with no extension, extension] */
//lastIndexOf+slice > split+replace
export function splitExt(path) {
    //remove base url to prevent false positive
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
    const arrayOfArrays = iterables.map(arr => Array.from(arr))
    const maxlength = (extend ? Math.max : Math.min)(...arrayOfArrays.map(arr => arr.length))

    for (let index = 0; index < maxlength; index++) {
        var output = [];
        for (const item of arrayOfArrays)
            output.push(item[index])
        yield output
    }
}

/** @param {Iterable} iterable @returns index, value */
export function* enumerate(iterable) {
    var index = 0;
    for (const value of iterable)
        yield [index++, value];
}
//#endregion

//#region Trial
/** @param {Iterable} iterable */
function getIterator(iterable) {
    //if (iterable[Symbol.iterator]() === iterable)
    try {
        console.log(typeof(iterable), iterable);
        return iterable[Symbol.iterator]();
    } catch(err) {
        console.log(err, typeof(iterable), iterable);
        return null;
    }
}

/** @param {String} string @param {String} substring */
function stringToggle(string, substring) {
    return string.includes(substring) ? string.replace(substring, '') : string + substring;
}

//Needs to be per input
class ToggleCheck {
    #storedValue;

    constructor(initialValue) {
        this.#storedValue = initialValue;
    }

    isToggled(currentValue) {
        var bool = this.#storedValue != currentValue;
        this.#storedValue = currentValue;
        return bool;
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
//<button type="button" ></button>