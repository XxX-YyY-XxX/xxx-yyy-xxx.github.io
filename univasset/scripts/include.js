/* 
    src: url of file whose content will replace this element
        <include src="" a="12" s="34"></include>

    key: parent parameter whose value will replace this element
        <include key="s"></include>
        => 34
    
    Default value is textContent value.

    HTMLIncludeElement-specific events:
        replace: Runs when the element has been successfully replaced by its contents.
    ------------------------------------------------------------------------------------------------------------
    
    attr-???: change first child element's ??? attribute value to parameter value, must have a child element
        <include attr-href="s"><a></a></include> or <include attr-href="s"><a href="sample"></a></include>
        => <a href="34"></a>

    param-???: change own qualifiedName to ???, current value is parent parameter, change value to value of parameter
        <include src="" param-z="a"></include>
        => <include src="" z="12"></include>
    
    if: execute if parameter is present
        <include if="a" key="s"></include>
        => 34

    ifnot: execute if parameter is not present
        <include ifnot="f" key="s"></include>
        => 34
    
    load or onreplace: ???

    ChildNode.replaceWith() does not work with open tags.
    array
*/

const REPLACE_EVENT = new Event("replace");
// const REPLACEALL_EVENT = new Event("replaceall");

for (const INCLUDE of Array.from(document.querySelectorAll("include[src]")).map(convert)) await includeDocument(INCLUDE, location.pathname);
// document.dispatchEvent(REPLACEALL_EVENT);

/**
 * @param {HTMLIncludeElement} include_elem
 * @param {string} file_name Name of file where include element is taken. Used for error handling.
 * @param {number} depth File call depth. Could be used to prevent looping. */
async function includeDocument(include_elem, file_name, depth = 0) {
    const SOURCE = include_elem.src ?? "";
    const INCLUDE_DOC = await fetch(SOURCE)
        .then(response => response.ok ? response.text() : Promise.reject(`Missing ${SOURCE} in ${file_name}`))
        .then(html => html.replace(/<!--(?!>)[\S\s]*?-->/g, ""))                    //Remove comments
        .then(cleantext => new DOMParser().parseFromString(cleantext, "text/html"))
        .catch(error => {console.error(error); return null});
    if (!INCLUDE_DOC) {
        include_elem.default();
        return;
    }

    const PARAM = new Map(Array.from(include_elem.attributes).map(({name, value}) => [name, value]));
    
    // for (const [INDEX, QUERY] of Object.entries(["include[if][ifnot]", "include[if]", "include[ifnot]", "include"]).map(/** @returns {[number, string]} */ ([a, b]) => [Number(a), b])) {
        
    // }

    for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include")).map(convert)) {
        // check if element satisfies "if", "ifnot"

        // Key
        if (INCLUDE.key !== null) {
            const VALUE = PARAM.get(INCLUDE.key);
            if (VALUE !== undefined)    INCLUDE.replaceWith(VALUE);
            else                        INCLUDE.default();
            continue;
        }

        // https://stackoverflow.com/questions/41623353/queryselector-get-elements-where-attribute-starts-with-xxx
        // document.evaluate()

        //untested
        // for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include")).filter(({attributes}) => Array.from(attributes).some(({name}) => name.startsWith("attr-")))) {
        //     const CHILD = INCLUDE.firstElementChild;
        //     if (!CHILD) continue;

        //     for (const {name, value} of Array.from(INCLUDE.attributes)) {
        //         if (name.startsWith("attr-")) {
        //             const VALUE = PARAM.get(value);
        //             if (VALUE !== undefined)    CHILD.setAttribute(name.replace("attr-", ""), VALUE);
        //             else                        console.warn("Parameter", value, "called by", name, "not found");
        //         }
        //     }

        //     INCLUDE.replaceWith(CHILD);
        // }

        //untested
        // for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include"))) {
        //     for (const {name, value} of Array.from(INCLUDE.attributes)) {
        //         if (name.startsWith("param-")) {
        //             const VALUE = PARAM.get(value);
        //             if (VALUE !== undefined)    INCLUDE.setAttribute(name.replace("param-", ""), VALUE);
        //             else                        console.warn("Parameter", value, "called by", name, "not found");
        //             INCLUDE.removeAttribute(name);
        //         }
        //     }
        // }
        
        //untested
        //what if looping to itself/alternate looping/pass looping
        // for (const INCLUDE of Array.from(INCLUDE_DOC.querySelectorAll("include[src]")))
        //     await includeDocument(INCLUDE, SOURCE, depth + 1);

    }

    //untested
    // for (const {outerHTML} of INCLUDE_DOC.querySelectorAll("include")) console.warn("Unparsed include element found:", outerHTML, "from", SOURCE);
    
    include_elem.replaceWith(...INCLUDE_DOC.body.childNodes);
    include_elem.dispatchEvent(REPLACE_EVENT);
    // onreplace event

    console.log(file_name)
    console.log(PARAM.get("onreplace"))
    console.log(include_elem.getAttribute("onreplace"))
    // eval()
}

// #region Setup
class HTMLIncludeElement extends HTMLElement {
    /** @returns {string | null} */
    get src() {};

    /** @returns {string | null} */
    get key() {};

    /** Replace self with child node. */
    default() {}

    // onreplace() {}

    // is() {}
}

/** @param {HTMLElement} html_element @returns {HTMLIncludeElement} */
function convert(html_element) {
    const MEMOIZE = {};

    Object.defineProperty(html_element, "src", {
        get: function() {return MEMOIZE.src ??= this.getAttribute("src")},
        enumerable: true
    });

    Object.defineProperty(html_element, "key", {
        get: function() {return MEMOIZE.key ??= this.getAttribute("key")},
        enumerable: true
    });

    Object.defineProperty(html_element, "default", {
        value: function() {
            console.warn(this.outerHTML, "is invalid.");
            this.replaceWith(...this.childNodes);
        },
        enumerable: true
    });

    return html_element;
}
// #endregion