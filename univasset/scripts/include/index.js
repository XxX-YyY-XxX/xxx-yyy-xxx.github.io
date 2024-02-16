/* 
    HTMLIncludeElement-specific events:
        replace: Executed when the `include` element has been replaced.
    ------------------------------------------------------------------------------------------------------------
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

// ChildNode.replaceWith() does not work with open tags.
const REPLACE_EVENT = new Event("replace");
/** @param {HTMLElement} include @param {...(string|Node)} values */
function replace(include, ...values) {
    const SUCCESS = Boolean(values.length);

    //----------------------------------------------------------------------

    include.replaceWith(...(SUCCESS ? values : include.childNodes))

    //----------------------------------------------------------------------

    Object.defineProperty(include, "success", {
        value: SUCCESS,
        enumerable: true
    });

    include.dispatchEvent(REPLACE_EVENT);

    //----------------------------------------------------------------------

    eval?.(include.getAttribute(SUCCESS ? "onreplace" : "ondefault") ?? "");
}

/**
 * @param {HTMLElement} include
 * @param {string} file_name Name of file where include element is taken. Used for error handling.
 * @param {number} depth File call depth. Could be used to prevent looping. */
async function includeDocument(include, file_name, depth = 0) {
    const SOURCE = include.getAttribute("src") ?? "";

    // if (SOURCE.endsWith(".html"))
    const DOCUMENT = await fetch(SOURCE)
        .then(response => response.ok ? response.text() : Promise.reject(`Missing ${SOURCE} in ${file_name}`))
        .then(html => html.replace(/<!--(?!>)[\S\s]*?-->/g, ""))                    //Remove comments
        .then(cleantext => new DOMParser().parseFromString(cleantext, "text/html"))
        .catch(error => {console.error(error); return null});
    if (!DOCUMENT) {
        replace(include);
        return;
    }

    const PARAM = new Map(Array.from(include.attributes).map(({name, value}) => [name, value]));
    
    for (const INCLUDE of DOCUMENT.querySelectorAll("include")) {
        // check if element satisfies "if", "ifnot"

        const KEY = INCLUDE.getAttribute("key");
        if (KEY !== null) {
            keyblock: {
                for (const NAME of KEY.split(" ")) {
                    const VALUE = PARAM.get(NAME);
                    if (VALUE === undefined) continue;
                    replace(INCLUDE, VALUE);
                    break keyblock;
                }
                replace(INCLUDE);    
            }
            continue;
        }

        const CHILD = INCLUDE.firstElementChild;
        if (Array.from(INCLUDE.attributes).some(x => x.name.startsWith("attr-")) && CHILD) {
            for (const {name, value} of INCLUDE.attributes) {
                const QUALIFIED = name.match(/attr-(\w+)/);
                if (!QUALIFIED) continue;
                const [, ATTRIBUTE] = QUALIFIED, VALUE = PARAM.get(value);
                if (VALUE !== undefined)    CHILD.setAttribute(ATTRIBUTE, VALUE);
                else                        console.warn("Parameter", value, "not found");
                INCLUDE.removeAttribute(name);
            }
            replace(INCLUDE, CHILD);
            continue;

            // https://stackoverflow.com/questions/41623353/queryselector-get-elements-where-attribute-starts-with-xxx
            // document.evaluate()
        }

        if (INCLUDE.hasAttribute("src") || INCLUDE.hasAttribute("param-src")) {
            for (const {name, value} of INCLUDE.attributes) {
                const QUALIFIED = name.match(/param-(\w+)/);
                if (!QUALIFIED) continue;
                const [, PARAMETER] = QUALIFIED;
                const VALUE = PARAM.get(value);
                if (VALUE !== undefined) {
                    // Element.setAttribute() cannot use numbers as qualifiedName.
                    try {INCLUDE.setAttribute(PARAMETER, VALUE)}
                    catch (e) {console.warn(e)}
                } else console.warn("Parameter", value, "not found");
                INCLUDE.removeAttribute(name);
            }
            
            //what if looping to itself/alternate looping/circular looping
            // file relativity
            await includeDocument(INCLUDE, SOURCE, depth + 1);
            continue;
        }
    }
    
    // console.log(file_name)
    replace(include, ...DOCUMENT.body.childNodes);
}

for (const INCLUDE of document.querySelectorAll("include[src]")) await includeDocument(INCLUDE, location.origin+location.pathname);
// document.dispatchEvent(REPLACEALL_EVENT);