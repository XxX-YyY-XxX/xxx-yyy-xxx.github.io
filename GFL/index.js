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
    "Nov 12, 2024 00:00 UTC-0800",
    "./assets/images/coalition/21ExecutionerBloodFiendHuntress.webp",
    {onEnd: timer.bind(null,
        document.getElementById("coalition"),
        "Dec 10, 2024 00:00 UTC-0800",
        "./assets/images/coalition/26DreamerMoonlitSentinel.webp",
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Nov 27, 2024 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/3/32/Python_costume2_D.png/600px-Python_costume2_D.png"
);

timer(
   document.getElementById('mini-event'),
   "Nov 19, 2024 00:00 UTC-0800",
   "./assets/images/timer/nzvyhoax6fxd1.webp"
);