import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Apr 01, 2025 00:00 UTC-0800",
   "./assets/images/timer/hrzv4z75gdoe1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Mar 24, 2025 00:00 UTC-0800",
    "./assets/images/timer/j6wuor1gpthe1.webp",
    {onEnd: timer.bind(null,
        document.getElementById("battlepass"),
        "Apr 28, 2025 00:00 UTC-0800",
        "./assets/images/timer/uviizmqrzcpe1.webp",
    )}
);

timer(
    document.getElementById("coalition"),
    "Apr 01, 2025 00:00 UTC-0800",
    "./assets/images/coalition/18HunterNightfallMoth.webp"
    //{onEnd: timer.bind(null,
    //    document.getElementById("coalition"),
    //    "Mar 04, 2025 00:00 UTC-0800",
    //    "./assets/images/coalition/01Scarecrow.webp"
    //)}
);

timer(
    document.getElementById('skin-banner'),
    "Apr 08, 2025 00:00 UTC-0800",
    "./assets/images/timer/lhhv9mh6h0oe1.webp",
    //{onEnd: timer.bind(null,
    //    document.getElementById('skin-banner'),
    //    "",
    //    ""
    //)}
);

timer(
   document.getElementById('mini-event'),
   "Apr 01, 2025 00:00 UTC-0800",
   "./assets/images/timer/lpd293btksme1.webp"
);