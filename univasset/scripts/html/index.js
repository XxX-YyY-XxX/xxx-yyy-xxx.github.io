import {setattr} from "../basefunctions/index.js";

// /** @type {(keyof HTMLElementTagNameMap)[]} */
// export const STDHTMLELEMS = [];

export function googleDocsCompilation(...namelinkpair) {
    const EMBED = "/preview?pli=1";

    const SELECT = document.createElement("select");
    const BUTTON = setattr(document.createElement("button"), {textContent: "Source", type: "button"});
    const IFRAME = setattr(document.createElement("iframe"), {loading: "lazy"});

    SELECT.addEventListener("change", function(event) {IFRAME.src = SELECT.value + EMBED});
    BUTTON.addEventListener("click", function(event) {window.open(SELECT.value)});

    SELECT.append(...namelinkpair.map(([name, link]) => setattr(document.createElement("option"), {textContent: name, value: link})));
    IFRAME.src = namelinkpair[0][1] + EMBED;

    const DIV = setattr(document.createElement("div"), {classList: {add: ["google-docs-compilation"]}, append: [SELECT, BUTTON, document.createElement("br"), IFRAME]});
    DIV.toString = function() {
        /** @type {HTMLDivElement} */ const CLONE = this.cloneNode(true);

        CLONE.querySelector("select").setAttribute("onchange", "googleDocsCompilationSelect(this)");
        window.googleDocsCompilationSelect ??= /** @param {HTMLSelectElement} select */ function(select) {
            select.parentElement.querySelector("iframe").src = select.value + EMBED;
        }

        CLONE.querySelector("button").setAttribute("onclick", "googleDocsCompilationButton(this)");
        window.googleDocsCompilationButton ??= /** @param {HTMLButtonElement} button */ function(button) {
            window.open(button.previousElementSibling.value);
        }

        return CLONE.outerHTML;
    }
    return DIV
}

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
    SPAN.toString = function() {return this.outerHTML};
    return SPAN;
}

/** @param {string} link @param {string | "inline" | null} caption Image description or 'inline' for inline img. */
export function image(link, alt, caption = null) {
    const IMG = setattr(document.createElement("img"), {src: link, alt: alt, loading: "lazy"});

    switch (caption) {
        case null:
            return IMG;
        case "inline":
            IMG.classList.add("inline-img");
            return IMG;
        default:
            const FIGCAPTION = setattr(document.createElement("figcaption"), {textContent: caption});
            return setattr(document.createElement("figure"), {append: [IMG, FIGCAPTION]});
    }
}