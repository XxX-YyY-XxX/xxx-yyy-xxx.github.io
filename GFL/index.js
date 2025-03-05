import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Mar 11, 2025 00:00 UTC-0800",
   "./assets/images/timer/h6wg8i6u7vje1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Mar 24, 2025 00:00 UTC-0800",
    "./assets/images/timer/j6wuor1gpthe1.webp",
    {onEnd: timer.bind(null,
        document.getElementById("battlepass"),
        "",
        "",
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
    "Mar 11, 2025 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/0/0a/Thompson_costume3_D.png/600px-Thompson_costume3_D.png",
    //{onEnd: timer.bind(null,
    //    document.getElementById('skin-banner'),
    //    "",
    //    ""
    //)}
);

//timer(
//   document.getElementById('mini-event'),
//   "Feb 18, 2025 00:00 UTC-0800",
//   "./assets/images/timer/4e1djfsvg3ee1.webp"
//);