// event timers only too lazy to do others

import {Timer, getTemplateCloner, splitTime} from "../univasset/scripts/externaljavascript.js";
import {setattr} from "../univasset/scripts/basefunctions/index.js";

const TIMER_FIELD = document.querySelector("#timer-field");
const _timerTemplate = getTemplateCloner("#timer-block");

/** Mostly used for sizes greater than 1 rem.
 * @this {HTMLSpanElement}
 * @param {Event} event */
function textResize(event) {
    const PARENT = this.parentElement, STYLE = this.style;
    var remsize = 10;
    STYLE.removeProperty("font-size");
    while (this.offsetWidth > PARENT.clientWidth)
        STYLE.fontSize = `${remsize--}rem`;
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

(function resetTimer() {
    timer(
        "Jun 25, 2024 18:30 UTC-0800",
        "Jul 30, 2024 18:30 UTC-0800",
        "Retrocausal Trie Interference",
        "./assets/images/timer/LoginBg_ZH_CN_Steins_Gate_December_2023.png",
        {onend: resetTimer}
    )

    timer(
        "Jun 11, 2024 18:30 UTC-0800",
        "Jul 02, 2024 18:30 UTC-0800",
        "Critical Cascade Rerun",
        "./assets/images/timer/LoginBg_ZH_CN_Critical_Cascade.png",
        {onend: resetTimer}
    )
})();
// resetTimer();