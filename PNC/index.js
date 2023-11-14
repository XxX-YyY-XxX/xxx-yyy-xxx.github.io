// event timers only too lazy to do others

import { Timer, splitTime } from "../univasset/scripts/externaljavascript.js";
import { setattr } from "../univasset/scripts/basefunctions/pseudobuiltin.js";

/** Creates a timer for events.
 * @param {HTMLElement} grouper_elem
 * @param {string} date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} title Event name.
 * @param {string} eventURL URL of the banner image. */
function timer(grouper_elem, date, title, eventURL) {
    const CLASSTEXT = "func_timer";
    const TIME = new Timer(date);
    if (TIME.done) return;

    const TITLE_SPAN = document.createElement("span");

    const IMG = setattr(document.createElement("img"), {src: eventURL, alt: title, loading: "lazy"});

    const TIMER_SPAN = document.createElement("span");
    const COUNTDOWN = setInterval(function() {
        TIMER_SPAN.textContent = splitTime(TIME.remaining).slice(0, -1).map(num => String(num).padStart(2, '0')).join(' : ');
        if (TIME.done) {
            clearInterval(COUNTDOWN);
            grouper_elem.replaceChildren();
            grouper_elem.classList.remove(CLASSTEXT);
        }
    }, 1000);

    grouper_elem.classList.add(CLASSTEXT);
    grouper_elem.append(TITLE_SPAN, IMG, TIMER_SPAN);
}

timer(
    document.querySelector("#current"),
    "Dec 12, 2023 18:29 UTC-0800",
    "Perilous Advancement",
    "./assets/images/timer/cpt00_e_cg027.png"
)

timer(
    document.querySelector("#previous"),
    "Nov 21, 2023 18:29 UTC-0800",
    "Divining the Heart",
    "./assets/images/timer/cpt00_e_cg026.png"
)