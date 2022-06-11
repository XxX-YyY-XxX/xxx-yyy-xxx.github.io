const epsilon = 10 ** -10;

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
function SplitExt(path) {
    var list = path.split('.');
    var extension = `.${list[list.length - 1]}`
    return [path.replace(extension, ''), extension]
}

/*if (typeof(Storage) !== "undefined") {
    sessionStorage.outputCards = boxes;
} else {
    sessionStorage.outputCards = "Sorry, your browser does not support web storage...";
} */            

//fetch('/GFL/cards.json').then(response => response.json()).then(file => questionCards = file);

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