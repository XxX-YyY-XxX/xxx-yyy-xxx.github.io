//importScripts('/univasset/scripts/externaljavascript.js')

/** @param {string} htmlString */
function nestedInclude(htmlString, params) {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");

    for (const include of Array.from(doc.getElementsByTagName('include'))) {
        fetch(include.getAttribute('src'))
            .then(response => response.text())
            .then(data => {
                var param = JSON.parse(include.getAttribute('param'));
                if (param !== null) {
                    data = getParams(data, param)
                }            
                //while (data.includes('</include>')) {
                //    data = nestedInclude(data);
                //}
                htmlString.replace(include.outerHTML, data);
            });
    }

    return htmlString;
}

/** @param {string} htmlString */
function getParams(htmlString, params) {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");

    for (const getparam of Array.from(doc.getElementsByTagName('getparam'))) {
        htmlString.replace(getparam.outerHTML, params[getparam.getAttribute('key')])
    }

    //nested parameter for include

    return htmlString;
}

for (const include of Array.from(document.getElementsByTagName('include'))) {
    fetch(include.getAttribute('src'))
        .then(response => response.text())
        .then(data => {
            //var param = JSON.parse(include.getAttribute('param'));
            //if (param !== null) {
            //    data = getParams(data, param)
            //}        
            //while (data.includes('</include>')) {
            //    data = nestedInclude(data, params);
            //}
            include.outerHTML = data;
        });
}

//<getparam key="0"></getparam>
//<include src="/univasset/scripts/mainpagebuttons.html" params="[]"></include>


/* function textFromHTMLString(html, target) {
    var fragment = document.createDocumentFragment();
    var container = document.createElement('div');
    container.innerHTML = html;
    fragment.appendChild(container);
    var targets = fragment.firstChild.getElementsByTagName(target),
        result = [];

    for (var i = 0, len = targets.length; i<len; i++) {
        result.push(targets[i].textContent || targets[i].innerText);
    }
    return result;        
}

var htmlString = '<html><head><title>Some title</title></head><body><p>Some text, in a paragraph!</p></body></html>';

console.log(textFromHTMLString(htmlString, 'title'));​ */


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