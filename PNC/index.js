// event timers only too lazy to do others

import {Timer, splitTime} from "../univasset/scripts/externaljavascript.js";
import {setattr} from "../univasset/scripts/basefunctions/index.js";
import {template} from "../univasset/scripts/html/index.js";

const TIMER_FIELD = document.querySelector("#timer-field");
const _timerTemplate = template("#timer-block");

/** Mostly used for sizes greater than 1 rem.
 * @this {HTMLSpanElement}
 * @param {Event} event */
function textResize(event) {
    const PARENT = this.parentElement, STYLE = this.style;
    STYLE.removeProperty("font-size");
    for (let fontsize = 50; this.offsetWidth > PARENT.clientWidth; fontsize--)
        STYLE.fontSize = `${fontsize}px`;
}

/** Creates a timer for events.
 * @param {string} start_date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} end_date Mon dy, year hr:mn (UTC|GMT)±offs
 * @param {string} title Event name.
 * @param {string} imgpath URL of the banner image.
 * @param {Object} [param4]
 * @param {function(): void} [param4.onend] Executed on timer end. */
function timer(start_date, end_date, title, imgpath, {onend = null} = {}) {
    if (!new Timer(start_date).done) return;

    const TIME = new Timer(end_date);
    if (TIME.done) return;

    const FRAGMENT = _timerTemplate();

    const TITLE_SPAN = FRAGMENT.querySelector("span");
    TITLE_SPAN.textContent = title;
    for (const TYPE of ["load", "resize", "deviceorientation"])
        window.addEventListener(TYPE, textResize.bind(TITLE_SPAN));

    setattr(FRAGMENT.querySelector("img"), {src: imgpath, alt: title})

    const TIMER_DIV = FRAGMENT.querySelector(".func_timer > div");
    const TIMER_BLOCK = FRAGMENT.querySelector(".func_timer");

    const COUNTDOWN = setInterval(function() {
        TIMER_DIV.textContent = splitTime(TIME.remaining).slice(0, -1).map(num => String(num).padStart(2, "0")).join(":");
        if (TIME.done) {
            clearInterval(COUNTDOWN);
            TIMER_BLOCK.remove();
            onend?.();
        }
    }, 1000);

    TIMER_FIELD.appendChild(FRAGMENT);
}

// reload into loading timers
(function resetTimer() {
    timer(
        "Aug 20, 2024 18:30 UTC-0800",
        "Sep 17, 2024 18:30 UTC-0800",
        "Singularity Immemorial",
        `./assets/images/timer/LoginBg_ZH_CN_2023_Singularity_Immemorial.png`,
        {onend: resetTimer}
    )

    timer(
        "Sep 10, 2024 18:30 UTC-0800",
        "Oct 01, 2024 18:30 UTC-0800",
        "Netherblade Gleam",
        `./assets/images/timer/cpt00_e_cg045.png`,
        {onend: resetTimer}
    )
})();