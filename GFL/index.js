import { Random } from "../univasset/scripts/basefunctions/index.js";
import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "May 12, 2026 00:00 UTC-0800",
   "./assets/images/timer/3by6k4ew0ovg1.webp"
);

timer(
    document.getElementById("battlepass"),
    "May 18, 2026 00:00 UTC-0800",
    //"./assets/images/timer/t5qp3pfp3rmg1.webp",
    "https://iopwiki.com/images/thumb/3/32/JS_9_costume5_D.png/600px-JS_9_costume5_D.png"
    //{onEnd: timer.bind(null,
    //    document.getElementById("battlepass"),
    //    "Apr 13, 2026 00:00 UTC-0800",
    //    "./assets/images/timer/rt5qp3pfp3rmg1.webp"
    //)}
);

var COALITION = Random.iterable(["08Alchemist", "25Narciss"])

timer(
    document.getElementById("coalition"),
    "Apr 28, 2026 00:00 UTC-0800",
    `./assets/images/coalition/${COALITION.next().value}.webp`
);

//timer(
//    document.getElementById('skin-banner'),
//    "Feb 10, 2026 00:00 UTC-0800",
//    "https://iopwiki.com/images/thumb/a/ad/Howa_Type_64_costume3_D.png/600px-Howa_Type_64_costume3_D.png"
//);

timer(
   document.getElementById('mini-event'),
   "May 05, 2025 00:00 UTC-0800",
   "./assets/images/timer/q2t5uu7sxavg1.webp"
);