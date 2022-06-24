//#region Constants
const epsilon = 10 ** -10;
//#endregion

//#region Functions
/** @param {Array} subset @param {Array} mainset */
function IsSubsetOf(subset, mainset) {
    return subset.every(val => mainset.includes(val));
}

/** @param {string} htmlString */
function RemoveHTMLTag(htmlString) {                                        //May remove non-HTML <???> strings
    return htmlString.replace(/(<([^>]+)>)/ig, '');
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
    var index = path.lastIndexOf('.');
    return [path.slice(0, index), path.slice(index)]
}
//#endregion

//#region Generators
/** @param {boolean} extend @param {Iterable[]} iterables @returns "Tuple" of values from each array */
function* Zip(extend, ...iterables) {
    var arrayOfArrays = iterables.map(arr => Array.from(arr))

    //if (extend) {
    //    var maxlength = 0;
    //    var cap = Math.max;
    //} else {
    //    var maxlength = Number.POSITIVE_INFINITY;
    //    var cap = Math.min;
    //}

    var maxlength = (extend ? Math.max : Math.min)(...arrayOfArrays.map(arr => arr.length))

    //for (const item of iterables) {
    //    maxlength = cap(maxlength, item.length)
    //}

    for (let index = 0; index < maxlength; index++) {
        var output = [];
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