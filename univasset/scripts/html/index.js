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





// /** @type {(keyof HTMLElementTagNameMap)[]} */
// export const STDHTMLELEMS = [];


// const TextStyle = {
//     strike: text => textStyleGenerator(text, "del"),
//     italic: text => textStyleGenerator(text, "em"),
//     bold: text => textStyleGenerator(text, "strong"),
//     code: text => textStyleGenerator(text, "code"),
//     quote: text => textStyleGenerator(text, "blockquote"),
//     super: text => textStyleGenerator(text, "sup"),
// }

const TEXTSTYLE_CLASSES = {
    over: "overline"
}

export function textStyle(text, ...styles) {
    const SPAN = document.createElement("span");
    SPAN.textContent = text;
    SPAN.classList.add(...styles.map(x => "text-" + TEXTSTYLE_CLASSES[x]));
    SPAN.toString = htmlString;
    return SPAN;
}








export const Embed = {
    google(...namelinkpair) {
        const EMBED = "/preview?pli=1";
    
        const SELECT = setattr(document.createElement("select"), {disabled: namelinkpair.length === 1});
        const BUTTON = setattr(document.createElement("button"), {textContent: "Source", type: "button"});
        const IFRAME = setattr(document.createElement("iframe"), {loading: "lazy"});
    
        SELECT.addEventListener("change", function(event) {IFRAME.src = SELECT.value + EMBED});
        BUTTON.addEventListener("click", function(event) {window.open(SELECT.value)});
    
        SELECT.append(...namelinkpair.map(([name, link]) => setattr(document.createElement("option"), {textContent: name, value: link})));
        IFRAME.src = namelinkpair[0][1] + EMBED;
    
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
        const A = setattr(document.createElement("a"), {href: `https://twitter.com/${handle}/status/${ID}?ref_src=twsrc%5Etfw`, textContent: `${handle}'s Tweet`});
        return setattr(document.createElement("blockquote"), {toString: htmlString, appendChild: [A], classList: {add: ["twitter-tweet"]}});
    },
    youtube(ID) {
        const TEMP = {11: ID, 34: `videoseries?list=${ID}`}[ID.length];
        return setattr(document.createElement("iframe"), {src: `https://www.youtube.com/embed/${TEMP}`, loading: "lazy", allowFullscreen: true, toString: htmlString});
    }
}

export const googleDocsCompilation = Embed.google;

export const List = {
    unordered(...items) {
        const LI_ARRAY = items.map(x => setattr(document.createElement("li"), {append: [x]}));
        return setattr(document.createElement("ul"), {toString: htmlString, append: LI_ARRAY});
    }
}

export function image(src, alt, {type = null} = {}) {
    const IMG = setattr(document.createElement("img"), {src: src, alt: alt, loading: "lazy", toString: htmlString});

    switch (type) {
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
    const SUMMARY = setattr(document.createElement("summary"), {textContent: summary});
    return setattr(DETAILS, {append: [SUMMARY, content]});
}

export function fragment(...nodes) {
    return setattr(new DocumentFragment(), {append: nodes});
}

export function anchor(content, href) {
    return setattr(document.createElement("a"), {href: href, append: [content], toString: htmlString});
}







/** @param {Array} headerArray Nullable value @param {Array[]} arrayOfArrays */
export function table(headerArray, ...arrayOfArrays) {

    const THEAD = document.createElement("thead")
    const HEADER_TR = document.createElement("tr")
    HEADER_TR.append(...headerArray.map(x => setattr(document.createElement("th"), {append: [x]})))
    THEAD.appendChild(HEADER_TR)

    const TBODY = document.createElement("tbody")
    TBODY.append(...arrayOfArrays.map(array => setattr(document.createElement("tr"), {append: array.map(item => setattr(document.createElement("td"), {append: [item]}))})))
    
    
    
    return setattr(document.createElement("table"), {toString: htmlString, append: [THEAD, TBODY]});
}

















function slider(value, min, max, {vertical = false, name = ""} = {}) {
    const CHANGE = new Event("change");

    const RANGE = setattr(document.createElement("input"), {type: "range", min: min, max: max, value: value});
    RANGE.setAttribute("value", RANGE.value);
    RANGE.addEventListener("change", function(event) {this.setAttribute("value", this.value)});

    const MINUS = document.createElement("button");
    MINUS.textContent = "-";
    MINUS.addEventListener("click", function(event) {
        RANGE.value = Number(RANGE.value) - 1;
        RANGE.dispatchEvent(CHANGE);
    })

    const PLUS = document.createElement("button");
    PLUS.textContent = "+";
    PLUS.addEventListener("click", function(event) {
        RANGE.value = Number(RANGE.value) + 1;
        RANGE.dispatchEvent(CHANGE);
    })

    const DIV = document.createElement("div");
    DIV.append(MINUS, RANGE, PLUS)
    DIV.classList.add("slider")
    DIV.toString = function() {
        /** @type {HTMLDivElement} */ const CLONE = this.cloneNode(true);
        
        CLONE.querySelector("button:first-child").setAttribute("onclick", "sliderMinus(this)");
        window.sliderMinus ??= function(/**@type {HTMLButtonElement}*/button) {
            const SLIDER = button.nextElementSibling;
            SLIDER.value = Number(SLIDER.value) - 1;
            SLIDER.onchange();
        }

        CLONE.querySelector("input").setAttribute("onchange", "sliderSlide(this)");
        window.sliderSlide ??= function(/**@type {HTMLInputElement}*/input) {
            input.setAttribute("value", input.value);
        }

        CLONE.querySelector("button:last-child").setAttribute("onclick", "sliderPlus(this)");
        window.sliderPlus ??= function(/**@type {HTMLButtonElement}*/button) {
            const SLIDER = button.previousElementSibling;
            SLIDER.value = Number(SLIDER.value) + 1;
            SLIDER.onchange();
        }
    }
    return DIV;
}