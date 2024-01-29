import {setattr} from "../basefunctions/index.js";

/** @this {HTMLElement} */
function htmlString() {
    var output = this.outerHTML;

    for (const ELEMENT of this.children) {
        if (ELEMENT.toString().startsWith("[")) continue;
        output = output.replace(ELEMENT.outerHTML, ELEMENT.toString())
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
            window.embedGoogleSelect ??= /** @param {HTMLSelectElement} select */ function(select) {
                select.parentElement.querySelector("iframe").src = select.value + EMBED;
            }
    
            CLONE.querySelector("button").setAttribute("onclick", "embedGoogleButton(this)");
            window.embedGoogleButton ??= /** @param {HTMLButtonElement} button */ function(button) {
                window.open(button.previousElementSibling.value);
            }
    
            return CLONE.outerHTML;
        }
        return DIV;
    }
}

export const googleDocsCompilation = Embed.google;

export function image(link, alt, {type = null} = {}) {
    const IMG = setattr(document.createElement("img"), {src: link, alt: alt, loading: "lazy", toString: htmlString});

    switch (type) {
        case "inline":
            IMG.classList.add("inline-img");
            break;
    }

    return IMG;
}

export function figure(content, caption) {
    const FIGCAPTION = setattr(document.createElement("figcaption"), {textContent: caption});
    const FIGURE = setattr(document.createElement("figure"), {toString: htmlString});
    return setattr(FIGURE, {append: [content, FIGCAPTION]});
}

export function details(summary, content) {
    const DETAILS = setattr(document.createElement("details"), {toString: htmlString});
    const SUMMARY = setattr(document.createElement("summary"), {textContent: summary});
    return setattr(DETAILS, {append: [SUMMARY, content]});
}








/**
 * 
 * @param {(string | Node)[]} text 
 * @param {string} link 
 * @returns 
 */
function anchor(text, link, {target = ""} = {}) {
    const A = document.createElement("a")
    A.href = link
    A.append(text)
    return A
}