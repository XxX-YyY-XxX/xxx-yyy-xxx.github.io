import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

//timer(
//    document.getElementById("event"),
//    "Sep 18, 2023 23:59 UTC-0800",
//    "./assets/images/timer/ujmrjucqfsib1.webp"
//);

timer(
    document.getElementById("battlepass"),
    "Nov 19, 2023 23:59 UTC-0800",
    "./assets/images/timer/c6rh2we7vhtb1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        ""
    )}
);

timer(
    document.getElementById("coalition"),
    "Oct 16, 2023 23:59 UTC-0800",
    "./assets/images/coalition/02Executioner.webp", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "Nov 13, 2023 23:59 UTC-0800",
        "./assets/images/coalition/16IntruderSorceressOfTheEnd.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Nov 20, 2023 23:59 UTC-0800",
    "./assets/images/timer/sjlg3j4ed4wb1.webp",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

timer(
   document.getElementById('mini-event'),
   "Nov 13, 2023 23:59 UTC-0800",
   "./assets/images/timer/vo5n43ssr3vb1.webp"
);

//timer(document.getElementById('extra'), "",
//    "");