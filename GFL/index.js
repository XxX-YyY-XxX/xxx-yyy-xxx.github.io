import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Nov 19, 2024 00:00 UTC-0800",
   "./assets/images/timer/oqs5e95gpfvd1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Dec 09, 2024 00:00 UTC-0800",
    "./assets/images/timer/sootj367o7yd1.webp"
);

timer(
    document.getElementById("coalition"),
    "Dec 10, 2024 00:00 UTC-0800",
    "./assets/images/coalition/26DreamerMoonlitSentinel.webp",
    {onEnd: timer.bind(null,
        document.getElementById("coalition"),
        "",
        "",
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Dec 24, 2024 00:00 UTC-0800",
    "./assets/images/timer/p7g40hvaa83e1.webp"
);

timer(
   document.getElementById('mini-event'),
   "Nov 19, 2024 00:00 UTC-0800",
   "./assets/images/timer/nzvyhoax6fxd1.webp"
);