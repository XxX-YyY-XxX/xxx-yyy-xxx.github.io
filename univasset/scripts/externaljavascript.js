//#region Constants
/** Close to zero value. */
const epsilon = 10 ** -10;
/** Reusable element for offscreen DOM. */
const dummyHTML = new Document().createElement('template');
//#endregion

//#region Enumerators
/** For HTML tag removal. */
class HTMLSearch {
    /** @property Uses regex for quick and dirty searches. */
    static QUICK = 0
    /** @property Uses HTML parsing for precise element matching. */
    static PRECISE = 1
}
//#endregion

//#region Functions
/** @param {Array} subset @param {Array} mainset */
function IsSubsetOf(subset, mainset) {
    return subset.every(val => mainset.includes(val));
}

/** @param {string} htmlString @param {HTMLSearch} removalMethod */
function RemoveHTMLTag(htmlString, removalMethod = HTMLSearch.QUICK) {
    dummyHTML.innerHTML = htmlString;
    console.log(dummyHTML.textContent);
    switch (removalMethod) {
        case HTMLSearch.PRECISE:
            dummyHTML.innerHTML = htmlString;
            return dummyHTML.textContent ?? '';
        case HTMLSearch.QUICK:
            return htmlString.replace(/(<([^>]+)>)/ig, '');
        default:
            return '';
    }
}

/** @param {number} min @param {number} max */
function RandomInteger(min, max) {                                          //Math.random() = [0...1)
    return Math.floor(Math.random() * (max - min)) + min;
}

/** @param {string} className @returns Null if no or multiple elements found. */
function UniqueClassElement(className) {
    const output = Array.from(document.getElementsByClassName(className));
    return output.length == 1 ? output[0] : null;
}

/** @param {HTMLElement} iframeElement*/
function ReloadIFrame(iframeElement) {
    var temp = iframeElement.src;
    iframeElement.src = '';
    iframeElement.src = temp;
}

/** @param {string} path @returns Path with no extension, extension */
//lastIndexOf+slice > split+replace
function SplitExt(path) {
    //remove base url to prevent false positive
    var index = path.lastIndexOf('.');
    return [path.slice(0, index), path.slice(index)]
}
//#endregion

//#region Generators
/** @param {boolean} extend @param {Iterable[]} iterables @returns "Tuple" of index and values from each array */
function* Zip(extend, ...iterables) {
    const arrayOfArrays = iterables.map(arr => Array.from(arr))
    const maxlength = (extend ? Math.max : Math.min)(...arrayOfArrays.map(arr => arr.length))

    for (let index = 0; index < maxlength; index++) {
        var output = [index];
        for (const item of arrayOfArrays) {
            output.push(item[index])
        }
        yield output
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

//import questionCards from '/GFL/cards.json';
//questionCards = JSON.parse(questionCards);

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