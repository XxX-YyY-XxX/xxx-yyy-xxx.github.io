import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

// timer(
//    document.getElementById("event"),
//    "Feb 20, 2024 00:00 UTC-0800",
//    "./assets/images/timer/bjnxfw4m5pfc1.png"
// );

timer(
    document.getElementById("battlepass"),
    "Mar 04, 2024 00:00 UTC-0800",
    "./assets/images/timer/vbkwzn9f4bec1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "Apr 08, 2024 00:00 UTC-0800",
        "./assets/images/timer/.webp"   //hk433
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

timer(
   document.getElementById('mini-event'),
   "Mar 12, 2024 00:00 UTC-0800",
   "./assets/images/timer/da8gefr6dqgc1.webp"
);

//timer(document.getElementById('extra'), "",
//    "");