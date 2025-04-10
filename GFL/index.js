import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

//timer(
//   document.getElementById("event"),
//   "Apr 01, 2025 00:00 UTC-0800",
//   "./assets/images/timer/hrzv4z75gdoe1.webp"
//);

timer(
    document.getElementById("battlepass"),
    "Apr 28, 2025 00:00 UTC-0800",
    "./assets/images/timer/uviizmqrzcpe1.webp",
    {onEnd: timer.bind(null,
        document.getElementById("battlepass"),
        "",
        "",
    )}
);

timer(
    document.getElementById("coalition"),
    "Apr 29, 2025 00:00 UTC-0800",
    "./assets/images/coalition/05Destroyer.webp"
    //{onEnd: timer.bind(null,
    //    document.getElementById("coalition"),
    //    "Mar 04, 2025 00:00 UTC-0800",
    //    "./assets/images/coalition/01Scarecrow.webp"
    //)}
);

timer(
    document.getElementById('skin-banner'),
    "May 06, 2025 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/4/4e/SPAS-15_costume4_D.png/600px-SPAS-15_costume4_D.png",
    //{onEnd: timer.bind(null,
    //    document.getElementById('skin-banner'),
    //    "",
    //    ""
    //)}
);

timer(
   document.getElementById('mini-event'),
   "Apr 29, 2025 00:00 UTC-0800",
   "./assets/images/timer/ihigds1j7dse1.webp"
);