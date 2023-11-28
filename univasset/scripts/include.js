/* 
    src: url of file whose content will replace this element
        <include src="" a="12" s="34"></include>

    key: parent parameter whose value will replace this element
        <include key="s"></include>
        => 34
    
    ------------------------------------------------------------------------------------------------------------
    
    attr-???: change first child element's ??? attribute value to parameter value, must have a child element
        <include attr-href="s"><a></a></include> or <include attr-href="s"><a href="sample"></a></include>
        => <a href="34"></a>

        param-???: change own qualifiedName to ???, current value is parent parameter, change value to value of parameter
        <include src="" param-z="a"></include>
        => <include src="" z="12"></include>
    
    ChildNode.replaceWith() does not work with open tags.
    array, boolean ???
*/

for (const INCLUDE of Array.from(document.querySelectorAll("include[src]"))) await includeDocument(INCLUDE, location.pathname, 0);

/**
 * @param {HTMLElement} include_elem
 * @param {string} file_name Name of file where include element is taken. Used for error handling.
 * @param {number} depth File call depth. Could be used to prevent looping. */
async function includeDocument(include_elem, file_name, depth) {
    const SOURCE = include_elem.getAttribute("src") ?? "";
    const INCLUDE_DOC = await fetch(SOURCE)
        .then(response => response.ok ? response.text() : Promise.reject(`Missing ${SOURCE} in ${file_name}`))
        .then(html => html.replace(/<!--(?!>)[\S\s]*?-->/g, ""))                    //Remove comments
        .then(cleantext => new DOMParser().parseFromString(cleantext, "text/html"))
        .catch(error => {console.error(error); return null});
    if (!INCLUDE_DOC) {
        defaultValue(include_elem);
        return;
    }

    const PARAM = new Map(Array.from(include_elem.attributes).map(({name, value}) => [name, value]));

    // Key
    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[key]"))) {
        const VALUE = PARAM.get(INCLUDE.getAttribute("key"));
        if (VALUE !== undefined)    INCLUDE.replaceWith(VALUE);
        else                        defaultValue(INCLUDE);
    }

    //------------------------------------------------------------------------------------------------------------

    // https://stackoverflow.com/questions/41623353/queryselector-get-elements-where-attribute-starts-with-xxx
    // document.evaluate()

    //untested
    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include"))) {
        const CHILD = INCLUDE.firstElementChild;
        if (!CHILD) continue;

        for (const {name, value} of Array.from(INCLUDE.attributes)) {
            if (name.startsWith("attr-")) {
                const VALUE = PARAM.get(value);
                if (VALUE !== undefined)    CHILD.setAttribute(name.replace("attr-", ""), VALUE);
                else                        console.warn("Parameter", value, "called by", name, "not found");
            }
        }

        INCLUDE.replaceWith(CHILD);
    }

    //untested
    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include"))) {
        for (const {name, value} of Array.from(INCLUDE.attributes)) {
            if (name.startsWith("param-")) {
                const VALUE = PARAM.get(value);
                if (VALUE !== undefined)    INCLUDE.setAttribute(name.replace("param-", ""), VALUE);
                else                        console.warn("Parameter", value, "called by", name, "not found");
                INCLUDE.removeAttribute(name);
            }
        }
    }
    
    //untested
    //what if looping to itself/alternate looping/pass looping
    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[src]")))
        await includeDocument(INCLUDE, SOURCE, depth + 1);

    //untested
    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include")))
        console.warn("Wild include element found:", INCLUDE.outerHTML, "from", SOURCE);

    //------------------------------------------------------------------------------------------------------------
    
    include_elem.replaceWith(...INCLUDE_DOC.body.childNodes);
}

/** @param {HTMLElement} include_element */
function defaultValue(include_element) {
    include_element.replaceWith(...include_element.childNodes);
}