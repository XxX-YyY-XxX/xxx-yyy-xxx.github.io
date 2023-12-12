// event timers only too lazy to do others

import {Timer, splitTime} from "../univasset/scripts/externaljavascript.js";
import {setattr} from "../univasset/scripts/basefunctions/pseudobuiltin.js";

const TIMER_FIELD = document.querySelector("#timer-field");

/** Creates a timer for events.
 * @param {string} end_date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} title Event name
 * @param {string} imgpath URL of the banner image */
function timer(end_date, title, imgpath) {
    const TIME = new Timer(end_date);
    if (TIME.done) return;

    const TIMER_DIV = document.createElement("div");
    const TIMER_SPAN = document.createElement("span");
    const TITLE_SPAN = setattr(document.createElement("span"), {textContent: title});
    const IMG = setattr(document.createElement("img"), {src: imgpath, alt: title, loading: "lazy"});

    const COUNTDOWN = setInterval(function() {
        TIMER_SPAN.textContent = splitTime(TIME.remaining).slice(0, -1).map(num => String(num).padStart(2, '0')).join(' : ');
        if (TIME.done) {
            clearInterval(COUNTDOWN);
            TIMER_DIV.remove()
        }
    }, 1000);

    TIMER_DIV.classList.add("func_timer");
    TIMER_DIV.append(TITLE_SPAN, IMG, TIMER_SPAN);
    TIMER_FIELD.appendChild(TIMER_DIV);
}

// timer(
//     "Jan 12, 2024 18:29 UTC-0800",
//     "Starchasers' Concerto",
//     "./assets/images/timer/cpt00_e_cg022.png"
// )

// timer(
//     "Jan 09, 2024 18:29 UTC-0800",
//     "Symphonic Reprise",
//     "./assets/images/timer/cpt00_e_cg021.png"
// )

timer(
    "Dec 19, 2023 18:29 UTC-0800",
    "Cleansing Aria",
    "./assets/images/timer/cpt00_e_cg033.png"
)

timer(
    "Dec 12, 2023 18:29 UTC-0800",
    "Perilous Advancement",
    "./assets/images/timer/cpt00_e_cg027.png"
)
