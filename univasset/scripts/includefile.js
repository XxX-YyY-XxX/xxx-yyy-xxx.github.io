//importScripts('/univasset/scripts/externaljavascript.js')

function nestedInclude() {
    //Add "include inside of include"/ Nested includes
}

function getParams() {
    /*         params = include.getAttribute('params');
        if (params) {
            paramsList = params.split(',')
        }
 */
}

function includeFile() {
    //if (document) {document = document}
    for (const include of Array.from(document.getElementsByTagName('include'))) {
        //params attribute
        fetch(include.getAttribute('src'))
            .then(response => response.text())
            .then(data => {
                //Check for nested include and params
                include.outerHTML = data;
            });
    }
}

includeFile();


/* function textFromHTMLString(html, target) {
    if (!html || !target) {
        return false;
    }
    else {
        var fragment = document.createDocumentFragment(),
            container = document.createElement('div');
        container.innerHTML = html;
        fragment.appendChild(container);
        var targets = fragment.firstChild.getElementsByTagName(target),
            result = [];

        for (var i = 0, len = targets.length; i<len; i++) {
            result.push(targets[i].textContent || targets[i].innerText);
        }
        return result;        
    }
}

var htmlString = '<html><head><title>Some title</title></head><body><p>Some text, in a paragraph!</p></body></html>';

var titleText = textFromHTMLString(htmlString, 'title');

console.log(titleText);​ */

/* function htmlDecode(input) {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
} */


//<object name="styleheader" type="text/html" data="/univasset/styleheader.html"></object>
//<embed type="text/html" src="/univasset/styleheader.html">
//<!-- #include virtual="/univasset/styleheader.html" -->
//{% include /univasset/styleheader.html %}