// event timers only too lazy to do others

import {Timer, getTemplateCloner, splitTime} from "../univasset/scripts/externaljavascript.js";
import {setattr} from "../univasset/scripts/basefunctions/pseudobuiltin.js";

const TIMER_FIELD = document.querySelector("#timer-field");
const _timerTemplate = getTemplateCloner("#timer-block");

/** Mostly used for  sizes greater than 1 rem.
 * @this {HTMLSpanElement}
 * @param {Event} event */
function textResize(event) {
    const PARENT = this.parentElement, STYLE = this.style;
    var remsize = 10;
    while (this.offsetWidth > PARENT.clientWidth)
        STYLE.fontSize = `${remsize--}rem`;
}

/** Creates a timer for events.
 * @param {string} start_date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} end_date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} title Event name
 * @param {string} imgpath URL of the banner image */
function timer(start_date, end_date, title, imgpath) {
    if (!new Timer(start_date).done) return;

    const TIME = new Timer(end_date);
    if (TIME.done) return;

    // ---------------------------------------------------------------------------------------------------------------------

    const FRAGMENT = _timerTemplate();

    const TITLE_SPAN = FRAGMENT.querySelector("span");
    TITLE_SPAN.textContent = title;
    // TITLE_SPAN.addEventListener("load", textResize);

    setattr(FRAGMENT.querySelector("img"), {src: imgpath, alt: title})

    const TIMER = FRAGMENT.querySelector(".func_timer > div");
    const TIMER_DIV = FRAGMENT.querySelector(".func_timer");

    // const TIMER_SPAN = document.createElement("span");
    // const TITLE_SPAN = setattr(document.createElement("span"), {textContent: title});
    // const IMG = setattr(document.createElement("img"), {src: imgpath, alt: title, loading: "lazy"});
    // const TIMER_DIV = setattr(document.createElement("div"), {classList: {add: ["func_timer"]}, append: [TITLE_SPAN, IMG, TIMER_SPAN]});

    // ---------------------------------------------------------------------------------------------------------------------

    const COUNTDOWN = setInterval(function() {
        TIMER.textContent = splitTime(TIME.remaining).slice(0, -1).map(num => String(num).padStart(2, "0")).join(" : ");
        if (TIME.done) {
            clearInterval(COUNTDOWN);
            TIMER_DIV.remove();
            resetTimer();
        }
    }, 1000);

    TIMER_FIELD.appendChild(FRAGMENT);
}

function resetTimer() {
    timer(
        "Feb 20, 2024 18:30 UTC-0800",
        "Mar 05, 2024 18:30 UTC-0800",
        "Heartfelt House of Cocoa",
        "./assets/images/timer/6b34bdee545c5608eec9af608a8b9757f4134d42.jpg"
    )

    timer(
        "Feb 03, 2024 05:00 UTC-0800",
        "Feb 26, 2024 05:00 UTC-0800",
        "Springtime Ruckus",
        "./assets/images/timer/cpt00_e_cg024.png"
    )
};
resetTimer();