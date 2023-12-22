import {setattr} from "../basefunctions/index.js";
export const googleDocsCompilation = Embed.google;

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
    SPAN.toString = function() {return this.outerHTML};
    return SPAN;
}











export class Embed {
    static google(...namelinkpair) {
        const EMBED = "/preview?pli=1";
    
        const SELECT = document.createElement("select");
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
    };
}

export function img(link, alt = "Image", caption = {inline: false}) {
    const IMG = setattr(document.createElement("img"), {src: link, alt: alt, loading: "lazy"});

    if (typeof caption === "string") {
        const FIGURE = document.createElement("figure");
        const FIGCAPTION = document.createElement("figcaption");
        FIGCAPTION.textContent = caption;
        FIGURE.append(IMG, FIGCAPTION);

        FIGURE.toString = function() {return this.outerHTML}
        return FIGURE;
    } else if (caption.inline) {
        IMG.classList.add("inline-img");
    }
    IMG.toString = function() {return this.outerHTML}
    return IMG;
}
