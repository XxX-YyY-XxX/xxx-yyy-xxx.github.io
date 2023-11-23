import {setattr} from "../basefunctions/index.js";

export const STDHTMLELEMS = [];

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