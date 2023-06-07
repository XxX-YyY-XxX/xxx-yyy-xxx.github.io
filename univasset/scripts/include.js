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
*/

for (const INCLUDE of Array.from(document.querySelectorAll("include[src]"))) await includeDocument(INCLUDE);

/** @param {HTMLElement} include_elem */
async function includeDocument(include_elem) {
    const INCLUDE_DOC = await fetch(include_elem.getAttribute("src"))
        .then(response => response.text())
        .then(html => html.replace(/<!--(?!>)[\S\s]*?-->/g, ''))
        .then(cleantext => new DOMParser().parseFromString(cleantext, "text/html"))
        .catch(error => {console.error(error); return null});
    if (INCLUDE_DOC === null) return;

    const PARAM = new Map(Array.from(include_elem.attributes).map(({name, value}) => [name, value]));

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[key]")))
        INCLUDE.replaceWith(PARAM.get(INCLUDE.getAttribute("key")));

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[key-src]"))) {
        INCLUDE.setAttribute("src", PARAM.get(INCLUDE.getAttribute("key-src")));
        INCLUDE.removeAttribute("key-src");
    }

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[src]"))) {
        for (const {name, value} of Array.from(INCLUDE.attributes)) {
            if (name === "src") continue;
            else if (name.startsWith("key-")) {
                INCLUDE.setAttribute(name.replace("key-", ""), PARAM.get(value));
                INCLUDE.removeAttribute(name);
            } else console.log("Unknown pair:", name, value);
        }
    
        await includeDocument(INCLUDE);
    }

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include")))
        console.log("Wild include element found:", INCLUDE, "from", include_elem.getAttribute("src"));
    
    include_elem.replaceWith(...INCLUDE_DOC.body.childNodes);
}