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

function includeFile(...docs) {
    if (docs) {document = docs[0]}
    
    for (const include of Array.from(document.getElementsByTagName('include'))) {
        //var params = JSON.parse(include.getAttribute('params'))
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

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
/* function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

var td = htmlToElement('<td>foo</td>'),
    div = htmlToElement('<div><span>nested</span> <span>stuff</span></div>');

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
/*function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

var rows = htmlToElements('<tr><td>foo</td></tr><tr><td>bar</td></tr>'); */


//<object name="styleheader" type="text/html" data="/univasset/styleheader.html"></object>
//<embed type="text/html" src="/univasset/styleheader.html">
//<!-- #include virtual="/univasset/styleheader.html" -->
//{% include /univasset/styleheader.html %}