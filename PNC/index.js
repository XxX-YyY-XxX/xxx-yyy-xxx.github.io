// event timers only too lazy to do others

import {Timer, splitTime} from "../univasset/scripts/externaljavascript.js";
import {setattr} from "../univasset/scripts/basefunctions/pseudobuiltin.js";

const TIMER_FIELD = document.querySelector("#timer-field");

/** Creates a timer for events.
 * @param {string} start_date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} end_date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} title Event name
 * @param {string} imgpath URL of the banner image */
function timer(start_date, end_date, title, imgpath) {
    if (!new Timer(start_date).done) return;

    const TIME = new Timer(end_date);
    if (TIME.done) return;

    const TIMER_SPAN = document.createElement("span");
    const TITLE_SPAN = setattr(document.createElement("span"), {textContent: title});
    const IMG = setattr(document.createElement("img"), {src: imgpath, alt: title, loading: "lazy"});
    const TIMER_DIV = setattr(document.createElement("div"), {classList: {add: ["func_timer"]}, append: [TITLE_SPAN, IMG, TIMER_SPAN]});

    const COUNTDOWN = setInterval(function() {
        TIMER_SPAN.textContent = splitTime(TIME.remaining).slice(0, -1).map(num => String(num).padStart(2, '0')).join(' : ');
        if (TIME.done) {
            clearInterval(COUNTDOWN);
            TIMER_DIV.remove();
            resetTimer();
        }
    }, 1000);

    TIMER_FIELD.appendChild(TIMER_DIV);
}

function resetTimer() {
    timer(
        "Jan 17, 2024 05:00 UTC-0800",
        "Jan 31, 2024 05:00 UTC-0800",
        "Aberrance's Chain",
        "./assets/images/timer/21win_e_cg003.png"
    )

    timer(
        "Jan 09, 2024 18:30 UTC-0800",
        "Jan 30, 2024 18:30 UTC-0800",
        "Oneiric Odyssey",
        "./assets/images/timer/cpt00_e_cg036_4.png"
    )
};
resetTimer();