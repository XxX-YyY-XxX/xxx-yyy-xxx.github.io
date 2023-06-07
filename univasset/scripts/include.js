/* 
    src: url of file whose content will replace this element
        <include src="" a="12" s="34"></include>

    key: parameter name whose value will replace this element
        <include key="s"></include>
        => 34

    key-???: change own name to ???, current value is parameter name, change value to value of parameter
        <include src="" key-z="a"></include>
        => <include src="" z="12"></include>

    ChildNode.replaceWith() does not work with open tags.
    object, array, boolean ???
*/

for (const INCLUDE of Array.from(document.querySelectorAll("include[src]"))) await includeDocument(INCLUDE);

/** @param {HTMLElement} include_elem */
async function includeDocument(include_elem) {
    const SOURCE = include_elem.getAttribute("src");
    const INCLUDE_DOC = await fetch(SOURCE)
        .then(response => {
            if (response.ok) return response.text();
            return Promise.reject(`File missing: ${SOURCE}`)})
        .then(html => html.replace(/<!--(?!>)[\S\s]*?-->/g, ""))
        .then(cleantext => new DOMParser().parseFromString(cleantext, "text/html"))
        .catch(error => {console.error(error); return null});
    if (INCLUDE_DOC === null) return;

    const PARAM = new Map(Array.from(include_elem.attributes).map(({name, value}) => [name, value]));

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[key]")))
        INCLUDE.replaceWith(PARAM.get(INCLUDE.getAttribute("key")));

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include"))) {
        for (const {name, value} of Array.from(INCLUDE.attributes)) {
            if (name.startsWith("key-")) {
                INCLUDE.setAttribute(name.replace("key-", ""), PARAM.get(value));
                INCLUDE.removeAttribute(name);
            }
        }
    }
    
    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[src]")))
        await includeDocument(INCLUDE);

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include")))
        console.log("Wild include element found:", INCLUDE, "from", SOURCE);
    
    include_elem.replaceWith(...INCLUDE_DOC.body.childNodes);
}