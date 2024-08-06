/** @type {HTMLAnchorElement} */ var ANCHOR;
for (ANCHOR of document.querySelectorAll("a[history]")) {
    ANCHOR.addEventListener("click", function(event) {
        const DATA = JSON.parse(this.getAttribute("history") || "{}");
        history.pushState(DATA, "", this.href);
        window.dispatchEvent(new PopStateEvent("popstate", {state: DATA}));
        event.preventDefault();
    })
}