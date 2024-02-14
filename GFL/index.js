import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Feb 20, 2024 00:00 UTC-0800",
   "./assets/images/timer/bjnxfw4m5pfc1.png"
);

timer(
    document.getElementById("battlepass"),
    "Mar 04, 2024 23:59 UTC-0800",
    "./assets/images/timer/vbkwzn9f4bec1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        "./assets/images/timer/.webp"
    )}
);

timer(
    document.getElementById("coalition"),
    "Mar 05, 2024 00:00 UTC-0800",
    "./assets/images/coalition/23ScarecrowDemonicAbyss.webp", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        "./assets/images/coalition/.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Mar 12, 2024 00:00 UTC-0800",
    "./assets/images/timer/Login_CNY_2023.png",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

// timer(
//    document.getElementById('mini-event'),
//    "Feb 12, 2024 23:59 UTC-0800",   //feb 20 - mar 12
//    "./assets/images/timer/pjuc8kn82xcc1.webp"   //dp28
// );

//timer(document.getElementById('extra'), "",
//    "");