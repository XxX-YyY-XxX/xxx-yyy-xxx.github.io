/* 
    src: URL of file whose content will replace this element
        <include src="" a="12" s="34"></include>

    key: Parent parameter whose value will replace this element
        <include key="s"></include>
        => 34
    
    onreplace: Executed when `include` element has successfully been replaced by its contents. Equivalent to "replace" event and success property true.
    ondefault: Executed when `include` element has been replaced by its default value. Equivalent to "replace" event and success property false.
    
    Default value is textContent value.

    HTMLIncludeElement-specific events:
        replace: Executed when the `include` element has been replaced.
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
    
    array
*/

//https://stackoverflow.com/questions/8401879/get-absolute-path-in-javascript
//https://stackoverflow.com/questions/14780350/convert-relative-path-to-absolute-using-javascript

// const REPLACEALL_EVENT = new Event("replaceall");

//#region Constants
const REPLACE_EVENT = new Event("replace");
//#endregion

for (const INCLUDE of Array.from(document.querySelectorAll("include[src]")).map(convert)) await includeDocument(INCLUDE, location.origin+location.pathname);
// document.dispatchEvent(REPLACEALL_EVENT);

/**
 * @param {HTMLIncludeElement} include
 * @param {string} file_name Name of file where include element is taken. Used for error handling.
 * @param {number} depth File call depth. Could be used to prevent looping. */
async function includeDocument(include, file_name, depth = 0) {
    const SOURCE = include.getAttribute("src") ?? "";
    const DOCUMENT = await fetch(SOURCE)
        .then(response => response.ok ? response.text() : Promise.reject(`Missing ${SOURCE} in ${file_name}`))
        .then(html => html.replace(/<!--(?!>)[\S\s]*?-->/g, ""))                    //Remove comments
        .then(cleantext => new DOMParser().parseFromString(cleantext, "text/html"))
        .catch(error => {console.error(error); return null});
    if (!DOCUMENT) {
        default_(include);
        return;
    }

    const PARAM = new Map(Array.from(include.attributes).map(({name, value}) => [name, value]));
    
    // for (const [INDEX, QUERY] of Object.entries(["include[if][ifnot]", "include[if]", "include[ifnot]", "include"]).map(/** @returns {[number, string]} */ ([a, b]) => [Number(a), b])) {
        
    // }

    for (const INCLUDE of Array.from(DOCUMENT.querySelectorAll("include")).map(convert)) {
        // check if element satisfies "if", "ifnot"

        const KEY = INCLUDE.getAttribute("key");
        if (KEY !== null) {
            const VALUE = PARAM.get(KEY);
            if (VALUE !== undefined)    load(INCLUDE, VALUE);
            else                        default_(INCLUDE);
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
    
    // console.log(file_name)
    load(include, ...DOCUMENT.body.childNodes);
}

// #region Setup
// ChildNode.replaceWith() does not work with open tags.

/** @param {HTMLIncludeElement} include @param {boolean} success */
function onReplace(include, success) {
    Object.defineProperty(include, "success", {
        value: success,
        enumerable: true
    });

    include.dispatchEvent(REPLACE_EVENT);

    //----------------------------------------------------------------------

    eval?.(include.getAttribute(success ? "onreplace" : "ondefault") ?? "");
}

/** @param {HTMLIncludeElement} include @param  {...(string|Node)} values */
function load(include, ...values) {
    include.replaceWith(...values);
    onReplace(include, true);
}

/** @param {HTMLIncludeElement} include */
function default_(include) {
    include.replaceWith(...include.childNodes);
    onReplace(include, false);
}

/** @param {HTMLElement} html_element @returns {HTMLIncludeElement} */
function convert(html_element) {
    // const MEMOIZE = {};

    return html_element;
}
// #endregion