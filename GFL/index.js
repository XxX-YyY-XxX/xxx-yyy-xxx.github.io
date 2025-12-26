import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Jan 06, 2026 00:00 UTC-0800",
   "./assets/images/timer/rank.png"
);

timer(
    document.getElementById("battlepass"),
    "Dec 29, 2025 00:00 UTC-0800",
    "./assets/images/timer/sgsw10r3hx1g1.webp",
    {onEnd: timer.bind(null,
        document.getElementById("battlepass"),
        "Feb 02, 2026 00:00 UTC-0800",
        "./assets/images/timer/8cln2wrn4o8g1.webp",
    )}
);

timer(
    document.getElementById("coalition"),
    "Jan 06, 2026 00:00 UTC-0800",
    "./assets/images/coalition/17DestroyerDashingReindeer.webp"
);

timer(
    document.getElementById('skin-banner'),
    "Dec 30, 2025 00:00 UTC-0800",
    "./assets/images/timer/ibwz2rbn8i4g1.webp"
);

//timer(
//   document.getElementById('mini-event'),
//   "Dec 23, 2025 00:00 UTC-0800",
//   "./assets/images/timer/78bh0schsq3g1.webp"
//);