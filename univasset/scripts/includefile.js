//importScripts('/univasset/scripts/externaljavascript.js')

for (const include of Array.from(document.getElementsByTagName('include'))) {
    fetch(include.getAttribute('src'))
        .then(response => response.text())
        .then(data => data.includes('</include>') ? nestedTags(data, include.getAttribute('param')) : data)
        .then(html => {
            console.log(html.includes('</include>'));
            include.outerHTML = html;});
}
















/** @param {string} htmlString @param {string} params */
function nestedTags(htmlString, params) {
    var doc = new DOMParser().parseFromString(htmlString, "text/html");

    //Parameter setting
    if (params != null) {
        const json = JSON.parse(params);
        for (const include of Array.from(doc.getElementsByTagName('include'))) {
            let key, param;

            if ((key = include.getAttribute('key')) != null) {
                htmlString.replace(include.outerHTML, json[parseInt(key)])
            } else if ((param = include.getAttribute('param')) != null) {
                let tempson = JSON.parse(param);

                for (let index = 0; index < tempson.length; index++) {
                    if (Number.isInteger(tempson[index])) {
                        tempson[index] = json[tempson[index]];
                    }
                }

                let tempstr = include.outerHTML;
                include.param = JSON.stringify(tempson);
                htmlString.replace(tempstr, include.outerHTML);
            }
        }
    }

    //Nested include src

    return htmlString;
}





//<include key="0"></include>
//<include src="/univasset/scripts/mainpagebuttons.html" param="[0, '8']"></include>










/** @param {string} htmlString */
function nestedInclude(htmlString, params) {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");

    for (const include of Array.from(doc.getElementsByTagName('include'))) {
        fetch(include.getAttribute('src'))
            .then(response => response.text())
            .then(data => {
                var param = JSON.parse(include.getAttribute('param'));
                if (param != null) {
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