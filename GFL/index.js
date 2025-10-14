import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Oct 28, 2025 00:00 UTC-0800",
   "./assets/images/timer/G3N3IvubEAAFkwr.jpg"
);

timer(
    document.getElementById("battlepass"),
    "Oct 20, 2025 00:00 UTC-0800",
    "./assets/images/timer/0x6c9jqo39of1.webp",
    {onEnd: timer.bind(null,
        document.getElementById("battlepass"),
        "Nov 24, 2025 00:00 UTC-0800",
        "./assets/images/timer/.webp", //stg
    )}
);

timer(
    document.getElementById("coalition"),
    "Nov 11, 2025 00:00 UTC-0800",
    "./assets/images/coalition/26DreamerMoonlitSentinel.webp"
);

//timer(
//    document.getElementById('skin-banner'),
//    "Sep 30, 2025 00:00 UTC-0800",
//    "https://iopwiki.com/images/thumb/7/78/MK3A1_costume3_D.png/600px-MK3A1_costume3_D.png"
//);

//timer(
//   document.getElementById('mini-event'),
//   "Aug 05, 2025 00:00 UTC-0800",
//   "./assets/images/timer/zqlgp5qvozbf1.webp"
//);