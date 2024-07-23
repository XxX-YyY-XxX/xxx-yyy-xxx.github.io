import {setattr} from "../basefunctions/index.js";

/** @this {HTMLElement} */
function htmlString() {
    var output = this.outerHTML;
    for (const ELEMENT of this.children) {
        const STRVAR = ELEMENT.toString();
        if (STRVAR.startsWith("[")) continue;
        output = output.replace(ELEMENT.outerHTML, STRVAR)
    }
    return output;
}

const TEXTSTYLE_CLASSES = Object.freeze({
    over: "overline",
    strike: "strikethrough",
    super: "superscript",
    bold: "bold",
    italic: "italic"
})
export function textStyle(text, ...styles) {
    const SPAN = setattr(document.createElement("span"), {textContent: text, toString: htmlString});
    SPAN.classList.add(...styles.map(x => "text-" + TEXTSTYLE_CLASSES[x]));
    return SPAN;
}

// export function code(x) {
//     return setattr(document.createElement("code"), {append: [x]})
// }

export const Embed = {
    google(...namelinkpair) {
        const EMBED = "/preview?pli=1";
    
        const SELECT = setattr(document.createElement("select"), {disabled: namelinkpair.length === 1});
        const BUTTON = setattr(document.createElement("button"), {textContent: "Source", type: "button"});
        const IFRAME = frame(namelinkpair[0][1] + EMBED);

        SELECT.addEventListener("change", function(event) {IFRAME.src = SELECT.value + EMBED});
        BUTTON.addEventListener("click", function(event) {window.open(SELECT.value)});
    
        SELECT.append(...namelinkpair.map(([name, link]) => setattr(document.createElement("option"), {textContent: name, value: link})));
    
        const DIV = setattr(document.createElement("div"), {classList: {add: ["embed-google"]}, append: [SELECT, BUTTON, document.createElement("br"), IFRAME]});
        DIV.toString = function() {
            /** @type {HTMLDivElement} */ const CLONE = this.cloneNode(true);
    
            CLONE.querySelector("select").setAttribute("onchange", "embedGoogleSelect(this)");
            window.embedGoogleSelect ??= function(/**@type {HTMLSelectElement}*/select) {
                select.parentElement.querySelector("iframe").src = select.value + EMBED;
            }
    
            CLONE.querySelector("button").setAttribute("onclick", "embedGoogleButton(this)");
            window.embedGoogleButton ??= function(/**@type {HTMLButtonElement}*/button) {
                window.open(button.previousElementSibling.value);
            }
    
            return CLONE.outerHTML;
        }
        return DIV;
    },
    twitter(handle, ID) {
        return setattr(document.createElement("blockquote"), {
            appendChild: [anchor(`${handle}'s Tweet`, `https://twitter.com/${handle}/status/${ID}`)],
            classList: {add: ["twitter-tweet"]},
            toString: htmlString
        });
    },
    youtube(ID) {
        const TEMP = {11: ID, 34: `videoseries?list=${ID}`}[ID.length];
        return setattr(frame(`https://www.youtube.com/embed/${TEMP}`), {allow: "fullscreen", toString: htmlString});
    },
    streamable(ID) {
        return setattr(frame(`https://streamable.com/e/${ID}`), {allow: "fullscreen", toString: htmlString});
    },
    reddit(ID) {
        if (false) {
            // <blockquote class="reddit-embed-bq" style="height:316px" data-embed-showmedia="false" data-embed-theme="dark" data-embed-height="240">
            //     <a href="https://www.reddit.com/r/girlsfrontline/comments/w2n556/weekly_commanders_lounge_july_19_2022/">Weekly Commanders Lounge - July 19, 2022</a><br> by<a href="https://www.reddit.com/user/AutoModerator/">u/AutoModerator</a> in<a href="https://www.reddit.com/r/girlsfrontline/">girlsfrontline</a>
            // </blockquote>
            // <script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>
        } else {
            // <blockquote class="reddit-embed-bq" data-embed-theme="dark" data-embed-height="240">
            //     <a href="https://www.reddit.com/r/girlsfrontline/comments/w2n556/comment/igti9c1/">Comment</a><br> by<a href="https://www.reddit.com/user/AutoModerator/">u/AutoModerator</a> from discussion<a href="https://www.reddit.com/r/girlsfrontline/comments/w2n556/weekly_commanders_lounge_july_19_2022/"><no value=""></no></a><br> in<a href="https://www.reddit.com/r/girlsfrontline/">girlsfrontline</a>
            // </blockquote>
            // <script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

            return setattr(frame(`https://www.redditmedia.com/r/girlsfrontline/comments/${ID}/?depth=1&embed=true&showmedia=true&theme=dark`), {
                sandbox: {add: ["allow-scripts", "allow-same-origin", "allow-popups"]},
                toString: htmlString,
                id: "reddit-embed"
            })
        }
    }
}
export const googleDocsCompilation = Embed.google;

function listItem(x) {
    return setattr(document.createElement("li"), {append: [x], toString: htmlString});
}

export const List = {
    ordered(...items) {
        return setattr(document.createElement("ol"), {append: items.map(listItem), toString: htmlString});
    },
    unordered(...items) {
        return setattr(document.createElement("ul"), {append: items.map(listItem), toString: htmlString});
    },
    menu() {},
    description(arraydict) {
        const DL = setattr(document.createElement("dl"), {toString: htmlString});
        for (const [TITLE, DESCS] of Object.entries(arraydict)) {
            DL.append(
                setattr(document.createElement("dt"), {textContent: TITLE}),
                ...DESCS.map(x => setattr(document.createElement("dd"), {append: [x], toString: htmlString}))
            );
        }
        return DL;
    }
}

export function image(src, alt, {mode = null} = {}) {
    const IMG = setattr(document.createElement("img"), {src: src, alt: alt, loading: "lazy", toString: htmlString});

    switch (mode) {
        case "inline":
            IMG.classList.add("inline-img");
            break;
    }

    return IMG;
}

export function figure(content, caption) {
    const FIGCAPTION = setattr(document.createElement("figcaption"), {append: [caption]});
    const FIGURE = setattr(document.createElement("figure"), {toString: htmlString});
    return setattr(FIGURE, {append: [content, FIGCAPTION]});
}

export function details(summary, content) {
    const DETAILS = setattr(document.createElement("details"), {toString: htmlString});
    const SUMMARY = setattr(document.createElement("summary"), {append: [summary]});
    return setattr(DETAILS, {append: [SUMMARY, content]});
}

export function fragment(...nodes) {
    return setattr(new DocumentFragment(), {append: nodes});
}

export function anchor(content, href, {mode = null, data = {}} = {}) {
    const ANCHOR = setattr(document.createElement("a"), {append: [content], href: href});

    switch (mode) {
        case "history":
            const EVENT = new PopStateEvent("popstate", {state: data});
            ANCHOR.addEventListener("click", event => {
                // encode htref to uri?
                history.pushState(data, "", href);
                window.dispatchEvent(EVENT);
                event.preventDefault(); // Needed to prevent refresh.
            });
            ANCHOR.toString = function() {            
                /** @type {HTMLAnchorElement} */ const CLONE = this.cloneNode(true);

                // Important when changed to string HTML. Event listener and closures not carried over.
                if (Object.keys(data).length)
                    CLONE.dataset.data = JSON.stringify(data);
                CLONE.setAttribute("onclick", "return anchorHistoryClick(this)");
                window.anchorHistoryClick ??= function(/** @type {HTMLAnchorElement} */a) {
                    const DATA = JSON.parse(a.dataset.data ?? "{}");
                    history.pushState(DATA, "", a.href);
                    window.dispatchEvent(new PopStateEvent("popstate", {state: DATA}));
                    return false;   // Needed to prevent refresh.
                }

                return htmlString.call(CLONE);
            }
            return ANCHOR;
        default:
            return setattr(ANCHOR, {toString: htmlString});
    }
}

export function table(headers, ...arrays) {
    const HEADERS = headers.map(x => setattr(document.createElement("th"), {append: [x]}));
    const HEADER_TR = setattr(document.createElement("tr"), {append: HEADERS});
    const THEAD = setattr(document.createElement("thead"), {appendChild: [HEADER_TR]});

    const TR_ARRAY = arrays.map(array => setattr(document.createElement("tr"), {
        toString: htmlString,
        append: array.map(item => setattr(document.createElement("td"), {append: [item], toString: htmlString}))
    }));
    const TBODY = setattr(document.createElement("tbody"), {append: TR_ARRAY});
    
    return setattr(document.createElement("table"), {toString: htmlString, append: [THEAD, TBODY]});
}

const CHANGE = new Event("change");
export function slider(initial_value, min, max, {vertical = false} = {}) {
    const RANGE = setattr(document.createElement("input"), {type: "range", min: min, max: max, value: initial_value});
    RANGE.setAttribute("value", RANGE.value);
    RANGE.addEventListener("change", function(event) {this.setAttribute("value", this.value)});

    const MINUS = setattr(document.createElement("button"), {type: "button", textContent: "-"});
    MINUS.addEventListener("click", function(event) {
        RANGE.value = Number(RANGE.value) - 1;
        RANGE.dispatchEvent(CHANGE);
    })

    const PLUS = setattr(document.createElement("button"), {type: "button", textContent: "+"});
    PLUS.addEventListener("click", function(event) {
        RANGE.value = Number(RANGE.value) + 1;
        RANGE.dispatchEvent(CHANGE);
    })

    const DIV = setattr(document.createElement("div"), {append: [MINUS, RANGE, PLUS], classList: {add: ["slider", vertical ? "vertical" : "horizontal"]}});
    DIV.toString = function() {
        /** @type {HTMLDivElement} */ const CLONE = this.cloneNode(true);
        
        CLONE.querySelector("input").setAttribute("onchange", "sliderRangeInput(this)");
        window.sliderRangeInput ??= function(/**@type {HTMLInputElement}*/input) {
            input.setAttribute("value", input.value);
        }

        CLONE.querySelector("button:first-child").setAttribute("onclick", "sliderMinusButton(this)");
        window.sliderMinusButton ??= function(/**@type {HTMLButtonElement}*/button) {
            const SLIDER = button.nextElementSibling;
            SLIDER.value = Number(SLIDER.value) - 1;
            SLIDER.onchange();
        }

        CLONE.querySelector("button:last-child").setAttribute("onclick", "sliderPlusButton(this)");
        window.sliderPlusButton ??= function(/**@type {HTMLButtonElement}*/button) {
            const SLIDER = button.previousElementSibling;
            SLIDER.value = Number(SLIDER.value) + 1;
            SLIDER.onchange();
        }

        return CLONE.outerHTML;
    }
    return DIV;
}

function frame(src) {
    return setattr(document.createElement("iframe"), {src: src, loading: "lazy"});
}