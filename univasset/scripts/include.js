/* 
    src: url of file whose content will replace this element
        <include src="" a="12" s="34"></include>

    key: parameter qualifiedName whose value will replace this element
        <include key="s"></include>
        => 34

    param-???: change own qualifiedName to ???, current value is parameter qualifiedName, change value to value of parameter
        <include src="" param-z="a"></include>
        => <include src="" z="12"></include>

    ChildNode.replaceWith() does not work with open tags.
    object, array, boolean ???
*/

for (const INCLUDE of Array.from(document.querySelectorAll("include[src]"))) await includeDocument(INCLUDE, location.pathname);

/**
 * @param {HTMLElement} include_elem
 * @param {string} file_name Name of file where include element is taken. Used for error handling. */
async function includeDocument(include_elem, file_name) {
    const SOURCE = include_elem.getAttribute("src") ?? "";
    const INCLUDE_DOC = await fetch(SOURCE)
        .then(response => {
            if (response.ok) return response.text();
            return Promise.reject(`Missing ${SOURCE} in ${file_name}`);
        })
        .then(html => html.replace(/<!--(?!>)[\S\s]*?-->/g, ""))
        .then(cleantext => new DOMParser().parseFromString(cleantext, "text/html"))
        .catch(error => {console.error(error); return null});
    if (INCLUDE_DOC === null) {
        include_elem.replaceWith(...include_elem.childNodes);
        return;
    }

    const PARAM = new Map(Array.from(include_elem.attributes).map(({name, value}) => [name, value]));

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[key]"))) {
        const VALUE = PARAM.get(INCLUDE.getAttribute("key"));
        if (VALUE !== undefined)    INCLUDE.replaceWith(VALUE);
        else                        INCLUDE.replaceWith(...INCLUDE.childNodes);
    }

    //attr-??? where ??? is attribute of first child, value is parameter name

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include"))) {
        for (const {name, value} of Array.from(INCLUDE.attributes)) {
            if (name.startsWith("param-")) {
                //what if param key not found?
                INCLUDE.setAttribute(name.replace("param-", ""), PARAM.get(value));
                INCLUDE.removeAttribute(name);
            }
        }
    }
    
    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[src]")))
        await includeDocument(INCLUDE, SOURCE);

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include")))
        console.warn("Wild include element found:", INCLUDE, "from", SOURCE);
    
    include_elem.replaceWith(...INCLUDE_DOC.body.childNodes);
}