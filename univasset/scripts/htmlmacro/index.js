import { setattr } from "../basefunctions";

export function googleDocsCompilation(...namelinkpair) {
    const EMBED = "/preview?pli=1";

    const SELECT = document.createElement("select");
    const BUTTON = setattr(document.createElement("button"), {textContent: "Source", type: "button"});
    const IFRAME = setattr(document.createElement("iframe"), {loading: "lazy"});

    SELECT.addEventListener("change", function(event) {IFRAME.src = SELECT.value + EMBED});
    BUTTON.addEventListener("click", function(event) {window.open(SELECT.value)});

    SELECT.append(...namelinkpair.map(([name, link]) => setattr(document.createElement("option"), {textContent: name, value: link})));
    IFRAME.src = SELECT.firstElementChild.value + EMBED;

    return setattr(document.createElement("div"), {classList: {add: ["google-docs"]}, append: [SELECT, BUTTON, document.createElement("br"), IFRAME]});
}
