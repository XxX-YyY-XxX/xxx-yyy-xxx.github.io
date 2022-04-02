const epsilon = 10 ** -10;

function IsSubsetOf(subset, mainset) {
    return subset.every(val => mainset.includes(val));
}

function RemoveHTMLTag(string) {
    return string.replace(/(<([^>]+)>)/ig, '');
}

function RandomInteger(start, end) {
    const range = end - start - epsilon;
    return start + Math.floor(Math.random() * range);
}

//replace(/ /g, ' + ');

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