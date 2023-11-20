import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Dec 04, 2023 23:59 UTC-0800",
   "./assets/images/timer/warcraft3.png"
);

timer(
    document.getElementById("battlepass"),
    "Dec 24, 2023 23:59 UTC-0800",
    "./assets/images/timer/1zqlm8vfpn0c1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        "./assets/images/timer/.webp"
    )}
);

timer(
    document.getElementById("coalition"),
    "Dec 11, 2023 23:59 UTC-0800",
    "./assets/images/coalition/21ExecutionerBloodFiendHuntress.webp", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        "./assets/images/coalition/.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Nov 20, 2023 23:59 UTC-0800",
    "./assets/images/timer/sjlg3j4ed4wb1.webp",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "Nov 20, 2023 23:59 UTC-0800",
        ""
    )}
);

// timer(
//    document.getElementById('mini-event'),
//    "Nov 13, 2023 23:59 UTC-0800",
//    "./assets/images/timer/vo5n43ssr3vb1.webp"
// );

//timer(document.getElementById('extra'), "",
//    "");