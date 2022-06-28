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

//#region Functions
/** @param {Array} subset @param {Array} mainset */
export function IsSubsetOf(subset, mainset) {
    return subset.every(val => mainset.includes(val));
}

/** @param {string} htmlString @param {HTMLSearch} removalMethod */
export function RemoveHTMLTag(htmlString, removalMethod = HTMLSearch.QUICK) {
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
export function RandomInteger(min, max) {                                          //Math.random() = [0...1)
    return Math.floor(Math.random() * (max - min)) + min;
}

/** @param {string} className @returns Null if no or multiple elements found. */
export function UniqueClassElement(className) {
    const output = Array.from(document.getElementsByClassName(className));
    return output.length == 1 ? output[0] : null;
}

/** @param {HTMLElement} iframeElement*/
export function ReloadIFrame(iframeElement) {
    var temp = iframeElement.src;
    iframeElement.src = '';
    iframeElement.src = temp;
}

/** @param {string} path @returns Path with no extension, extension */
//lastIndexOf+slice > split+replace
export function SplitExt(path) {
    //remove base url to prevent false positive
    var index = path.lastIndexOf('.');
    return [path.slice(0, index), path.slice(index)]
}
//#endregion

//#region Generators
/** @param {boolean} extend @param {Iterable[]} iterables @returns "Tuple" of values from each array */
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

/** @param {Iterable} iterable*/
export function* Enumerate(iterable) {
    var index = 0;
    for (const value of iterable) {
        yield [index, value];
        index++;
    }
}
//#endregion








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

/* const fetchJson = async () => {
    try {
        const data = await fetch('/GFL/cards.json');
        questionCards = await data.json();  
    } catch (error) {
        console.log(error);
    }
};

fetchJson();*/

/* <!--script type="text/json" src="/GFL/cards.json"></script--> */

//iframe.contentWindow.location.reload();