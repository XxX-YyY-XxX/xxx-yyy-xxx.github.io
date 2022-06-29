//#region Constants
/** Close to zero value. */
const epsilon = 10 ** -10;
/** Reusable element for offscreen DOM. */
const dummyHTML = new DOMParser().parseFromString('', 'text/html').body;
//#endregion

/** @param {Array} mainArray */
Array.prototype.subsetOf = function(mainArray) {
    return this.every(val => mainArray.includes(val));
}

//#region Enumerators
/** For HTML tag removal. */
export class HTMLSearch {
    /** @property Uses regex for quick and dirty searches. */
    static QUICK = 0;
    /** @property Uses HTML parsing for precise element matching. */
    static PRECISE = 1;
}
//#endregion

//#region Functions
/** @param {Array} subset @param {Array} mainset */
export function isSubsetOf(subset, mainset) {
    return subset.every(val => mainset.includes(val));
}

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

/** @param {HTMLElement} iframeElement*/
export function reloadIFrame(iframeElement) {
    var temp = iframeElement.src;
    iframeElement.src = '';
    iframeElement.src = temp;
}

/** @param {string} path @returns Path with no extension, extension */
//lastIndexOf+slice > split+replace
export function splitExt(path) {
    //remove base url to prevent false positive
    var index = path.lastIndexOf('.');
    return [path.slice(0, index), path.slice(index)]
}
//#endregion

//#region Generators
/** @param {boolean} extend true to extend, false to clip
 * @param {Iterable[]} iterables order of iterables = order of output
 * @returns "Tuple" of values from each array */
export function* Zip(extend, ...iterables) {
    const arrayOfArrays = iterables.map(arr => Array.from(arr))
    const maxlength = (extend ? Math.max : Math.min)(...arrayOfArrays.map(arr => arr.length))

    for (let index = 0; index < maxlength; index++) {
        var output = [];
        for (const item of arrayOfArrays)
            output.push(item[index])
        yield output
    }
}

/** @param {Iterable} iterable @returns index, value*/
export function* Enumerate(iterable) {
    var index = 0;
    for (const value of iterable) {
        yield [index, value];
        index++;
    }
}
//#endregion

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






/*if (typeof(Storage) !== "undefined") {
    sessionStorage.outputCards = boxes;
} else {
    sessionStorage.outputCards = "Sorry, your browser does not support web storage...";
} */            

/*var oXHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
oXHR.onreadystatechange = function() {
    if (oXHR.readyState === 4 && oXHR.status == 200)
        questionCards = JSON.parse(this.responseText);
};
oXHR.overrideMimeType("application/json");
oXHR.open("GET", "/GFL/cards.json", true);          // true = ASYNCHRONOUS REQUEST (DESIRABLE), false = SYNCHRONOUS REQUEST.
oXHR.send(); */

//iframe.contentWindow.location.reload();