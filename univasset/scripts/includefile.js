//HTML only for now
/** Parameter significance
    String  = replacement text value
    Number  = take parameter from parent include
    Array   = ???
    Boolean = ???
    Object  = change attribute of first child element, outwards progression for nested change
    Null    = use default value (<include key="0">Default Value</include>)
*/
//<include key="0"></include>
//<include src="/univasset/scripts/mainpagebuttons.html">0, "8"</include>

for (const include of Array.from(document.getElementsByTagName('include'))) {
    fetch(include.getAttribute('src'))
        .then(response => response.text())
        .then(data => nestedInclude(data, include.textContent))
        .then(html => {include.outerHTML = html;});
}

/** @param {string} htmlString @param {string} params */
function nestedInclude(htmlString, params) {
    //console.log('Before: ', htmlString);

    //Parameter setting
    if (params) {
        const strArr = JSON.parse(`[${params}]`);
        const doc = new DOMParser().parseFromString(htmlString, "text/html");

        for (const include of Array.from(doc.getElementsByTagName('include'))) {
            let key, childparam;

            if (key = include.getAttribute('key')) {
                //check if parameter is string, object, null
                console.log(typeof strArr[parseInt(key)], typeof strArr[parseInt(key)] == 'string');
                htmlString = htmlString.replace(include.outerHTML, strArr[parseInt(key)]);
            } else if (childparam = include.textContent) {
                //Untested
                let tempson = JSON.parse(`[${childparam}]`);

                for (let index = 0; index < tempson.length; index++) {
                    //what if number as a string?
                    if (Number.isInteger(tempson[index])) {
                        tempson[index] = strArr[tempson[index]];
                    }
                }

                let origOuter = include.outerHTML;
                include.textContent = JSON.stringify(tempson).slice(1, -1);
                htmlString = htmlString.replace(origOuter, include.outerHTML);
            } //else {No parameter calls}
        }
    }

    //console.log('During: ', htmlString);

    //Source fetching
    if (htmlString.includes('</include>')) {
        //Untested
        const doc = new DOMParser().parseFromString(htmlString, "text/html");

        for (const include of Array.from(doc.getElementsByTagName('include'))) {
            fetch(include.getAttribute('src'))
                .then(response => response.text())
                .then(data => nestedInclude(data, include.textContent))
                .then(html => {htmlString = htmlString.replace(include.outerHTML, html);});
        }
    }

    //console.log('After: ', htmlString);

    return htmlString;
}













//document.createElement('template');
//document.createDocumentFragment()





//<object name="styleheader" type="text/html" data="/univasset/styleheader.html"></object>
//<embed type="text/html" src="/univasset/styleheader.html">
//<!-- #include virtual="/univasset/styleheader.html" -->
//{% include /univasset/styleheader.html %}