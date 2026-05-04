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

var COALITION = Random.iterable(["01Scarecrow", "10Gager", "28Beluga"])

timer(
    document.getElementById("coalition"),
    "May 16, 2026 00:00 UTC-0800",
    `./assets/images/coalition/${COALITION.next().value}.webp`
);

timer(
    document.getElementById('skin-banner'),
    "Jun 09, 2026 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/d/df/HK433_costume4_D.png/600px-HK433_costume4_D.png"
);

timer(
   document.getElementById('mini-event'),
   "May 05, 2026 00:00 UTC-0800",
   "./assets/images/timer/q2t5uu7sxavg1.webp",
   {onEnd: timer.bind(
        document.getElementById('mini-event'),
        "May 19, 2026 00:00 UTC-0800",
        "./assets/images/timer/mimn9fs3voxg1.webp"
    )}
);