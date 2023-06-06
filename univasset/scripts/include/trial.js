/* 
    key: parameter name whose value will replace this element
    src: url of file whose content will replace this element
*/

for (const include of Array.from(document.querySelectorAll("include[src]"))) await includeDocument(include);

/** @param {HTMLElement} include_elem */
async function includeDocument(include_elem) {
    // return error if path does not exist
    const include_document = await fetch(include_elem.getAttribute("src"))
        .then(response => response.text())
        .then(html => html.replace(/<!--(?!>)[\S\s]*?-->/g, ''))
        .then(cleantext => new DOMParser().parseFromString(cleantext, "text/html"));
    /** @type {Array} */ const parameters = JSON.parse("[" + include_elem.textContent + "]");

    for (const include of Array.from(include_document.querySelectorAll("include[key]"))) {
        const paramvalue = parameters[parseInt(include.getAttribute("key"))];

        switch (typeof paramvalue) {
            case "string":  //Replace include element with text.
                include.replaceWith(paramvalue);
                break;
            default:
                alert(typeof paramvalue, paramvalue, include);
                break;
        }
    }

    for (const include of Array.from(include_document.querySelectorAll("include[src]"))) {
        if (include.textContent) {
            /** @type {Array} */ let subparam = JSON.parse("[" + include.textContent + "]");
            subparam = subparam.map(x => Number.isInteger(x) ? parameters[x] : x);
            include.textContent = JSON.stringify(subparam).slice(1, -1);
        }

        await includeDocument(include);
    }
    
    include_elem.replaceWith(...include_document.body.childNodes);
}