import { setattr } from "../basefunctions/index.js";

export function googleDocsCompilation(...namelinkpair) {
    const EMBED = "/preview?pli=1";

    const SELECT = document.createElement("select");
    const BUTTON = setattr(document.createElement("button"), {textContent: "Source", type: "button"});
    const IFRAME = setattr(document.createElement("iframe"), {loading: "lazy"});

    SELECT.addEventListener("change", function(event) {IFRAME.src = SELECT.value + EMBED});
    BUTTON.addEventListener("click", function(event) {window.open(SELECT.value)});

    SELECT.append(...namelinkpair.map(([name, link]) => setattr(document.createElement("option"), {textContent: name, value: link})));
    IFRAME.src = namelinkpair[0][1] + EMBED;

    var out = setattr(document.createElement("div"), {classList: {add: ["google-docs-compilation"]}, append: [SELECT, BUTTON, document.createElement("br"), IFRAME]});
    console.log("outerHTML:", out.outerHTML)
    console.log("toString():", out.toString())
    return out
}
